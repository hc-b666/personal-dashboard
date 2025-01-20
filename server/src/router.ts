import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("o/");
});

export default router;
