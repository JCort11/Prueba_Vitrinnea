const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
