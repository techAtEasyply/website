import { PrismaClient } from "@prisma/client";
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
    const { email } = req.body;
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
      const verificationLink = `http://localhost:3000/api/invite/verify?token=${token}`;

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
        subject: `Waitlist Registration - Verify Your Email`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to Easyply Waitlist!</h2>
            <p>Hi there,</p>
            <p>Thank you for joining our waitlist. Please verify your email to secure your spot for early access.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" 
                 style="background: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #666;">${verificationLink}</p>
            
            <p><strong>This link expires in 24 hours.</strong></p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              If you didn't request this, please ignore this email.
            </p>
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
  try {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
      res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: red;">❌ Invalid Verification Link</h1>
            <p>The verification link is invalid or malformed.</p>
          </body>
        </html>
      `);
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: red;">❌ Server Error</h1>
            <p>Server configuration error. Please try again later.</p>
          </body>
        </html>
      `);
      return;
    }

    // Verify JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        res.status(400).send(`
          <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
              <h1 style="color: orange;">⏰ Link Expired</h1>
              <p>Your verification link has expired. Please request a new one.</p>
            </body>
          </html>
        `);
        return;
      }
      res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: red;">❌ Invalid Link</h1>
            <p>The verification link is invalid.</p>
          </body>
        </html>
      `);
      return;
    }

    const email = decoded.email;
    if (!email) {
      res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: red;">❌ Invalid Link</h1>
            <p>The verification link is invalid.</p>
          </body>
        </html>
      `);
      return;
    }

    // Find the invite
    const invite = await prisma.invite.findFirst({
      where: { email, token, used: false },
    });

    if (!invite) {
      res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: orange;">⚠️ Already Verified</h1>
            <p>This email has already been verified or the link is invalid.</p>
          </body>
        </html>
      `);
      return;
    }

    // Mark as verified
    await prisma.invite.update({
      where: { id: invite.id },
      data: { used: true },
    });

    res.status(200).send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: green;">🎉 Success!</h1>
          <h2>Email Verified Successfully</h2>
          <p><strong>${email}</strong> is now on our early access waitlist!</p>
          <p>We'll notify you when early access becomes available.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Verify invite error:", error);
    res.status(500).send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: red;">❌ Verification Failed</h1>
          <p>An error occurred during verification. Please try again.</p>
        </body>
      </html>
    `);
  }
};

// export const getWaitlist = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const waitlist = await prisma.invite.findMany({
//       select: { id: true, email: true, used: true, createdAt: true },
//       orderBy: { createdAt: "desc" },
//     });

//     res.status(200).json({ success: true, waitlist });
//   } catch (error) {
//     console.error("Get waitlist error:", error);
//     res.status(500).json({ error: "Failed to fetch waitlist" });
//   }
// };
