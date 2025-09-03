const pool = require('../config/database');

// Actualizar inventario
exports.updateInventory = async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;
    const { quantity } = req.body;

    if (quantity == null) {
      return res.status(400).json({ error: 'La cantidad es obligatoria' });
    }

    const result = await pool.query(
      `UPDATE inventory
       SET quantity=$1, updated_at=NOW()
       WHERE restaurant_id=$2 AND item_id=$3 RETURNING *`,
      [quantity, restaurantId, itemId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inventario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el inventario' });
  }
};

// Obtener inventario de un restaurante
exports.getInventoryByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const result = await pool.query(
      `SELECT i.*, m.name AS item_name, m.price
       FROM inventory i
       JOIN menu_items m ON i.item_id = m.id
       WHERE i.restaurant_id=$1`,
      [restaurantId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el inventario' });
  }
};
