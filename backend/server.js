const http = require('http');
const mongoose = require('mongoose');
const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv');
const app = require('./app');
const { normalizePort, errorHandler } = require('./errorHandling');

// Charger les variables d'environnement à partir d'un fichier .env (facultatif)
dotenv.config();

// Normaliser le port
const port = normalizePort(process.env.PORT);
app.set('port', port);

// Créer le serveur HTTP
const server = http.createServer(app);

// Gérer les erreurs
server.on('error', errorHandler);

// Écouter l'événement 'listening'
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Connexion à MongoDB et démarrage du serveur
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(() => {
 console.log('Connected to MongoDB : ', process.env.MONGO_URI);

  // Démarrer le serveur une fois connecté à MongoDB
  server.listen(port, () => {
    console.log('Server is running on port ' + port);
  });
})
.catch(err => {
 console.error('Failed to connect to MongoDB', err);
 process.exit(1); // Arrêter le processus si la connexion échoue
});

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true
});