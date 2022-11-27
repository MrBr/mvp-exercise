import { identify } from "./middleware";
import app from "../router";

app.use(identify);

export * from "./middleware";
export * from "./services";
