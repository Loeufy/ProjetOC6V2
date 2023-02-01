// appel de bcrypt
const bcrypt = require("bcrypt");
// appel de jsonwebtoken
const jwt = require("jsonwebtoken");
// appel de model user
const User = require("../models/user");

// enregistrement de nouveaux utilisateurs grace a signup
exports.signup = (req, res, next) => {

    // fonction pour hasher le mot de passe en 10 tours pour le sel
    bcrypt
      .hash(req.body.password, 10)
      // quand c'est hashé
      .then((hash) => {
        // créer un modele User avec email et mot de pase hashé
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        // sauvegarde le user dans la base de donnée
        user
          .save()
          //status 201
          .then(() =>
            res
              .status(201)
              .json({ message: "User created (FR)Utilisateur créé !" })
          )
          // si erreur au hashage status 400
          .catch((error) => res.status(400).json({ error }));
      })
      // au cas d'une erreur status 500 
      .catch((error) => res.status(500).json({ error }));

};

// on pourrait demander un autre type de vérification pour le login et y rajouter sa logique (captcha ou code reçu par téléphone avec un input à compléter)
exports.login = (req, res, next) => {
  // on trouve l'adresse qui est rentrée par un utilisateur (requete)
  User.findOne({ email: req.body.email })
    // pour un utilisateur
    .then((user) => {
      // si la requete email ne correspond pas
      if (!user) {
        // status 401 
        return res.status(401).json({ error });
      }
      // si c'est ok
      bcrypt
        .compare(req.body.password, user.password)
        // à la validation
        .then((valid) => {
          // si ce n'est pas valide
          if (!valid) {
            // retourne un status 401
            return res.status(401).json({ error });
          }
          // si c'est ok status 201
          res.status(201).json({
            // renvoi l'user id
            userId: user._id,
            // renvoi un token 
            token: jwt.sign(
              // le token aura le user id identique
              { userId: user._id },
              // clef secrette 
              process.env.TOKEN_SECRET_ALEATOIRE,
              // durée de vie du token
              { expiresIn: process.env.TOKEN_TEMP }
            ),
          });
        })
        // erreur status 500
        .catch((error) => res.status(500).json({ error }));
    })
    // erreur status 500
    .catch((error) => res.status(500).json({ error }));
};
