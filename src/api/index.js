const { Router } = require("express"),
user = require("./routes/user"),
auth = require("./routes/auth");


module.exports = () => {
    const app = Router();
    user(app);
    auth(app);

    return app;
}