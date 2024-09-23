const winston = require('winston');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/app.log');

const fs = require('fs');
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [

        new winston.transports.Console({
            format: winston.format.colorize(),
        }),

        new winston.transports.File({
            filename: logFilePath,
            level: 'info',
            format: winston.format.json(),
        }),
    ],
});

const log = (message) => {
    logger.info(message);
};

const error = (message) => {
    logger.error(message);
};

module.exports = {
    log,
    error
};
