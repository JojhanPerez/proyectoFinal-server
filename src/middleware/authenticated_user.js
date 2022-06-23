const jwt = require("jwt-simple");
const moment = require("moment");
const SECRET_KEY = "pon-tu-propia-clave-2022";

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization)
        res.status(403).send({ message: "No esta autenticado" });

    const token = req.headers.authorization.replace(/['"]+/g, "");
    try {
        var payload = jwt.decode(token, SECRET_KEY);

        if (payload.expiration_date <= moment.unix())
            res.status(404).send({ message: "El token ha expirado" });
    } catch (error) {
        return res.status(404).send({ message: "Token inválido" });
    }
    req.user = payload;
    next();
};
