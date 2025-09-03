const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const router = express.Router();

router.get('/restaurant/:restaurantId', inventoryController.getInventoryByRestaurant);
router.put('/:restaurantId/item/:itemId', inventoryController.updateInventory);

module.exports = router;
