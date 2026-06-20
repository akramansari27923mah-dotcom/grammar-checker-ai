export const emailTemplet = ({ username, useremail }) => {
  return `
   <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      
      <div style="background: linear-gradient(135deg, #f59e0b, #fbbf24); padding: 24px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff;">Login Successful</h1>
      </div>

      <div style="padding: 32px;">
        <h2 style="color: #111827;">
          Welcome back, ${username}! 👋
        </h2>

        <p style="color: #4b5563; line-height: 1.7;">
          You have successfully signed in to your account using Google Authentication.
        </p>

        <div style="background: #f9fafb; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0;">
          <p style="margin: 0; color: #374151;">
            <strong>Email:</strong> ${useremail}
          </p>
          <p style="margin: 8px 0 0; color: #374151;">
            <strong>Login Time:</strong> ${new Date().toLocaleString()}
          </p>
        </div>

        <p style="color: #4b5563; line-height: 1.7;">
          If this login was not performed by you, please secure your account immediately.
        </p>

        <div style="text-align: center; margin-top: 32px;">
          <a
            href="https://grammarcheckerai.vercel.app/dashboard"
            style="
              display: inline-block;
              padding: 12px 24px;
              background: #f59e0b;
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
            "
          >
            Go to Dashboard
          </a>
        </div>
      </div>

      <div style="background: #f3f4f6; padding: 16px; text-align: center;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          © 2026 Your Company. All rights reserved.
        </p>
      </div>

    </div>
    </body>
    </html>
  `;
};
