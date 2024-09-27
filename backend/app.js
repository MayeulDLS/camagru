const express = require('express');
const bodyParser = require("body-parser");
const authMiddleware = require("./middleware/authMiddleware");
const publicRoutes = require("./routes/publicRoutes");
const userRoutes = require("./routes/userRoutes");
const picturesRoutes = require("./routes/picturesRoutes");
const commentsRoutes = require("./routes/commentsRoutes");

const app = express();

app.use(bodyParser.json({ limit: '5MB' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use("/api/public", publicRoutes);

app.use('/api/user', authMiddleware, userRoutes);

app.use('/api/pictures', authMiddleware, picturesRoutes);

app.use('/api/comments', commentsRoutes);

module.exports = app;
