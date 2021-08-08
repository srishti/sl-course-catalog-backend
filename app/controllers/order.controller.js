const db = require("../models");
const Order = db.order;

exports.placeOrder = (req, res) => {
  if (!req.body.userId && !req.body.courseId) {
    res.status(401).send({ message: "userId or courseId missing." });
    return;
  }

  if (req.body.otp === "123456") {
    const order = new Order({
      userId: req.body.userId,
      courseId: req.body.courseId,
      otp: req.body.otp,
    });

    order
      .save(order)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Something went wrong. Please try again.",
        });
      });
  } else {
    res.status(401).send({ message: "Incorrect OTP." });
  }
};
