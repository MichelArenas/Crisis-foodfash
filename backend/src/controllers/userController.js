const pool = require('../config/database');
const bcrypt = require('bcryptjs');

// Registrar usuario
exports.registerUser = async (req, res) => {
  try {
    const { email, password, name, phone, address } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Campos obligatorios faltantes' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password_hash, name, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name',
      [email, hashedPassword, name, phone, address]
    );

    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ error: 'No se pudo registrar el usuario' });
  }
};

// Obtener usuario por ID
exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('SELECT id, email, name, phone, address FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ error: 'No se pudo obtener el usuario' });
  }
};
