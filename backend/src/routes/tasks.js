const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.use(auth);

// GET /tasks
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [req.userId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /tasks
router.post('/', body('title').notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)', [req.userId, title, description || null]);
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const [existing] = await pool.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, req.userId]);
    if (!existing.length) return res.status(404).json({ message: 'Task not found' });

    await pool.query('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title || existing[0].title, description || existing[0].description, completed ? 1 : 0, id]);

    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [existing] = await pool.query('SELECT id FROM tasks WHERE id = ? AND user_id = ?', [id, req.userId]);
    if (!existing.length) return res.status(404).json({ message: 'Task not found' });

    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
