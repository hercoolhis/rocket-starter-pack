const mongoose = require("mongoose")
config = require("../config");


module.exports = async () => {
    let connectionConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }

    const connection = await mongoose.connect(config.databaseUrl, connectionConfig);

    return connection.connection.db;
}