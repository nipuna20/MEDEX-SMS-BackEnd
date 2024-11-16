const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const { body, validationResult } = require("express-validator");
const UserController = require("../controllers/user");
const validationRequest = require("@adeona-tech/common").validateRequest;
const checkAuth = require("@adeona-tech/common").checkAuth;
const auth = require("../middleware/auth");
const validater = require("../middleware/validater").validater;
const upload = require("../middleware/upload.js");
const upload_TableData = require("../middleware/upload_TableData");
const { route } = require("../app");
const { EmpTypeValidater } = require("../middleware/EmpTypeValidater");
const { DepartmentValidater } = require("../middleware/DepartmentValidater");
const {
  WorkingLocationValidater,
} = require("../middleware/WorkingLocationValidater");
const { JobPositionValidater } = require("../middleware/JobPositionValidater");
const {
  DepartureEmployeeValidater,
} = require("../middleware/DepartureEmployeeValidater");
const { SalaryValidater } = require("../middleware/SalaryValidater");
const { AllowanceValidater } = require("../middleware/AllowanceValidater");
const Course = require("../model/Course");
const Admin = require("../model/Admin");
const { where } = require("sequelize");
const { tokenLife } = require("@adeona-tech/common/config/config");

///User Post
router.post("/AdminUserCreation", (req, res) => {
  let newPost = new Admin(req.body);

  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Posts saved successfully",
    });
  });
});

router.post("/User/adminLogin", async (req, res, next) => {
  try {
    const userTrue = await Admin.findOne({ email: req.body.email });
    const bcrypt = require("bcrypt");

    if (
      !userTrue ||
      !(await bcrypt.compare(req.body.password, userTrue.password))
    ) {
      throw new Error("Invalid email or password");
    }

    console.log("my user is", req.body.email);
    console.log("find user is", userTrue);

    if (!userTrue) throw Error("User Not Found");

    res.status(200).json({
      status: "Success",
      Comment: "User Login Authentication!",
      Error: Error,
      Data: {
        email: req.body.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      comment: "login fail!, enter correct email",
      data: {
        Error: error.message,
      },
    });
  }
});

//Post
router.post("/post/save", (req, res) => {
  let newPost = new Post(req.body);

  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Posts saved successfully",
    });
  });
});

//get
router.get("/post", (req, res) => {
  Post.find().exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPost: post,
    });
  });
});

//post update
router.put("/post/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "update succesfully",
      });
    }
  );
});

//delet
router.delete("/post/delete/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        message: "Deletion unsuccessful",
        err,
      });
    }
    return res.json({
      message: "Deleted successfully",
      deletedPost,
    });
  });
});

///////////////////////////////////////////
///////courses///////

/// courses post
router.post("/course/save", (req, res) => {
  let newCourse = new Course(req.body);
  newCourse.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Course saved successfully",
    });
  });
});

///// courses get
router.get("/course", (req, res) => {
  Course.find().exec((err, course) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      CoursesData: course,
    });
  });
});

//delet
router.delete("/course/delete/:id", (req, res) => {
  Course.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        message: "Deletion unsuccessful",
        err,
      });
    }
    return res.json({
      message: "Deleted successfully",
      deletedPost,
    });
  });
});

//post update
router.put("/course/update/:id", (req, res) => {
  Course.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "update succesfully",
      });
    }
  );
});

// router.post("/", validater, UserController.userLogin);
// router.post("/createEmployee", auth, EmpTypeValidater, UserController.createEmployeData);
// router.get("/getEmployeeData", auth, UserController.EmployeeData);
// router.post("/EmployeeDataDelete", auth, UserController.EmployeeDataDelete);
// router.post("/EmployeeDataUpdate", auth, EmpTypeValidater, UserController.EmployeeDataUpdate);
// router.p

// router.post("/createCard", auth, upload.single('image'), UserController.createCard);
// router.post("/tableDataDelete", auth, UserController.tableDataDelete)
module.exports = router;
