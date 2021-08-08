const auth = require("../../middleware/auth");

module.exports = (app) => {
  const order = require("../controllers/order.controller");

  var router = require("express").Router();

  router.post("/order", order.placeOrder);

  app.use("/api", auth, router);
};
