const { Router } = require("express"),
{ getAllUsers } = require("../controllers/userController"),
checkAndValidateToken = require("../middlewares/auth"),
route = Router();



module.exports = (app) => {
    app.use('/users', route);   

    // all endpoints below this are protected 
    route.use(checkAndValidateToken);

    route.get('/all', getAllUsers);

   
}