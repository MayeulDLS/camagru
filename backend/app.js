const express = require('express');
const authMiddleware = require("./middleware/authMiddleware");
const publicRoutes = require("./routes/publicRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use("/api/public", publicRoutes);

app.use('/api/user', authMiddleware, userRoutes);

module.exports = app;
