import express from "express";
import bodyParser from "body-parser";

const router = express();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: "2mb" }));

router.listen(process.env.PORT, () =>
  console.log(`Application started at port: ${process.env.PORT}`)
);

export * from "./middleware";
export * from "./errors";
export default router;
