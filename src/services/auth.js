const bcrypt = require("bcryptjs"),
logger = require("../loaders/logger"),
jwt = require("jsonwebtoken"),
{ secret } = require("../config"),
{ createUser } = require("../data-access/user"),
{ findUser } = require("../data-access/user");


module.exports = class AuthService {

    constructor() {        
        this.SignUp = this.SignUp.bind(this);
        this.SignIn = this.SignIn.bind(this);
    }
    
    async SignUp(payload) {
        try {
            //get input  
            const { email, password } = payload;          
            
            //hash password
            logger.info("Hashing Password");
            let hashedPassword = await bcrypt.hash(password, 10);

            //create user ...delegate to data access layer later
            logger.info("Creating User");
            const userRecord = await createUser({
                ...payload,
                password: hashedPassword
            });         

            //generate jwt
            logger.info("Generating token");
            let token = this.generateToken(email),
            user = userRecord.toObject();

            //remove password from user object
            Reflect.deleteProperty(user, 'password');

            //return user details and token
            return {
                user,
                token
            }

        } catch ({message}) {
           throw new Error(message);
        }
    }

    async SignIn(payload) {
        
        //get input
        const { email, password } = payload;    
        //find user ...delegate to data access layer later
        let userRecord = await findUser({ email });
       
        if (!userRecord) {
            throw new Error('User not registered');
        }
        
        //check password
        let validPassword = await bcrypt.compare(password, userRecord.password);
        if (validPassword) {
            const token = this.generateToken(email),
            user = userRecord.toObject();

            Reflect.deleteProperty(user, 'password');

            //return user and token
            return {
                user,
                token
            }
        } else {
            throw new Error('invalid Password');
        }        

    }

    generateToken(email) {
        return jwt.sign({ email }, secret, { expiresIn: '1h' });
    }

}