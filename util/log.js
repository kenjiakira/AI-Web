const winston = require('winston');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');

const logFilePath = path.join(__dirname, '../logs/app.log');

if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

const getVietnamTime = () => {
    return moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            const time = getVietnamTime(); 
            let emoji = '';
            const color = level === 'error' ? '\x1b[31m' : level === 'warn' ? '\x1b[33m' : '\x1b[32m';

            switch (level) {
                case 'error':
                    emoji = '❌';
                    break;
                case 'warn':
                    emoji = '⚠️'; 
                    break;
                case 'info':
                    emoji = 'ℹ️'; 
                    break;
                default:
                    emoji = '📜';
            }

            return `${color}[${time}] ${emoji} ${level.toUpperCase()}: ${message}\x1b[0m`;
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
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
