import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
export const sendUpdateEmail = async ({ reqBody }: any) => {
  try {
    const mail = process.env.WBTPTA_GMAIL_ID;
    const mailpassword = process.env.WBTPTA_GMAIL_PASSWORD;
    const transport = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        auth: {
          user: mail,
          pass: mailpassword,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })
    );

    const mailOptions = {
      from: mail,
      to: mail,
      subject: `${reqBody?.tname} has Updated his Details: Mail no ${Math.floor(
        Math.random() * 1000 + 1
      )}`,
      text: `${reqBody?.tname} has Updated his Details: ${JSON.stringify(
        reqBody
      )}`,
    };
    const mailResponse = await transport.sendMail(
      mailOptions,
      function (error: any, info: any) {
        if (error) {
          console.log("error", error);
        } else {
          console.log("Email Sent: " + info.response);
        }
      }
    );

    return mailResponse;
  } catch (error) {
    console.log(error);
  }
};
