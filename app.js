"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const horseRoutes = require('./routes/horse');
const jockeyRoutes = require('./routes/jockey');

const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(horseRoutes);
app.use(jockeyRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect('mongodb://127.0.0.1:27017/hippo')
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
