const winston = require("winston"),
config = require("../config"),
path = require("path");


let transports = [];
logPath = ''

if (process.env.NODE_ENV !== 'development') {
    transports.push(
        new winston.transports.File({
            filename: path.join(logPath, 'error.log'),
            level: 'error'
        })
    )
} else {
    transports = [
        new winston.transports.Console()
    ]
}

const LoggerInstance = winston.createLogger({
    level: 'info',
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
    transports
})

module.exports = LoggerInstance;

