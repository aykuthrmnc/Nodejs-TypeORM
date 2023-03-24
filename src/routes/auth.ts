import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../app-data-source";
import { Request, Response, Router } from "express";
import { UserModel } from "../entity/User";
import { RoleModel } from "../entity/Role";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Kullanıcı adı ve parola olmadan giriş işlemi yapılamaz
  if (!username || !password) {
    return res.status(400).send("Kullanıcı adı ve parola gereklidir.");
  }

  const user = await db.getRepository(UserModel).findOneBy({ Username: username });

  if (!user) {
    return res.status(400).send("Kullanıcı adı veya parola yanlış.");
  }

  // Parola karşılaştırması
  const passwordMatch = await bcrypt.compare(password, user.Password);
  if (!passwordMatch) {
    return res.status(400).send("Kullanıcı adı veya parola yanlış.");
  }

  // JWT oluşturma ve yanıt olarak gönderme
  const token = jwt.sign({ id: user.Id, username: user.Username }, process.env.TOKEN_KEY, { expiresIn: "1h" });
  res.header("Authorization", token).send("Giriş başarılı.");
});

router.post("/register", async (req: Request, res: Response) => {
  const { Username, Password, FirstName, LastName, PhoneNumber, Email } = req.body;

  // Kullanıcı adı ve parola olmadan kayıt işlemi yapılamaz
  if (!Username || !Password) {
    return res.status(400).send("Kullanıcı adı ve parola gereklidir.");
  }

  const user = await db.getRepository(UserModel).findOneBy({ Username });

  // Kullanıcının daha önce kaydedilip kaydedilmediğini kontrol edilir
  if (user) {
    return res.status(400).send("Bu kullanıcı adı zaten alınmış.");
  }

  // Şifre hashleme işlemini gerçekleştirin
  const PasswordSalt = await bcrypt.genSalt(10);
  const PasswordHash = await bcrypt.hash(Password, PasswordSalt);

  const role = await db.getRepository(RoleModel).findOneBy({ Name: "Müşteri" });

  const createdUser = db.getRepository(UserModel).create({
    FirstName,
    LastName,
    Username,
    Email,
    Password: PasswordHash,
    PhoneNumber,
    role: role,
  });

  const results = await db.getRepository(UserModel).save(createdUser);

  return res.send(results);
});

export default router;
