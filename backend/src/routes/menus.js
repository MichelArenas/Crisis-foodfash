const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();

router.post('/', menuController.createMenuItem);
router.get('/restaurant/:restaurantId', menuController.getMenuByRestaurant);
router.put('/:itemId', menuController.updateMenuItem);
router.delete('/:itemId', menuController.deleteMenuItem);

module.exports = router;
 