import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import db from "./app-data-source";
import auth from "./routes/auth";
import user from "./routes/user";
import product from "./routes/product";
import swaggerDocs from "./utils/swagger";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/auth";
import fileUpload from "express-fileupload";
import { logger } from "./utils/logger";
// import * as middlewares from "./middleware/middlewares";
import compression from 'compression'

db.initialize()
  .then(() => console.log("Veri tabanı başlatıldı!"))
  .catch((err) => logger.error("Veri tabanı başlatma sırasında hata: ", err));

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));
app.use(express.static("public"));

app.use("/", auth);
app.use("/users", authMiddleware, user);
app.use("/products", authMiddleware, product);
swaggerDocs(app, +port);

app.use((req, res) => {
  res.status(404).send("Sayfa bulunamadı.");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`, {
    timestamp: new Date(),
    stack: err.stack,
  });

  res.status(500).send("Bir hata meydana geldi.");
});
// app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});

process.on("uncaughtException", (error) => {
  console.log(error.stack);
});
