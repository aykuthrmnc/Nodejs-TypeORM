import db from "../app-data-source";
import { Request, Response } from "express";
import { UserModel } from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  /*  
    #swagger.tags = ["User"]
    #swagger.description = "Kullanıcıları listeler."
  */
  const users = await db.getRepository(UserModel).find();
  res.json(users);
};

export const getUserWithRole = async (req: Request, res: Response) => {
  /*  
    #swagger.tags = ["User"]
    #swagger.description = "Kullanıcıları rolleriyle beraber listeler."
  */
  const users = await db.getRepository(UserModel).find({
    relations: ["role"],
  });
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  /*  
    #swagger.tags = ["User"]
    #swagger.description = "Kullanıcı bilgisini getirir."
    #swagger.parameters["id"] = { description: "ID gereklidir." }
  */
  const results = await db.getRepository(UserModel).findOneBy({
    Id: req.params.id,
  });
  return res.json(results);
};

export const postUser = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName, phoneNumber, email } = req.body;
  /*  
    #swagger.tags = ["User"]
    #swagger.description = "Yeni kullanıcı ekler"
  */
  const user = db.getRepository(UserModel).create({ username, password, firstName, lastName, phoneNumber, email });
  const results = await db.getRepository(UserModel).save(user);
  return res.send(results);
};

export const putUser = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName, email, phoneNumber } = req.body;
  /*  
    #swagger.tags = ["User"]
    #swagger.description = "Kullanıcı bilgilerini günceller."
    #swagger.parameters["id"] = { description: "ID gereklidir." }
  */
  const user = await db.getRepository(UserModel).findOneBy({
    Id: req.params.id,
  });
  db.getRepository(UserModel).merge(user, { username, password, firstName, lastName, phoneNumber, email });
  const results = await db.getRepository(UserModel).save(user);
  /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/UpdateUser" },
      description: "User registered successfully." } */
  return res.status(200).send(results);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  /*  
    #swagger.tags = ["User"]
    #swagger.description = "Kullanıcıyı siler."
    #swagger.parameters["id"] = { description: "ID gereklidir." }
  */
  const results = await db.getRepository(UserModel).delete(id);
  return res.send(results);
};
