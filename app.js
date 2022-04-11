const express = require('express');

// Création de l'application express
const app = express();

app.use((req, res) =>{
    res.json({ message: 'votre requête a bien été reçu' });
})

// Exportatin de l'application express
module.exports = app;