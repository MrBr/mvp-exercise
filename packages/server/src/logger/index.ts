import app from "../router";
import { errorHandler } from "./middleware";

app.use(errorHandler);
