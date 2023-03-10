// appel de mangoose
const mongoose = require("mongoose");
// appel de mongoose-unique-validator après installation
const uniqueValidator = require("mongoose-unique-validator");
// création de schéma de connection d'utilisateur
const userSchema = mongoose.Schema({
  // email
  email: { type: String, required: true, unique: true },
  // mot de passe
  password: { type: String, required: true },
});
// utilisation du shema via le plugin de mongoose
userSchema.plugin(uniqueValidator);
// exportation du shema modele
module.exports = mongoose.model("User", userSchema);
