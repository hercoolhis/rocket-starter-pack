const expressLoader = require("./express"),
mongooseLoader = require('./mongoose'),
logger = require('./logger');

module.exports = async (expressApp) => {
    try {
        await expressLoader(expressApp);
        logger.info("Express App Loaded");
        

        await mongooseLoader();
        logger.info("Mongoose Connection done");
              
        
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}