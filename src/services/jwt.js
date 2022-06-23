const jwt = require("jwt-simple");
const moment = require("moment");
const SECRET_KEY = "pon-tu-propia-clave-2022";

exports.createAccessWithToken = (user) => {
    const payLoad = {
        id: user._id,
        name_user: user.name_user,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        createToken: moment().unix(),
        expiration_date: moment().add(12, "hours").unix(),
    };
    return jwt.encode(payLoad, SECRET_KEY);
};

exports.createRefreshToken = (user) => {
    const payLoad = {
        id: user._id,
        expiration_date: moment().add(30, "days").unix(),
    };
    return jwt.encode(payLoad, SECRET_KEY);
};

// Función que decodifica cualquiera de los tokens
exports.decodedToken = (token) => {
    return jwt.decode(token, SECRET_KEY, true);
};
