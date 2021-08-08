// const auth = require("../../middleware/auth");

module.exports = (app) => {
  const course = require("../controllers/course.controller.js");

  var router = require("express").Router();

  // get all courses
  router.get("/", course.getAllCourses);

  // get course with given ID
  router.get("/:id", course.getCourseById);

  app.use("/api/course", router);
};
