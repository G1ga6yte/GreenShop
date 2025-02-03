import nodemailer from 'nodemailer';
import fs from 'fs';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

const sendVerificationEmail = async (to, verificationCode) => {
    const img1 = await fs.readFileSync('./images/Logo.png');
    const img2 = await fs.readFileSync('./images/emailImg.png');
    const facebookSvg = await fs.readFileSync('./images/Facebook.png');
    const instagramSvg = await fs.readFileSync('./images/Instagram.png');
    const linkedinSvg = await fs.readFileSync('./images/Linkedin.png');
    const twitterSvg = await fs.readFileSync('./images/Twitter.png');
    const unionSvg = await fs.readFileSync('./images/Union.png');

    const mailOptions = {
        from: {
            name: 'Green Shop',
            address: process.env.USER,
        },
        to: [to],
        subject: 'Greenshop verify',
        text: `Your verification code is: ${verificationCode}`,
        html: `<div class="cont" style="width: 70%; margin: 50px auto; font-family: Arial, sans-serif; box-sizing: border-box; background-color: #eaeaea; padding: 50px 50px;">
            <div class="logoCont" style="display: flex; box-sizing: border-box; justify-content: space-between; width: 100%; align-items: center; margin-bottom: 20px;">
                <img src="cid:logo_image" alt="Logo">
                <div style="width: 100%"></div>
                <a href="http://localhost:3000/" style="color: #46A358; cursor: pointer; white-space: nowrap; font-size: 14px;">View in browser</a>
            </div>
            <img src="cid:email_image" style="width: 100%; box-sizing: border-box; border-radius: 12px;" alt="Email Image">
            
            <p class="prg" style="font-size: 24px; box-sizing: border-box; font-weight: 600; color: #3D3D3D; text-align: center; max-width: 70%; margin: 40px auto;">
                Only one step left to become a part of GreenShop family. Please enter this verification code in the window where you started creating your account.
            </p>

            <div class="codeCont" style="background-color: white; box-sizing: border-box; border-radius: 6px; padding: 20px 80px; color: black; font-size: 64px; font-weight: 900; width: max-content; margin: 0 auto;">
                ${verificationCode}
            </div>

            <p class="prg" style="text-align: center; box-sizing: border-box; font-size: 14px; color: #3D3D3D; font-weight: 400;">
                To protect your account, don't forward this email or give this code to anyone!
            </p>

            <div class="buttonCont" style="width: 100%; box-sizing: border-box; margin-top: 40px; padding: 20px 40px 40px; background-color: #9ded99;">
                <p class="prg" style="font-size: 22px; width: 100%; text-align: center; box-sizing: border-box; color: #3D3D3D; font-weight: 600; margin-bottom: 40px;">
                    Or click on the button below to verify your email.
                </p>
                <a href="http://localhost:3000/" style="font-size: 22px; text-align: center; display: block; cursor: pointer; box-sizing: border-box; color: white; background-color: #26d248; border: none; font-weight: 300; text-decoration: none; max-width: 500px; padding: 20px 40px; border-radius: 6px; margin: 0 auto 20px;">
                    Verify email address
                </a>
            </div>

            <div class="questionCont" style="width: 100%; box-sizing: border-box; margin-top: 20px; background-color: #9ded99; font-size: 18px; font-weight: 500; text-align: center; padding: 20px 40px; color: #3D3D3D;">
                Have a question or trouble logging in? Please contact us <a style="color: #157027;" href="mailto:sargsyan.vache.02@gmail.com">here</a>
            </div>

            <div class="socialCont" style="width: fit-content; display: flex; justify-content: center; align-items: center; box-sizing: border-box; margin: 80px auto 150px; gap: 8px;">
                <a href="http://localhost:3000/" class="link" style="text-decoration: none; margin: 0 6px; display: block; border: 1px solid #46A358; padding: 4px 6px; border-radius: 4px;">
                    <img style="max-height: 20px; max-width: 20px;" src="cid:facebook_image" alt="Facebook">
                </a>
                <a href="http://localhost:3000/" class="link" style="text-decoration: none; margin: 0 6px; display: block; border: 1px solid #46A358; padding: 4px 6px; border-radius: 4px;">
                    <img style="max-height: 20px; max-width: 20px;" src="cid:instagram_image" alt="Instagram">
                </a>
                <a href="http://localhost:3000/" class="link" style="text-decoration: none; margin: 0 6px; display: block; border: 1px solid #46A358; padding: 4px 6px; border-radius: 4px;">
                    <img style="max-height: 20px; max-width: 20px;" src="cid:linkedin_image" alt="LinkedIn">
                </a>
                <a href="http://localhost:3000/" class="link" style="text-decoration: none; margin: 0 6px; display: block; border: 1px solid #46A358; padding: 4px 6px; border-radius: 4px;">
                    <img style="max-height: 20px; max-width: 20px;" src="cid:twitter_image" alt="Twitter">
                </a>
                <a href="http://localhost:3000/" class="link" style="text-decoration: none; margin: 0 6px; display: block; border: 1px solid #46A358; padding: 4px 6px; border-radius: 4px;">
                    <img style="max-height: 20px; max-width: 20px;" src="cid:union_image" alt="Union">
                </a>
            </div>

            <p class="rightsCont" style="text-align: center; box-sizing: border-box; font-size: 14px; color: #3D3D3D; font-weight: 400;">© 2024 GreenShop. All Rights Reserved.</p>
        </div>`,
        attachments: [
            {
                filename: 'Logo.png',
                path: './images/Logo.png',
                cid: 'logo_image', // The Content-ID, referenced in the HTML
                contentDisposition: 'inline' // This ensures it's treated as inline, not an attachment
            },
            {
                filename: 'emailImg.png',
                path: './images/emailImg.png',
                cid: 'email_image',
                contentDisposition: 'inline', // This ensures it's treated as inline
            },
            {
                filename: 'Facebook.png',
                path: './images/Facebook.png',
                cid: 'facebook_image',
                contentDisposition: 'inline', // Ensure all images are inline
            },
            {
                filename: 'Instagram.png',
                path: './images/Instagram.png',
                cid: 'instagram_image',
                contentDisposition: 'inline',
            },
            {
                filename: 'Linkedin.png',
                path: './images/Linkedin.png',
                cid: 'linkedin_image',
                contentDisposition: 'inline',
            },
            {
                filename: 'Twitter.png',
                path: './images/Twitter.png',
                cid: 'twitter_image',
                contentDisposition: 'inline',
            },
            {
                filename: 'Union.png',
                path: './images/Union.png',
                cid: 'union_image',
                contentDisposition: 'inline',
            },
        ]

    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`email has been sent to ${to}`);
    } catch (error) {
        console.log(error);
    }
};

export default sendVerificationEmail;
