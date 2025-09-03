const pool = require('../config/database');

// Crear ítem de menú
exports.createMenuItem = async (req, res) => {
  try {
    const { restaurantId, name, description, price, category, is_available, image_url } = req.body;

    if (!restaurantId || !name || !price) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const result = await pool.query(
      `INSERT INTO menu_items (restaurant_id, name, description, price, category, is_available, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [restaurantId, name, description, price, category, is_available ?? true, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el ítem del menú' });
  }
};

// Obtener todos los ítems de un restaurante
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const result = await pool.query('SELECT * FROM menu_items WHERE restaurant_id=$1 ORDER BY created_at DESC', [restaurantId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el menú' });
  }
};

// Actualizar ítem de menú
exports.updateMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, description, price, category, is_available, image_url } = req.body;

    const result = await pool.query(
      `UPDATE menu_items
       SET name=$1, description=$2, price=$3, category=$4, is_available=$5, image_url=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [name, description, price, category, is_available, image_url, itemId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ítem no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el ítem del menú' });
  }
};

// Eliminar ítem de menú
exports.deleteMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const result = await pool.query('DELETE FROM menu_items WHERE id=$1 RETURNING *', [itemId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ítem no encontrado' });
    }

    res.json({ success: true, deleted: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el ítem' });
  }
};
