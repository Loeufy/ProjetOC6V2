var passwordSchema = require("../../models/password");

module.exports = (req, res, next) => {

    try {
        if (!req.body.email || req.body.email == undefined || req.body.email == null) {
            return res.status(401).json({ error: "Le champ email est obligatoire. Veuillez le renseigné." });
        } else {

            const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

            if (!emailRegexp.test(req.body.email)) {

                return res.status(400).json({ error: "Le champ email est incorrect. Veuillez réessayé." });

            }

        }

        if (!req.body.password || req.body.password == undefined || req.body.password == null) {
            return res.status(401).json({ error: "Le champ mot de passe est obligatoire. Veuillez le renseigné." });
        } else {

            const validePassword = passwordSchema.validate(req.body.password);

            if(!validePassword){
                return res.status(401).json({ error: "Le champ mot de passe est incorrect. Veuillez le renseigné. Le mot de passe doit contenir - - - - - - - ." });
            }

        }

        next();


    } catch (error) {
        res.status(401).json({ error });
    }
};
