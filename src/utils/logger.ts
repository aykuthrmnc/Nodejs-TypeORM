import winston from "winston";

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", format: winston.format.combine(winston.format.timestamp(), winston.format.json()) }),
  ],
});
