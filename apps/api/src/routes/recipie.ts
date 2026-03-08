import { Router } from "express";
import {
  createRecipe,
  getRecipieById,
  listRecipies,
} from "../controllers/recipie";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

// router.post("/register", register);
// router.post("/login", login);
// router.get("/me", requireAuth, me);
// router.post("/logout", logout);

router.post("/", requireAuth, createRecipe);
router.get("/list", requireAuth, listRecipies);
router.get("/:id", requireAuth, getRecipieById);

export default router;
