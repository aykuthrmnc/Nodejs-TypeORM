import { Request, Response, Router } from "express";
import db from "../app-data-source";
import { UserModel } from "../entity/User";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await db.getRepository(UserModel).find();
  res.json(users);
});
router.get("/withRole", async (req: Request, res: Response) => {
  const users = await db.getRepository(UserModel).find({
    relations: ["role"],
  });
  res.json(users);
});

router.get("/:id", async (req: Request, res: Response) => {
  const results = await db.getRepository(UserModel).findOneBy({
    Id: req.params.id,
  });
  return res.json(results);
});

router.post("/", async (req: Request, res: Response) => {
  const user = db.getRepository(UserModel).create(req.body);
  const results = await db.getRepository(UserModel).save(user);
  return res.send(results);
});

router.put("/:id", async (req: Request, res: Response) => {
  const user = await db.getRepository(UserModel).findOneBy({
    Id: req.params.id,
  });
  db.getRepository(UserModel).merge(user, req.body);
  const results = await db.getRepository(UserModel).save(user);
  return res.send(results);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const results = await db.getRepository(UserModel).delete(req.params.id);
  return res.send(results);
});

export default router;
