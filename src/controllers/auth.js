const jwt = require("../services/jwt");
const moment = require("moment");
const user = require("../models/user.model");

const checkIfTokenExpired = (token) => {
    const { expiredDate } = jwt.decodedToken(token);
    const currentDate = moment().unix();
    return currentDate > expiredDate ? true : false;
};

const refreshAccessToken = (req, res) => {
    const { refreshToken } = req.body;
    const tokenExpired = checkIfTokenExpired(refreshToken);
    console.log(tokenExpired);

    const { id } = jwt.decodedToken(refreshToken);

    tokenExpired
        ? res.status(404).send({ message: "El token ha caducado" })
        : user.findOne({ _id: id }, (err, userStored) =>
            err
                ? res.status(500).send({ message: "Error del servidor" })
                : !userStored
                    ? res.status(400).send({ message: "Usuario no encontrado" })
                    : res.status(200).send({
                        accessToken: jwt.createAccessWithToken(userStored),
                        refreshToken: refreshToken,
                    })
        );
};

module.exports = { refreshAccessToken };
