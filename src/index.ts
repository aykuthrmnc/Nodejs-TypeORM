import dotenv from "dotenv";
import express from "express";
import db from "./app-data-source";
import user from "./routes/user";
import auth from "./routes/auth";
import swaggerDocs from "./utils/swagger";
import cors from "cors";
import { verifyToken } from "./middleware/auth";

db.initialize()
  .then(() => console.log("Veri tabanı başlatıldı!"))
  .catch((err) => console.error("Veri tabanı başlatma sırasında hata:", err));

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
swaggerDocs(app, +port);

app.use("/", auth);
app.use("/users", verifyToken, user);
app.use((req, res) => {
  res.status(404).send("Sayfa bulunamadı.");
});
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Sunucu hatası");
// });

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});

process.on("uncaughtException", (error) => {
  console.log(error.stack);
});
