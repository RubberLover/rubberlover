import nodemailer from "nodemailer";

const sendEmail = async (email: string, subject: string, body: string) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const options = () => {
      return {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        html: body,
      };
    };

    // Send email
    transporter.sendMail(options(), (error: any, info: any) => {
      if (error) {
        return error;
      } else {
        return info.response;
      }
    });
  } catch (error) {
    return error;
  }
};

export default sendEmail;
