import { Router } from "express";
import { deleteProduct, getProduct, getProductWithCategory, getProducts, postProduct, putProduct } from "../controllers/product";

const router = Router();

router.get("/", getProducts);
router.get("/withCategory", getProductWithCategory);
router.get("/:id", getProduct);
router.post("/", postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

export default router;
