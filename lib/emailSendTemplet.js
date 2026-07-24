export const REGISTRATION_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to GrammarCheckerAI</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 20px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#2563eb;padding:30px;">
              <h1 style="color:#ffffff;margin:0;font-size:30px;">
                🎉 Welcome to GrammarCheckerAI
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;color:#374151;line-height:1.8;">

              <h2 style="margin-top:0;color:#111827;">
                Hi {USERNAME},
              </h2>

              <p>
                Congratulations! Your account has been created successfully.
              </p>

              <p>
                You can now access all the powerful features of
                <strong>GrammarCheckerAI</strong> to improve your writing with
                AI-powered grammar correction, spelling suggestions,
                punctuation fixes, readability improvements, and writing
                enhancements.
              </p>

              <table cellpadding="0" cellspacing="0" style="margin:30px 0;">
                <tr>
                  <td align="center">
                    <a
                      href="https://grammarcheckerai.vercel.app/login"
                      style="
                        background:#2563eb;
                        color:#ffffff;
                        text-decoration:none;
                        padding:14px 30px;
                        border-radius:8px;
                        font-weight:bold;
                        display:inline-block;
                      "
                    >
                      Login to Your Account
                    </a>
                  </td>
                </tr>
              </table>

              <h3 style="color:#111827;">
                What you can do now:
              </h3>

              <ul style="padding-left:20px;">
                <li>✅ Check grammar instantly</li>
                <li>✅ Fix spelling mistakes</li>
                <li>✅ Improve sentence structure</li>
                <li>✅ Enhance writing clarity</li>
                <li>✅ Get AI writing suggestions</li>
                <li>✅ Save your correction history</li>
              </ul>

              <p>
                If you didn't create this account, please contact our support
                team immediately.
              </p>

              <p>
                Thank you for choosing
                <strong>GrammarCheckerAI</strong>.
              </p>

              <p>
                Happy Writing! ✨
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f9fafb;padding:25px;border-top:1px solid #e5e7eb;">

              <p style="margin:0;color:#6b7280;font-size:14px;">
                © 2026 GrammarCheckerAI. All rights reserved.
              </p>

              <p style="margin:10px 0 0;font-size:13px;color:#9ca3af;">
                This email was sent because you successfully created an account
                on GrammarCheckerAI.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

export const LOGIN_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Successful</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 20px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#2563eb;padding:30px;">
              <h1 style="margin:0;color:#ffffff;font-size:30px;">
                🔐 Login Successful
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;color:#374151;line-height:1.8;">

              <h2 style="margin-top:0;color:#111827;">
                Hello {USERNAME},
              </h2>

              <p>
                We noticed a successful login to your
                <strong>GrammarCheckerAI</strong> account.
              </p>

              <table cellpadding="8" cellspacing="0" width="100%" style="margin:25px 0;border:1px solid #e5e7eb;border-radius:8px;">
                <tr>
                  <td><strong>📧 Email:</strong></td>
                  <td>{EMAIL}</td>
                </tr>
                <tr>
                  <td><strong>📅 Date:</strong></td>
                  <td>{DATE}</td>
                </tr>
              </table>

              <p>
                If this login was made by you, no further action is required.
              </p>

              <p style="color:#dc2626;font-weight:bold;">
                If you don't recognize this login, change your password
                immediately and contact our support team.
              </p>

              <table cellpadding="0" cellspacing="0" style="margin-top:30px;">
                <tr>
                  <td>
                    <a
                      href="https://grammarcheckerai.vercel.app/dashboard"
                      style="
                        background:#2563eb;
                        color:#ffffff;
                        text-decoration:none;
                        padding:14px 28px;
                        border-radius:8px;
                        font-weight:bold;
                        display:inline-block;
                      "
                    >
                      Go to Dashboard
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:25px;background:#f9fafb;border-top:1px solid #e5e7eb;">

              <p style="margin:0;color:#6b7280;font-size:14px;">
                © 2026 GrammarCheckerAI. All rights reserved.
              </p>

              <p style="margin-top:10px;font-size:13px;color:#9ca3af;">
                This is an automated security notification. Please do not reply
                to this email.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
export const GOOGLE_SIGNIN_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Google Sign-In Successful</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 20px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#4285F4;padding:30px;">
              <h1 style="margin:0;color:#ffffff;font-size:30px;">
                🎉 Welcome to GrammarCheckerAI
              </h1>
              <p style="margin:10px 0 0;color:#eaf2ff;font-size:16px;">
                Google Sign-In Successful
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;color:#374151;line-height:1.8;">

              <h2 style="margin-top:0;color:#111827;">
                Hello, {USERNAME} 
              </h2>

              <p>
                Your <strong>Google account</strong> has been successfully used
                to sign in to <strong>GrammarCheckerAI</strong>.
              </p>

              <p>
                You can now enjoy all of our AI-powered writing tools,
                including:
              </p>

              <ul style="padding-left:20px;">
                <li>✅ Grammar Correction</li>
                <li>✍️ AI Writing Suggestions</li>
                <li>📖 Readability Improvements</li>
                <li>📝 Spelling & Punctuation Fixes</li>
                <li>📚 Writing History</li>
              </ul>

              <table cellpadding="8" cellspacing="0" width="100%" style="margin:30px 0;border:1px solid #e5e7eb;border-radius:8px;">
                <tr>
                  <td><strong>📧 Email</strong></td>
                  <td>{EMAIL}</td>
                </tr>

                <tr>
                  <td><strong>📅 Date</strong></td>
                  <td>{DATE}</td>
                </tr>
              </table>

              <div style="text-align:center;margin:35px 0;">
                <a
                  href="https://grammarcheckerai.vercel.app/dashboard"
                  style="
                    display:inline-block;
                    background:#4285F4;
                    color:#ffffff;
                    text-decoration:none;
                    padding:14px 32px;
                    border-radius:8px;
                    font-weight:bold;
                  "
                >
                  🚀 Go to Dashboard
                </a>
              </div>

              <p>
                <strong>Didn't sign in with Google?</strong>
              </p>

              <p style="color:#dc2626;">
                If you don't recognize this activity, please secure your account
                immediately by changing your password or contacting our support
                team.
              </p>

              <p>
                Thank you for using <strong>GrammarCheckerAI</strong>. We hope
                you enjoy improving your writing with AI.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f9fafb;padding:25px;border-top:1px solid #e5e7eb;">

              <p style="margin:0;color:#6b7280;font-size:14px;">
                © 2026 GrammarCheckerAI. All rights reserved.
              </p>

              <p style="margin-top:10px;font-size:13px;color:#9ca3af;">
                This is an automated email from GrammarCheckerAI. Please do not
                reply to this message.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;