import connect from "@/dbConfig/dbConfig";
import nodemailer from "nodemailer";
import User from "@/models/userModal";
import bcryptjs from "bcryptjs";
connect()

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
      },
    });

    const mailOptions = {
        from : "anuragbhoite229@gmail.com" ,
        to : email ,
        subject : emailType === "VERIFY" ? "Verify your email" : "Reset Password" ,
        html : `
        <p> Click <a href = "${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a>
        to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password"}</p>       
        `
    }

    const mailResponse = await transport.sendMail(mailOptions)

    return mailResponse;

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
}
};
