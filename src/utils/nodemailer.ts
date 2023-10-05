import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  service: "gmail",
  from: "shipcarleads@gmail.com",
  auth: {
    user: 'shipcarleads@gmail.com', // generated ethereal user
    pass: 'hubbkjkeuimohket', // generated ethereal password
  },
});

const Mail = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err.message);
    console.log(info);
  })
}

export default Mail