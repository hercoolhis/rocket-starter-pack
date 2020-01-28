const config = require("./src/config"),
express = require("express"),
logger = require("./src/loaders/logger"),
loaders = require("./src/loaders");
require("express-async-errors");


async function startServer() {
    try {
        const app = express(),
        appLoaded = await loaders(app);

        if (appLoaded) {
            app.listen(config.port, (error) => {
                if (error) {
                    logger.error(`Server failed to start, ${error.message}`);                    
                    process.exit(1);                
                }
                logger.info(`your server is ready at port ${config.port}`);                
            })
        } else {
            throw new Error("Couldn't load app");
        } 

    } catch (error) {
        logger.error(error.message);        
    }
}

startServer();