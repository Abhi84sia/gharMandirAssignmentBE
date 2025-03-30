const express = require('express');
const router = express.Router();
const panchangController = require('../controllers/panchangController');

router.post('/panchang', panchangController.getPanchang);

module.exports = router;