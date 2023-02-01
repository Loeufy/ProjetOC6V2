// on appelle jsonwebtoken
const jwt = require("jsonwebtoken");
// on exporte la requete
module.exports = (req, res, next) => {
  
  try {
    // on utilise le header authorization de la requete (CORS)
    const token = req.headers.authorization.split(" ")[1];
    // décoder le token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_ALEATOIRE);
    // on récupère le user id
    const userId = decodedToken.userId;
    // on rajoute l'objet userId 
    req.auth = { userId };
    // si
    if (req.body.userId && (req.body.userId !== userId)) {
      // renvoi un message
      throw error;
      // sinon ok
    } else {
      next();
    }
    // si erreur
  } catch (error) {
    // message en json
    res.status(401).json({ error });
  }
};
