const path = require("path");

const envFilename = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : ".env";
require("dotenv").config({ path: path.join(__dirname, `../${envFilename}`) });

import "./db";
import "./router";
import "./user";
import "./product";
import "./auth";
import "./app";
// Has to be last to catch errors
import "./logger";
