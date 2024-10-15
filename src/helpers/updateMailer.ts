import nodemailer from "nodemailer";
export const sendUpdateEmail = async ({ reqBody }: any) => {
  try {
    const mail = process.env.WBTPTA_GMAIL_ID;
    const mailpassword = process.env.WBTPTA_GMAIL_PASSWORD;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
    });

    // const mailOptions = {
    //   from: mail,
    //   to: mail,
    //   subject: `${reqBody?.tname} has Updated his Details: Mail no ${Math.floor(
    //     Math.random() * 1000 + 1
    //   )}`,
    //   text: `${reqBody?.tname} has Updated his Details: ${JSON.stringify(
    //     reqBody
    //   )}`,
    // };
    // const mailResponse = await transport.sendMail(
    //   mailOptions,
    //   function (error: any, info: any) {
    //     if (error) {
    //       console.log("error", error);
    //     } else {
    //       console.log("Email Sent: " + info.response);
    //     }
    //   }
    // );

    // return mailResponse;

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transport.verify(function (error: any, success: any) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailData = {
      from: {
        name: `WBTPTA AMTA WEST`,
        address: mail,
      },
      replyTo: mail,
      to: mail,
      subject: `form message`,
      text: `Hello Admin!`,
      html: `<h1 style="text-align:center; color:blue; ">Hello Dear Admin!</h1>
        <h2 style="text-align:center; color:blue;">${
          reqBody?.tname
        } has Updated his Details: ${JSON.stringify(reqBody)}</h2>`,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transport.sendMail(mailData, (err: any, info: any) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("Email Sent: " + info.response);
          resolve(info);
        }
      });
    });
    return "Email sent successfully";
  } catch (error) {
    console.log(error);
  }
};
