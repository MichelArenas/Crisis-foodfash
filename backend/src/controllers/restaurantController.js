const pool = require('../config/database');

// Crear restaurante
exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, address, phone, rating, delivery_time } = req.body;

    if (!name || !address) {
      return res.status(400).json({ error: 'Nombre y dirección son obligatorios' });
    }

    const result = await pool.query(
      `INSERT INTO restaurants (name, description, address, phone, rating, delivery_time)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description, address, phone, rating || 0, delivery_time || 30]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creando restaurante:', error);
    res.status(500).json({ error: 'No se pudo crear el restaurante' });
  }
};

// Obtener todos los restaurantes
exports.getRestaurants = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los restaurantes' });
  }
};

// Obtener restaurante por ID
exports.getRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [restaurantId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el restaurante' });
  }
};

// Actualizar restaurante
exports.updateRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, address, phone, rating, delivery_time, is_active } = req.body;

    const result = await pool.query(
      `UPDATE restaurants
       SET name=$1, description=$2, address=$3, phone=$4, rating=$5, delivery_time=$6, is_active=$7, updated_at=NOW()
       WHERE id=$8 RETURNING *`,
      [name, description, address, phone, rating, delivery_time, is_active, restaurantId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el restaurante' });
  }
};

// Eliminar restaurante
exports.deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const result = await pool.query('DELETE FROM restaurants WHERE id=$1 RETURNING *', [restaurantId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }

    res.json({ success: true, deleted: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el restaurante' });
  }
};