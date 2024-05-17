import db from "../app-data-source";
import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { Product } from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  /*  
      #swagger.tags = ["Product"]
      #swagger.description = "Ürün bilgilerini getirir."
  */
  const products = await db.getRepository(Product).find();
  res.json(products);
};

export const getProductWithCategory = async (req: Request, res: Response) => {
  /*  
    #swagger.tags = ["Product"]
    #swagger.description = "Ürünleri kategorileriyle beraber listeler."
  */
  const users = await db.getRepository(Product).find({
    relations: ["category"],
  });
  res.json(users);
};

export const getProduct = async (req: Request, res: Response) => {
  const id = req.query.id;
  /*  
    #swagger.tags = ["Product"]
  */
  const results = await db.getRepository(Product).findOneBy({
    id: +id,
  });
  return res.json(results);
};

export const postProduct = async (req: Request, res: Response) => {
  const { name, price, description, categoryId } = req.body;

  /*  
    #swagger.tags = ["Product"]
    #swagger.description = "Yeni ürün ekler"
  */
  const product = db.getRepository(Product).create({ name, price, description, categoryId });
  const results = await db.getRepository(Product).save(product);
  return res.send(results);
};

export const putProduct = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName, email, phoneNumber } = req.body;
  /*  
    #swagger.tags = ["Product"]
    #swagger.description = "Ürün bilgilerini günceller."
    #swagger.parameters["id"] = { description: "ID gereklidir." }
  */
  const user = await db.getRepository(UserModel).findOneBy({
    Id: req.params.id,
  });
  db.getRepository(UserModel).merge(user, { username, password, firstName, lastName, phoneNumber, email });
  const results = await db.getRepository(UserModel).save(user);
  return res.status(200).send(results);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  /*  
    #swagger.tags = ["Product"]
    #swagger.description = "Ürünü siler."
    #swagger.parameters["id"] = { description: "ID gereklidir." }
  */
  const results = await db.getRepository(UserModel).delete(id);
  return res.send(results);
};
