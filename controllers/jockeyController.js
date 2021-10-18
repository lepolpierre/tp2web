"use strict";

const Jockey = require('../models/jockey');



exports.jockeyReserve = (req, res, next) => {
  const horseId = req.body.horseId;
  const date = req.body.date;
  const jockeyId = req.params.jockeyId;
  console.log('horseId', horseId);
  Jockey.findById(jockeyId)
  .then(jockey => {
    jockey.reservation.push(req.body);
    return jockey.save();
  })
  .then(result => {
    res.status(201).json({ 
      message: 'Jockey updated!', 
      jockey: result });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.jockeyDeleteReserve = (req, res, next) => {
  const horseId = req.body.horseId;
  const jockeyId = req.params.jockeyId;
  console.log('horseId', horseId);
  Jockey.findById(jockeyId)
  .then(jockey => {
    const index = jockey.reservation.findIndex(x => x.horseId.toString() ===  horseId);
    if (index > -1) {
      jockey.reservation.splice(index, 1);
      return jockey.save();
    }
  
    return Promise.reject({statusCode: 404, message: 'Horse not found for jockey.'})
  })
  .then(result => {
    res.status(201).json({ 
      message: 'Horse deleted for jockey.', 
      jockey: result });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};