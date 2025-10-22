require('dotenv').config();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function main() {
  
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'todo_app',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
  });

  try {
    
    await pool.query('DELETE FROM tasks');
    await pool.query('DELETE FROM users');

    // Crear usuario demo
    const demoPassword = '123456';
    const hash = await bcrypt.hash(demoPassword, 10);

    const [resUser] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      ['Usuario Demo', 'demo@vitrinnea.com', hash]
    );
    const userId = resUser.insertId;

    // Insertar algunas tareas
    const tasks = [
      ['Comprar leche', 'Ir al supermercado y comprar leche entera', 0],
      ['Enviar informe', 'Enviar el informe semanal al equipo', 0],
      ['Repasar prueba técnica', 'Revisar requisitos y completar README', 0],
    ];

    for (const [title, description, completed] of tasks) {
      await pool.query(
        'INSERT INTO tasks (user_id, title, description, completed) VALUES (?, ?, ?, ?)',
        [userId, title, description, completed]
      );
    }

    console.log('✅ Seed completado.');
    console.log('Usuario demo: demo@vitrinnea.com / 123456');
    console.log('Puedes iniciar sesión con esas credenciales.');
    process.exit(0);
  } catch (err) {
    console.error('Error en seed:', err);
    process.exit(1);
  }
}

main();
