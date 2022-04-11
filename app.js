const express = require('express');

// Création de l'application express
const app = express();

// Donner accès au corps de la requête
app.use(express.json());

// Autorisation cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'objet crée !'
  });
});

app.use('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: '333',
    },
    {
      _id: '333',
    },
  ];
  res.status(200).json(stuff);
});

// Exportatin de l'application express
module.exports = app;
