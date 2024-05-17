import CryptoJS from "crypto-js";

// Cookie şifreleme fonksiyonu
const encryptCookie = (value: any) => {
  const encryptedValue = CryptoJS.AES.encrypt(value, process.env.COOKIE_KEY).toString();
  return encryptedValue;
};

// Cookie çözme fonksiyonu
const decryptCookie = (value: any) => {
  try {
    const decryptedValue = CryptoJS.AES.decrypt(value, process.env.COOKIE_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  } catch (error) {
    console.log(error);
    return;
  }
};

export default {
  encryptCookie,
  decryptCookie,
};
