const { findUser } = require("../../data-access/user"),
logger = require("../../loaders/logger");



const checkIfUserExists = async ({body: { email }}, res, next) => {
    try {
        const checkUser = await findUser({ email }); 
        
        if (checkUser.length > 0) {
            throw new Error("User already exists")
        } else {
            next();
        }

    } catch ({ message }) {
        logger.error(message);
        throw new Error(message);                  
    }
}



module.exports = {
    checkIfUserExists
}