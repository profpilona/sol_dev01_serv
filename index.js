/**
 * Programme pour démontrer le fonctionnement de Express et de Mongoose
 * dans le cadre du labo 01 du cours programmation de services Web
 * Alain Pilon - 22 juin 2023
 */
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://alain:alainalain@cluster0.yml6m.mongodb.net/services');
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('erreur de BD:', err);
});
db.once('open', ()=>{
    console.log('Connexion à la BD OK');
});

app.use(express.json());

app.use('/', require('./routes/base.js'));
app.use('/api/livres', require('./routes/livres'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT);
console.log(`Serveur Web fonctionnel sur le port ${PORT}`);