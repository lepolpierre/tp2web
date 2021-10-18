const express = require('express');

const jockeyController = require('../controllers/jockeyController');

const router = express.Router();

router.get('/jockeys', jockeyController.getJockeys);

router.post('/jockey', jockeyController.createJockey);

router.get('/jockey/:jockeyId', jockeyController.getJockey);


module.exports = router;
