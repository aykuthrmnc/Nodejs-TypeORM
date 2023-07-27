import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const responseBody = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? ":(" : err.stack,
  };

  console.log("Error: ", responseBody);
  res.json(responseBody);
};
