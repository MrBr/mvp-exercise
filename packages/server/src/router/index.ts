import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const router = express();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: "2mb" }));
router.use(cors());

console.log(process.env.APP_DOMAIN);

router.listen(process.env.PORT, () =>
  console.log(`Application started at port: ${process.env.PORT}`)
);

export * from "./middleware";
export * from "./errors";
export default router;
