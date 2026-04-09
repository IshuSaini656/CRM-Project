export const otpTemplate = (OTP) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Your OTP Code</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f5f5;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff; padding:20px; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <tr>
        <td align="center" style="padding-bottom:20px;">
          <h2 style="color:#333333; margin:0;">Your OTP Code</h2>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:20px 0; color:#555555; font-size:16px; line-height:1.5;">
          <p>Hello,</p>
          <p>Use the following One-Time Password (OTP) to verify your account:</p>
          <p style="text-align:center; margin:30px 0;">
            <span style="font-size:32px; font-weight:bold; color:#1a73e8; letter-spacing:4px;">${OTP}</span>
          </p>
          <p>This OTP is valid for <strong>1 minutes</strong>. Please do not share it with anyone.</p>
          <p>Thank you,<br/>IS CRM's</p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding-top:20px; font-size:12px; color:#999999;">
          © 2025 IS EduTrack. All rights reserved.
        </td>
      </tr>

    </table>
  </body>
</html>
`
}