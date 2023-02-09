import nodemailer from "nodemailer";

class EmailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  send = ({ to, subject, html }) => {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: to,
      subject: subject,
      html: html,
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return Promise.reject(error);
      } else {
        console.log("Email sent: " + info.response);
        return Promise.resolve();
      }
    });
  };
}

export default EmailSender;
