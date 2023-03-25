import db from "../app-data-source";
import { Request, Response } from "express";
import { UserModel } from "../entity/User";

export const getUsers = async (req: Request, res: Response) => {
  const users = await db.getRepository(UserModel).find();
  res.json(users);
};

export const getUserWithRole = async (req: Request, res: Response) => {
  const users = await db.getRepository(UserModel).find({
    relations: ["role"],
  });
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const results = await db.getRepository(UserModel).findOneBy({
    Id: req.params.id,
  });
  return res.json(results);
};

export const postUser = async (req: Request, res: Response) => {
  const user = db.getRepository(UserModel).create(req.body);
  const results = await db.getRepository(UserModel).save(user);
  return res.send(results);
};

export const putUser = async (req: Request, res: Response) => {
  const user = await db.getRepository(UserModel).findOneBy({
    Id: req.params.id,
  });
  db.getRepository(UserModel).merge(user, req.body);
  const results = await db.getRepository(UserModel).save(user);
  return res.send(results);
};

export const deleteUser = async (req: Request, res: Response) => {
  const results = await db.getRepository(UserModel).delete(req.params.id);
  return res.send(results);
};
