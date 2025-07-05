const express = require('express');
const router = express.Router();
const controller = require('../controllers/AuthController');
const AuthMiddleware = require('../AuthMiddelware')
router.post('/login', controller.loginUser);
router.post('/shortUrl', controller.createUrl)


module.exports = router;