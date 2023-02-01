// appel de express
const express = require("express");
const router = express.Router();

const signUpMiddleware = require("../middleware/user/signup")

const userCtrl = require("../controllers/user");
// intercepte les requetes post d'inscription
router.post("/signup", signUpMiddleware, userCtrl.signup);
// intercepte les requetes post d'authentification
router.post("/login", userCtrl.login);
// on exporte router
module.exports = router;
