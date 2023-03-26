import { body, check } from "express-validator";

export const registerValidation = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Kullanıcı adı en az 3 karakter olmalıdır.")
    .isAlphanumeric()
    .withMessage("Kullanıcı adı sadece sayı ve harflerden oluşmalıdır."),
  body("email").isEmail().withMessage("Geçerli e-posta adresi giriniz."),
  body("password").isLength({ min: 6 }).withMessage("Şifre en az 6 karakter olmalıdır."),
];

export const profileValidation = [
  // body("username")
  //   .isLength({ min: 3 })
  //   .withMessage("Kullanıcı adı en az 3 karakter olmalıdır.")
  //   .isAlphanumeric()
  //   .withMessage("Kullanıcı adı sadece sayı ve harflerden oluşmalıdır."),
  // body("email").isEmail().withMessage("Geçerli e-posta adresi giriniz."),
  // body("password").isLength({ min: 6 }).withMessage("Şifre en az 6 karakter olmalıdır."),
  // body("passwordConfirmation").custom((value, { req }) => {
  //   if (value !== req.body.password) {
  //     throw new Error("Şifreler eşleşmiyor.");
  //   }
  //   return true;
  // }),
  check("avatar").custom((value, { req }) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.avatar) {
      throw new Error("Profil resmi yüklenmelidir.");
    }
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    const profileImage = req.files.avatar;
    if (!allowedMimeTypes.includes(profileImage.mimetype)) {
      throw new Error("Sadece .jpeg, .png, .gif formatında dosya yükleyebilirsiniz.");
    }
    if (profileImage.size > 5 * 1024 * 1024) {
      throw new Error("Dosya boyutu 5 MB'ı geçemez.");
    }
    return true;
  }),
];
