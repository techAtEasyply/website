import { PrismaClient } from "@prisma/client";
// import { error } from "console";
import { configDotenv } from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const nodemailer = require("nodemailer");
configDotenv();

const prisma = new PrismaClient();

export const createInvite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({ success: false, message: "Email is required" });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: "Invalid email format" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res
        .status(500)
        .json({ success: false, message: "JWT secret key is not configured" });
      return;
    }

    try {
      // Generate token
      const token = jwt.sign(
        { email, timestamp: Date.now() },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;

      // Create invite in database first
      const invite = await prisma.invite.create({
        data: { email, token, used: false },
      });

      // Configure nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email content
      const mailOptions = {
        from: `"Easyply" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Welcome to Easyply - Verify Your Email`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Welcome to Easyply!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Verify your email to get started</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px; text-align: center;">
              <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Thank you for joining our waitlist! Click the button below to verify your email address.
              </p>
              
              <!-- Verify Button -->
              <a href="${verificationLink}" 
                 style="background: linear-gradient(135deg, #667eea, #764ba2); 
                    color: white; 
                    padding: 14px 28px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    display: inline-block; 
                    font-weight: 600; 
                    font-size: 16px;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                Verify Email Address
              </a>

              <!-- Expiry Notice -->
              <p style="color: #999; font-size: 14px; margin: 30px 0 0;">
                This link expires in 24 hours
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
          </div>
        `,
      };

      // Send email
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}`);
      } catch (emailError: any) {
        console.error("Email sending failed:", emailError);
        // Even if email fails, we still return success since user is in DB
        res.status(201).json({
          success: true,
          message:
            "Successfully added to waitlist! (Email notification may have failed)",
          invite: { id: invite.id, email: invite.email },
        });
        return;
      }

      res.status(201).json({
        success: true,
        message:
          "Successfully added to waitlist! Check your email for verification.",
        invite: { id: invite.id, email: invite.email },
      });
    } catch (prismaError: any) {
      // Handle unique constraint violation
      if (prismaError.code === "P2002") {
        if (prismaError.meta?.target?.includes("email")) {
          res
            .status(409)
            .json({ success: false, message: "Email already on waitlist" });
          return;
        }
        if (prismaError.meta?.target?.includes("token")) {
          res.status(500).json({
            success: false,
            message: "Token collision, please try again",
          });
          return;
        }
      }
      console.error("Prisma error:", prismaError);
      throw prismaError;
    }
  } catch (error) {
    console.error("Create invite error:", error);
    res.status(500).json({ error: "Failed to add to waitlist" });
  }
};

export const verifyInvite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query;
  try {
    if (!token || typeof token !== "string") {
      res.status(400).json({ error: "Token is required", type: "failure" });
      return;
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded invite token:", decode);
    if (!decode) {
      res.status(400).json({ error: "Invalid token", type: "failure" });
      return;
    }
    // @ts-expect-error
    const email = decode.email as string;

    const user = await prisma.invite.findUnique({
      where: { email, used: true },
    });

    if (user) {
      res.status(400).json({ error: "user already verified", type: "exists" });
      return;
    }

    const invite = await prisma.invite.update({
      where: { email, used: false },
      data: { used: true },
    });

    res.status(200).json({
      success: true,
      message: "Invite verified successfully",
      invite: { id: invite.id, email: invite.email },
      type: "success",
    });
  } catch (err: any) {
    console.error("Error verifying invite:", err);
    res
      .status(403)
      .json({
        error: "Failed to verify invite",
        message: err.message,
        type: "failure",
      });
    return;
  }
};
