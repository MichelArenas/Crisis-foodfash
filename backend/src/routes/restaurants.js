const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const router = express.Router();

router.post('/', restaurantController.createRestaurant);
router.get('/', restaurantController.getRestaurants);
router.get('/:restaurantId', restaurantController.getRestaurant);
router.put('/:restaurantId', restaurantController.updateRestaurant);
router.delete('/:restaurantId', restaurantController.deleteRestaurant);

module.exports = router;
