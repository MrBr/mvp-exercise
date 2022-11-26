import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "2mb" }));

app.listen(process.env.PORT, () =>
  console.log(`Application started at port: ${process.env.PORT}`)
);

export * from "./middleware";
export * from "./types";
export default app;
