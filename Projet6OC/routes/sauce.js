// express
const express = require("express");
// on créer un routeur 
const router = express.Router();
// on importe la logique des routes
const saucesCtrl = require("../controllers/sauces");
// on appelle le middleware qui protège les routes
const auth = require("../middleware/auth");
// on appelle multer pour les image
const multer = require("../middleware/multer-config");

// intercepte les requetes get
router.get("/", auth, saucesCtrl.getAllSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.post("/", auth, multer, saucesCtrl.createSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
// delete
router.delete("/:id", auth, saucesCtrl.deleteSauce);
// post de like
router.post("/:id/like", auth, saucesCtrl.likeSauce);
// on exporte router
module.exports = router;
