import express from "express";

import {
  register,
  sendEmail,
  activateUser,
  loginUser,
} from "../controllers/auth/auth.js";

const router = express.Router();

router.post("/register", register);

router.get("/signal", (req, res) =>
  res.status(200).json({ message: "Hello World!2" })
);

router.post("/send-email", sendEmail);

router.get("/activate/:token", activateUser);

router.post("/login", loginUser);

// //  Input : username/password via body
// //  HTTP Success : 200, message and user infos.
// //  HTTP Errors : 400, 401.
// router.post("/login", postLogin);

// //  Input : email via body.
// //  HTTP Success : 200 and message.
// //  HTTP Errors : 400, 404, 500, 503.
// router.post("/login/forgot", postLoginForgot);

// //  Input : reset token via params, new password via body.
// //  HTTP Success : 200 and message.
// //  HTTP Errors : 400, 404, 500, 503.
// router.post("/login/reset/:token", postLoginReset);

// //  Input : void, identified by session cookie.
// //  HTTP Success : 200 and message.
// //  HTTP Errors : 400, 500, 503.
// router.post("/logout", postLogout);

// //  Input : email via body;
// //  HTTP Success : 200 and message.
// //  HTTP Errors : 400, 404, 500, 503.
// router.post("/send-confirmation", postVerify);

// router.get("/confirmation/:token", getConfirmation);
export default router;
