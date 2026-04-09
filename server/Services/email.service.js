import nodemailer from "nodemailer"

// Send an email using async/await
export const sendEmail = async (receipient, subject , content) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.APP_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: `"IS EduTrack" <${process.env.EMAIL_USER}>`,
        to: receipient,
        subject: subject,
        // text: "Hello world?", // Plain-text version of the message
        html: content , // HTML version of the message
    });


    };

   