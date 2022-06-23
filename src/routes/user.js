const express = require("express");
const UserCrontroller = require("../controllers/user");
const multipart = require("connect-multiparty");
const middleware_user_authenticated = require("../middleware/authenticated_user");
const md_upload_avatar = multipart({ uploadDir: "../../assets/avatar" });

const api = express.Router();

api.post("/signup", UserCrontroller.signUp);
api.post("/signin", UserCrontroller.signIn);
api.get("/getavatar/:avatarName", UserCrontroller.getAvatar);
api.get("/users", [middleware_user_authenticated.ensureAuth], UserCrontroller.getUsers);
api.get("/activeusers", [middleware_user_authenticated.ensureAuth], UserCrontroller.getActiveUsers);
api.put("/uploadavatar/:id", [middleware_user_authenticated.ensureAuth, md_upload_avatar], UserCrontroller.uploadAvatar);
api.put("/updateuser/:id", [middleware_user_authenticated.ensureAuth], UserCrontroller.updateUser);
api.put("/activateuser/:id", [middleware_user_authenticated.ensureAuth], UserCrontroller.activateUser);
api.delete("/deleteuser/:id", [middleware_user_authenticated.ensureAuth], UserCrontroller.deleteUser);
api.post("/signupadmin", [middleware_user_authenticated.ensureAuth], UserCrontroller.signUpAdmin);

module.exports = api;
