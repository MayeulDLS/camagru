const express = require('express');
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Définir quelques routes de base
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Importer et utiliser d'autres routes
// const someRoute = require('./routes/someRoute');
// app.use('/someRoute', someRoute);

// Gestion d'erreurs générales (exemple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
