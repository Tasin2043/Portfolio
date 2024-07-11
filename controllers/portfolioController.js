const nodemailer = require("nodemailer");
const BrevoTransport = require("nodemailer-brevo-transport");


// transport
const transporter = nodemailer.createTransport(
  new BrevoTransport({
    auth: {
      api_key: process.env.API_BREVO,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields!",
      });
    }

    // email matter
    transporter.sendMail({
      to: "tasin2043@gmail.com",
      from: "tasin2043@gmail.com",
      subject: "Regarding Tasin's Portfolio App",

      html: `
      <h5>Details Information</h5>
      <ul>
      <li><p>Name: ${name}</p></li>
      <li><p>Email: ${email}</p></li>
      <li><p>Message: ${msg}</p></li>
      </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your Message send Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Email API sending Failed!!",
      error,
    });
  }
};



module.exports = { sendEmailController };
