import nodemailer from 'nodemailer'

function generateOTP() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "rico0@ethereal.email",
      pass: "m5HN5aUf6RWrH4rG4g",
    },
  });

export {generateOTP,transporter}
