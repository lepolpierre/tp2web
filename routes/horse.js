const express = require('express');

const horseController = require('../controllers/horseController');

const router = express.Router();

router.get('/horses', horseController.getHorses);

router.post('/horse', horseController.createHorse);

router.get('/horse/:horseId', horseController.getHorse);

router.put('/horse/:horseId', horseController.updateHorse);

router.delete('/horse/:horseId', horseController.deleteHorse);

module.exports = router;
