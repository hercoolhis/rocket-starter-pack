const AuthService = require("../../services/auth"),
{ SignUp, SignIn } = new AuthService();


const userSignUp = async (req, res) => {
    
    let createdUser = await SignUp(req.body);
    
    res.status(201).json(createdUser);
}

const userSignIn =  async (req, res) => {
    let signedInUser = await SignIn(req.body);

    res.status(200).json(signedInUser);
}

module.exports = {
    userSignUp,
    userSignIn
}