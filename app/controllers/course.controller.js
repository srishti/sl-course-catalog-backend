const db = require("../models");
const Course = db.course;

exports.getAllCourses = (req, res) => {
  Course.find()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while fetching courses.",
      });
    });
};

exports.getCourseById = (req, res) => {
  const id = req.params.id;
  Course.findById({ _id: id })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "No course found with given ID!" });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong while fetching course with given ID",
      });
    });
};
