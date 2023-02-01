// on importe multer
const multer = require("multer");
// on définit les images/formats reçu en appartenance
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/bmp": "bmp",
  "image/gif": "gif",
  "image/x-icon": "ico",
  "image/svg+xml": "svg",
  "image/tiff": "tif",
  "image/tif": "tif",
  "image/webp": "webp",
};
// enregistrer sur le disque
const storage = multer.diskStorage({
  // on choisit la destination
  destination: (req, file, callback) => {
    // pas eu d'erreur à ce niveau la
    callback(null, "images");
  },
  // on definit les termes
  filename: (req, file, callback) => {
    // nom d'origine du fichier
    const name = file.originalname.split(" ").join("_");
    // permet de créer une extension de fichiers
    const extension = MIME_TYPES[file.mimetype];
    // si le fichier correspond à un fichier
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/bmp" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/ico" ||
      file.mimetype === "image/svg" ||
      file.mimetype === "image/tiff" ||
      file.mimetype === "image/tif" ||
      file.mimetype === "image/webp"
    ) {
      // aura son nom associé à une date
      callback(null, name + Date.now() + "." + extension);
      // si ce n'est pas un fichier image
    } else {
      console.log("fichier non accepté");
      // déplace des fichiers non image
      callback(
        null,
        "isole/" + req.auth.userId + "_" + name + Date.now() + "." + extension
      );
    }
  },
});
// on exporte le fichier via multer
module.exports = multer({ storage }).single("image");
