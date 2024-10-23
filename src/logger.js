const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: "src/logs/error.log", level: "error" }),

    new transports.File({ filename: "src/logs/combined.log" }),

    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
  ],
});

module.exports = { logger }