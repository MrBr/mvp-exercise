const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

import "./db";
import "./app";
import "./user";
import "./product";
import "./auth";
