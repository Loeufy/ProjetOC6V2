// npm install mongoose  https://atinux.developpez.com/tutoriels/javascript/mongodb-nodejs-mongoose/
const mongoose = require("mongoose");
mongoose
  .connect(
      process.env.MONGO_DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() =>
    console.log(
      "Successful connection to MongoDB (FR)Connexion à MongoDB réussie !"
    )
  )
  .catch((error) => console.log(error));
