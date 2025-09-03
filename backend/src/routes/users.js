const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Registrar usuario
router.post('/register', userController.registerUser);

// Obtener usuario por ID
router.get('/:userId', userController.getUser);

module.exports = router;
