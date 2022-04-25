const express = require('express');
/** Importation bodyParser */
const bodyParser = require('body-parser');



/** Importation de node */
const path = require('path');

require('dotenv').config()
// Création de l'application express
const app = express();

// Autorisation cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// Exportatin de l'application express
module.exports = app;
