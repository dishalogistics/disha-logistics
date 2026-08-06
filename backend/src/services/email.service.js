const nodemailer = require("nodemailer");
const env = require("../config/env");
const logger = require("../config/logger");

let transporter;

if (env.smtpUser && env.smtpPass) {
    transporter = nodemailer.createTransport({
        host: env.smtpHost,
        port: env.smtpPort,
        secure: env.smtpPort === 465,
        auth: {
            user: env.smtpUser,
            pass: env.smtpPass,
        },
    });
} else {
    logger.warn("SMTP credentials not set; email sending disabled.");
}

const sendOTP = async (to, otp, purpose) => {
    if (!transporter) {
        logger.warn("Email not sent because SMTP is not configured.");
        return;
    }

    const subject = `🔐 Your Disha Logistics Verification Code`;

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;
box-shadow:0 5px 18px rgba(0,0,0,.08);">

<!-- Header -->
<tr>
<td align="center"
style="background:#062B67;padding:35px 20px;">

<h1 style="
margin:15px 0 0;
color:#fff;
font-size:28px;
font-weight:bold;
letter-spacing:.5px;">
DISHA LOGISTICS
</h1>

<p style="
margin-top:8px;
color:#d8e4ff;
font-size:15px;">
On Time. Every Time.
</p>

</td>
</tr>

<!-- Body -->

<tr>
<td style="padding:45px;">

<h2 style="
margin-top:0;
color:#062B67;">
Email Verification
</h2>

<p style="
font-size:16px;
color:#555;
line-height:28px;">

Hello,

Use the verification code below to complete your
<b>${purpose}</b> request.

</p>

<div style="
margin:35px auto;
text-align:center;">

<div style="
display:inline-block;
padding:18px 45px;
font-size:34px;
font-weight:bold;
letter-spacing:8px;
background:#FFF4EC;
border:2px dashed #ff6a00;
border-radius:10px;
color:#ff6a00;">

${otp}

</div>

</div>

<p style="
text-align:center;
font-size:15px;
color:#666;">

This OTP is valid for
<b>10 minutes</b>.

</p>

<hr
style="
margin:35px 0;
border:none;
border-top:1px solid #eee;" />

<p style="
font-size:14px;
color:#777;
line-height:24px;">

If you didn't request this code, you can safely ignore this email.
Never share your OTP with anyone.

</p>

</td>
</tr>

<!-- Footer -->

<tr>
<td
style="
background:#f7f9fc;
padding:30px;
text-align:center;
font-size:13px;
color:#777;">

<b style="color:#062B67;">
Disha Logistics
</b>

<br><br>

Reliable Logistics Solutions Across India

<br><br>

© ${new Date().getFullYear()} Disha Logistics.
All Rights Reserved.

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
    try {
        await transporter.sendMail({
            from: env.smtpFrom,
            to,
            subject,
            html,
        });
        logger.info(`OTP email sent to ${to}`);
    } catch (error) {
        logger.error("Email send error:", error);
        throw new Error("Failed to send OTP email");
    }
};

module.exports = { sendOTP };
