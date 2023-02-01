const http = require("http");
// importe le fichier de l'application
const app = require("./app");

const normalizePort = (val) => {
  //Exécute parseInt, qui convertit la valeur en un entier
  const port = parseInt(val, 10);
  // si port n'est pas un nombre
  if (isNaN(port)) {
    // retourne
    return val;
  }
  //  si sup ou égal à 0
  if (port >= 0) {
    // retourne
    return port;
  }
  // sinon
  return false;
};

// const port = normalizePort(process.env.PORT || '3000');
const port = normalizePort(process.env.PORT || "3000");
// express doit tourner sur le 'port' avec la constante port
app.set("port", port);

// recherche les différentes erreurs
const errorHandler = (error) => {
  // si nothing
  if (error.syscall !== "listen") {
    // erreur
    throw error;
  }
  // si erreur code
  switch (error.code) {
    // EACCES refusée
    case "EACCES":
      console.error(error);
      //mettre fin au processus
      process.exit(1);
      // fin
      break;
    //l'adresse cherchée est en cour d'utilisation
    case "EADDRINUSE":
      console.error(error);
      // mettre fin au processus avec un échec
      process.exit(1);
      //fin
      break;
    // par défaut
    default:
      // lance une erreur
      throw error;
  }
};

// on passe cette application app en argument pour créer le serveur
const server = http.createServer(app);
// si le server est en erreur appelle la fonction errorHandler qui gère les erreurs
server.on("error", errorHandler);
// un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.on("listening", () => {
  // on peut écrire ça
  //console.log(`Listening on port ${process.env.PORT} (FR)écoute sur le port ${process.env.PORT}`);
  console.log(
    "Listening on port " +
      process.env.PORT +
      "(FR)écoute sur le port " +
      process.env.PORT
  );
});
// attend et ecoute les requetes envoyées; par defaut en développement on utilise le port 3000 et quand il n'est pas disponible la version spare process.env.PORT
server.listen(port);
