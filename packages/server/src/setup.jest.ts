import "./index";
import { server } from "./router";

afterAll(() => server.close());
