import { identify } from "./middleware";
import app from "../app";

app.use(identify);

export * from "./middleware";
export * from "./services";
