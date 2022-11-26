import app from "../app";
import { errorHandler } from "./middleware";

app.use(errorHandler);
