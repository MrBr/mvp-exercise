const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

import "./db";
import "./router";
import "./user";
import "./product";
import "./auth";
// Has to be last to catch errors
import "./logger";
