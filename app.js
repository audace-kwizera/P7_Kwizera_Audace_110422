const express = require('express');

// Création de l'application express
const app = express();

app.use((req, res, next) => {
    console.log('requete reçu');
    // terminer requête et renvoyer vers prochain middleware
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) =>{
    res.json({ message: 'votre requête a bien été reçu' });
    next();
});

app.use((req, res) => {
    console.log('Réponse nevoyé avec succès');
});

// Exportatin de l'application express
module.exports = app;