import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../app-data-source";
import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { RoleModel } from "../models/Role";
import cryptoCookie from "../utils/cryptoCookie";
import { validationResult } from "express-validator";
import { UploadedFile } from "express-fileupload";
import slugify from "slugify";

export const login = async (req: Request, res: Response) => {
  /*  #swagger.tags = ["Auth"]
      #swagger.description = "Kullanıcı girişi."
      #swagger.requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/definitions/Login" },
            examples: { 
              User1: { $ref: "#/components/examples/User1" },
              User2: { $ref: "#/components/examples/User2" }
            }
          }
        }
      }    
  */
  const { username, password } = req.body;

  // Kullanıcı adı ve parola olmadan giriş işlemi yapılamaz
  if (!username || !password) {
    return res.status(400).send("Kullanıcı adı ve parola gereklidir.");
  }

  const user = await db.getRepository(UserModel).findOneBy({ username });

  if (!user) {
    return res.status(400).send("Kullanıcı adı veya parola yanlış.");
  }

  // Parola karşılaştırması
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).send("Kullanıcı adı veya parola yanlış.");
  }

  // JWT oluşturma ve yanıt olarak gönderme
  const token = jwt.sign({ id: user.Id, username: user.username }, process.env.TOKEN_KEY, { expiresIn: "1h" });
  res.header("Authorization", cryptoCookie.encryptCookie(token)).send("Giriş başarılı.");
  // res.cookie("Authorization", cryptoCookie.encryptCookie(token), { maxAge: 900000, httpOnly: true }).send("Giriş başarılı.");
};

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  /*  #swagger.tags = ["Auth"]
      #swagger.description = "Kullanıcı girişi."
  */
  const { username, password, firstName, lastName, phoneNumber, email } = req.body;

  // Kullanıcı adı ve parola olmadan kayıt işlemi yapılamaz
  if (!username || !password) {
    return res.status(400).send("Kullanıcı adı ve parola gereklidir.");
  }

  const user = await db.getRepository(UserModel).findOneBy([{ username }, { phoneNumber }, { email }]);

  // Kullanıcının daha önce kaydedilip kaydedilmediğini kontrol edilir
  if (user) {
    return res.status(400).send("Bu kullanıcı adı zaten alınmış.");
  }

  // Şifre hashleme işlemini gerçekleştirin
  const PasswordSalt = await bcrypt.genSalt(10);
  const PasswordHash = await bcrypt.hash(password, PasswordSalt);

  const role = await db.getRepository(RoleModel).findOneBy({ name: "Müşteri" });

  const createdUser = db.getRepository(UserModel).create({
    firstName,
    lastName,
    username,
    email,
    password: PasswordHash,
    phoneNumber,
    role: role,
  });

  const results = await db.getRepository(UserModel).save(createdUser);

  return res.send(results);
};

export const profile = async (req: Request, res: Response) => {
  // res.locals.formData = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  /*  #swagger.tags = ["Auth"]
      #swagger.description = "Kullanıcı profili."
      #swagger.requestBody = {
          content: {
            "multipart/form-data": {
              schema: { 
                type: "object", 
                properties: {
                  "avatar": {
                    type: "string",
                    format: "binary"
                  }
                }, 
              },
            },
          },
      }
  */
  // const { username, password, firstName, lastName, phoneNumber, email } = req.body;
  // // Kullanıcı adı ve parola olmadan kayıt işlemi yapılamaz
  // if (!username || !password) {
  //   return res.status(400).send("Kullanıcı adı ve parola gereklidir.");
  // }

  // Dosya kaydetme işlemi
  let avatar = req.files.avatar as UploadedFile;
  let file = avatar.name.split(".");
  let fileExtension = file.pop();
  let fileName = file.join("");
  let path = "src/public/upload/" + Date.now() + "-" + slugify(fileName, { lower: true, strict: true }) + "." + fileExtension;

  avatar.mv(path, (err) => {
    if (err) {
      return res.status(400).send(err);
    }
    console.log("RESIM YUKLEME BASARILI");
  });

  return res.send("Başarılı.");
};
