/** Importation de express */
const express = require('express');

const db = require('../config/database');

/** Création d'un router avec la méthode router d'express */
const router = express.Router();

router.use((req, res, next) => {
  console.log('demande faites pour users');
  next();
});


router.post('/', (req, res) => {
  const { username, password, email } = req.body;
  if (username && password && email) {
    console.log(username, password, email);
  } else {
    console.log('vide');
  }
});

module.exports = router;