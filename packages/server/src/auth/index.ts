import { identify } from "./middleware";
import app from "../app";

app.use(identify);

export { isIdentified } from "./middleware";
