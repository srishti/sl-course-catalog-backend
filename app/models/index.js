const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.course = require("./course.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);
db.order = require("./order.model.js")(mongoose);

module.exports = db;
