export declare const VERIFICATION_EMAIL_TEMPLATE = "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Verify Your Email</title>\n</head>\n<body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">\n  <div style=\"background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;\">\n    <h1 style=\"color: white; margin: 0;\">Verify Your Email</h1>\n  </div>\n  <div style=\"background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);\">\n    <p>Hello,</p>\n    <p>Thank you for signing up! Your verification code is:</p>\n    <div style=\"text-align: center; margin: 30px 0;\">\n      <span style=\"font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;\">{verificationCode}</span>\n    </div>\n    <p>Enter this code on the verification page to complete your registration.</p>\n    <p>This code will expire in 15 minutes for security reasons.</p>\n    <p>If you didn't create an account with us, please ignore this email.</p>\n    <p>Best regards,<br>Your App Team</p>\n  </div>\n  <div style=\"text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;\">\n    <p>This is an automated message, please do not reply to this email.</p>\n  </div>\n</body>\n</html>\n";
export declare const PASSWORD_RESET_SUCCESS_TEMPLATE = "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Password Reset Successful</title>\n</head>\n<body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">\n  <div style=\"background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;\">\n    <h1 style=\"color: white; margin: 0;\">Password Reset Successful</h1>\n  </div>\n  <div style=\"background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);\">\n    <p>Hello,</p>\n    <p>We're writing to confirm that your password has been successfully reset.</p>\n    <div style=\"text-align: center; margin: 30px 0;\">\n      <div style=\"background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;\">\n        \u2713\n      </div>\n    </div>\n    <p>If you did not initiate this password reset, please contact our support team immediately.</p>\n    <p>For security reasons, we recommend that you:</p>\n    <ul>\n      <li>Use a strong, unique password</li>\n      <li>Enable two-factor authentication if available</li>\n      <li>Avoid using the same password across multiple sites</li>\n    </ul>\n    <p>Thank you for helping us keep your account secure.</p>\n    <p>Best regards,<br>Your App Team</p>\n  </div>\n  <div style=\"text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;\">\n    <p>This is an automated message, please do not reply to this email.</p>\n  </div>\n</body>\n</html>\n";
export declare const PASSWORD_RESET_REQUEST_TEMPLATE = "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Reset Your Password</title>\n</head>\n<body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">\n  <div style=\"background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;\">\n    <h1 style=\"color: white; margin: 0;\">Password Reset</h1>\n  </div>\n  <div style=\"background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);\">\n    <p>Hello,</p>\n    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>\n    <p>To reset your password, click the button below:</p>\n    <div style=\"text-align: center; margin: 30px 0;\">\n      <a href=\"{resetURL}\" style=\"background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;\">Reset Password</a>\n    </div>\n    <p>This link will expire in 1 hour for security reasons.</p>\n    <p>Best regards,<br>Your App Team</p>\n  </div>\n  <div style=\"text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;\">\n    <p>This is an automated message, please do not reply to this email.</p>\n  </div>\n</body>\n</html>\n";
