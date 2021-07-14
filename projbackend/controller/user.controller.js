require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email }).then(async (data) => {
      if (data) {
        return res.status(400).json({
          success: false,
          error: "Email already exist",
        });
      }

      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        )
      ) {
        return res.status(400).json({
          success: false,
          error:
            "Password should be atleast Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        });
      }
      const userSubmitData = new User(req.body);

      const user = await userSubmitData
        .save()
        .then((data) => {
          if (data) {
            return res.status(200).json({
              success: true,
              msg: "User successfully created",
              data,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } catch (err) {
    console.log(err, " eroorrr");
    return res.status(400).json({
      success: false,
      msg: "User not created",
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user, err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          err: "No email found...",
        });
      }
      if (!user) {
        return res.status(400).json({
          success: false,
          err: "No user found...",
        });
      }
      if (!user.authenticate(password)) {
        return res.status(400).json({
          success: false,
          err: "Password does not match!",
        });
      }

      // Create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      res.cookie("token", token, { maxAge: 36000000 });

      const { _id, firstname, email, role } = user;
      return res.json({
        token: token,
        _id: _id,
        name: firstname,
        email: email,
        role: role,
        message: "User successfully logged In!",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        err: "User sign in failed...",
      });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    success: false,
    message: "User signed out successfully!",
  });
};

exports.getUser = (req, res) => {
  try {
    const { _id } = req.body;
    User.findOne({ _id }, (err, user) => {
      if (err) {
        return res.status(400).json({
          success: false,
          err: "No user found...",
        });
      }

      if (!user) {
        return res.status(400).json({
          success: false,
          err: "No user found...",
        });
      }

      user.salt = undefined;
      user.encry_password = undefined;
      return res.status(200).json({
        success: true,
        data: user,
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      err: "No user found...",
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      err: "No user found...",
    });
  }
};

exports.updateUser = async (req, res) => {
  User.findOne({ _id: req.body._id }, async (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        err: "No user found...",
      });
    }

    if (req.body.firstname) {
      user.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
      user.lastname = req.body.lastname;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedData = await User.findOneAndUpdate(
      { _id: req.body._id },
      user,
      (err, user) => {
        if (err) {
          return res.status(400).json({
            success: false,
            err: "No user found...",
          });
        }
        return res.status(200).json({
          success: true,
          message: "User data successfully updated",
        });
      }
    );
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const { _id } = req.body;
    await User.findOneAndDelete({ _id }).then((user, err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: "User not deleted",
        });
      }
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "No user found for this id.",
        });
      }
      return res.status(200).json({
        success: true,
        msg: "User deleted successfully!",
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "User not deleted",
    });
  }
};

exports.validateToken = async (req, res, next) => {
  try {
    if (!req.headers.cookie) {
      return res.status(400).json({
        success: false,
        msg: "User must be Logged In!",
      });
    }

    const token = req.headers.cookie.substring(6);
    jwt.verify(token, process.env.SECRET),
      (err, verified) => {
        if (err) {
          console.log(err, " tokeenn");
          return res.status(400).json({
            success: false,
            msg: "ACCESS DENIED",
          });
        }
      };
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      msg: "Token validation failed",
    });
  }
};
