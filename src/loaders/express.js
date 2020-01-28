const bodyParser = require("body-parser"),
{ apiErrorHandler, handle404, unCaughtExceptionAndUnhandledRejection } = require("./errorHandler"),
config = require("../config"),
routes = require("../api"),
cors = require("cors");


module.exports = async (app) => {

    app.use(bodyParser.json());  
    app.use(cors());



    app.use(config.apiPath, routes());


    //error handling
    app.use(apiErrorHandler);
    app.use(handle404);

    process.on('uncaughtException', (ex) => {
        unCaughtExceptionAndUnhandledRejection(error);
    })
    
    process.on('unhandledRejection', (error) => {
        unCaughtExceptionAndUnhandledRejection(error);
    })

    return app;
}