const { checkIfUserExists } = require("../middlewares/user"),
{ validationRules, validateRequestWithRules } = require("../middlewares/bodyValidator"),
{ Router } = require("express"),
{ userSignUp, userSignIn } = require("../controllers/authController"),
route = Router();



module.exports = (app) => {
    app.use('/auth', route);

    //signup route ...validate request body first
    route.post('/signup', [validationRules(), validateRequestWithRules, checkIfUserExists], userSignUp);

    //signin route
    route.post('/signin', userSignIn);
    
}