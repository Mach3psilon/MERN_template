import joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import initialize from "../../utils/passport-config.js";
import passport from "passport";

import User from "../../models/User.js";
import EmailSender from "../../utils/email.js";

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    try {
      const newSender = new EmailSender();
      newSender.sendEmail({
        to: email,
        subject: "Activate Your Account",
        html: "<h1>test</h1>",
      });
    } catch (error) {
      console.log(error);
    }

    console.log(req.body);
    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
      User.findOne({ email }, function (err, email) {
        console.log("email", err);
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique Email" });

        resolve();
      });
    });

    existEmail
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new User({
                email: email,
                password: hashedPassword,
              });

              // return save result as a response
              user
                .save()

                .then(
                  res
                    .status(201)
                    .send({ message: `Activation email is sent to: ${email}` })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function sendEmail(req, res) {
  try {
    const { reason, recipient } = req.body;

    const existEmail = new Promise((resolve, reject) => {
      User.findOne({ recipient }, function (err, recipient) {
        if (err) reject(new Error(err));

        if (recipient) resolve();
        reject();
      });
    });

    const createJWT = new Promise((resolve, reject) => {
      const payload = {
        email: recipient,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };
      jwt.sign(payload, process.env.JWT_SECRET_EMAIL, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });

    const sendMail = (token) =>
      new Promise((resolve, reject) => {
        const newSender = new EmailSender();
        const client_domain = process.env.CLIENT_DOMAIN;
        console.log("recipient", recipient);
        let content = {};
        if (reason === "register") {
          content = {
            to: recipient,
            subject: "Activate Your Account",
            html: `<h1>Click to activate your account:</h1><br/><a href='${client_domain}/api/auth/activate/${token}'>Activate</a>`,
          };
        } else if (reason === "forgotPassword") {
          content = {
            to: recipient,
            subject: "Reset Your Password",
            html: `<h1>Click to reset your password:</h1><br/><a href='${client_domain}/api/auth/reset/${token}'>Reset</a>`,
          };
        } else if (reason === "resetPassword") {
          content = {
            to: recipient,
            subject: "Reset Your Password",
            html: `<h1>Click to reset your password:</h1><br/><a href='${client_domain}/api/auth/reset/${token}'>Reset</a>`,
          };
        } else {
          reject();
        }

        console.log(content);
        newSender.send(content);

        resolve();
      });

    existEmail
      .then(() => {
        return createJWT.then((token) => token);
      })
      .then((token) => {
        return sendMail(token);
      })
      .then(() => {
        res.status(201).send({ message: `Email is sent to: ${recipient}` });
      })

      .catch((error) => {
        res.status(500).send({ error: error });
      });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function activateUser(req, res) {
  try {
    let token = req.params.token;
    console.log("token", token);
    jwt.verify(token, process.env.JWT_SECRET_EMAIL, (err, decoded) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      User.findOne({ email: decoded.email }, function (err, user) {
        if (err) {
          return res.status(500).send({ error: err });
        }
        if (!user) {
          return res.status(404).send({ error: "User not found" });
        }
        user.isVerified = true;
        user.save();
        res.status(200).send({ message: "User is activated" });
      });
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const createJWT = (user) =>
      new Promise((resolve, reject) => {
        const payload = {
          user: user,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        };
        jwt.sign(payload, process.env.JWT_SECRET_EMAIL, (err, token) => {
          if (err) reject(err);
          resolve(token);
        });
      });

    const getUser = new Promise((resolve, reject) => {
      User.findOne({ email }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) resolve(user);
        reject();
      });
    });

    const checkPassword = (user) =>
      new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) reject(err);
          if (result) resolve(user);
          reject();
        });
      });

    getUser
      .then((user) => {
        return checkPassword(user).then((user) => user);
      })
      .then((user) => {
        return createJWT(user).then((token) => {
          return { user, token };
        });
      })
      .then(({ user, token }) => {
        const UserData = {
          id: user._id,
          email: user.email,
          role: user.role,
        };
        res.status(200).send({ UserData: UserData, accessToken: token });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}
