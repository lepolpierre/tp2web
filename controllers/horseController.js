"use strict";

const Horse = require('../models/horse');

exports.getHorses = (req, res, next) => {
  Horse.find()
    .then(horses => {
      res.status(200).json({
        message: 'Fetched Horses successfully.',
        horses: horses
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createHorse = (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;
  const horse = new Horse({
    name: name,
    age: age
  });
  
  horse.save()
    .then(result => {
      res.status(201).json({
        message: 'Horse created successfully!',
        horse: horse
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.updateHorse = (req, res, next) => {
  const horseId = req.params.horseId;
  const name = req.body.name;
  const age = req.body.age;
  Horse.findById(horseId)
    .then(horse => {
      if (!horse) {
        const error = new Error('Could not find horse.');
        error.statusCode = 404;
        throw error;
      }
      horse.horseId = horseId;
      horse.name = name;
      horse.age = age;
      return horse.save();
    })
    .then(result => {
      res.status(212).json({ message: 'Horse updated!', horse: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteHorse = (req, res, next) => {
  const horseId = req.params.horseId;
  Horse.findById(horseId)
    .then(horse => {
      if (!horse) {
        const error = new Error('Could not find horse.');
        error.statusCode = 404;
        throw error;
      }
      return Horse.findByIdAndRemove(horseId);
    })
    .then(result => {
      res.status(200).json({ message: 'Deleted horse ' + result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


