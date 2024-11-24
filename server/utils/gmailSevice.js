const nodemailer = require("nodemailer");
const googleApis = require("googleapis");

exports.sendEmail = async (email, subject, body) => {
  try {
    const authClient = new googleApis.google.auth.OAuth2(process.env.EMAIL_CLENT_ID, process.env.EMAIL_CLIENT_SECRET, process.env.EMAIL_REDIRECT_URI);
    authClient.setCredentials({ refresh_token: process.env.EMAIL_CLIENT_REFRESHTOKEN });

    //get access token using refresh token
    const EMAIL_ACCESS_TOKEN = await authClient.getAccessToken();


    //create transport object
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "lazydeveloperakash@gmail.com",
        clientId: process.env.EMAIL_CLENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_CLIENT_REFRESHTOKEN,
        accessToken: EMAIL_ACCESS_TOKEN
      }
    })

    const html = "<h1> chalega firse lavde!<h1/>";

    transport.sendMail({
      from: 'lazydeveloperakash@gmail.com',
      to: email,
      subject: subject,
      text: body,
      html: html
    });
  }
  catch (err) {
    console.log(err);
  }
}
