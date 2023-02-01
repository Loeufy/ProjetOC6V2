// app.js contiendra l'application
// express
const express = require("express");
// permet de créer une application express
const app = express();
// sécuriser les en-têtes http.
const helmet = require("helmet");
// appel de dotenv qui stocke des variables et servira pour l'appel mongodb
require("dotenv").config({ path: "./config/.env" });
// appel du fichier de mongodb
require("./config/mgdb");
// on importe saucesRoutes
const saucesRoutes = require("./routes/sauce");
// on importe userRoutes
const userRoutes = require("./routes/user");
// on importe path
const path = require("path");
// middleware d'helmet
app.use(helmet());

const rateLimit = require('express-rate-limit')
// Apply the rate limiting middleware to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// middleware
app.use((req, res, next) => {
  // droit d'accéder tout le monde
  res.setHeader("Access-Control-Allow-Origin", "*");
  // headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // verbe de requete
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  next();
});

// middleware intercepte la requete et la transforme au bon format
app.use(express.json());

// fichier statique
app.use("/images", express.static(path.join(__dirname, "images")));
// on utilise le router de userRoutes
app.use("/api/auth", userRoutes);
// on utilise le router de saucesRoutes
app.use("/api/sauces", saucesRoutes);
// on exporte cette constante pour pouvoir y acceder depuis d'autres fichiers
module.exports = app;
