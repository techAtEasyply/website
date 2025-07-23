import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";
import { Resend } from "resend";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
configDotenv();
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

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

    const isExisted = await prisma.invite.findFirst({
      where: { email, used: false },
    });
    if (isExisted) {
      res
        .status(409)
        .json({ success: false, message: "Email already invited" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res
        .status(500)
        .json({ success: false, message: "JWT secret key is not configured" });
      return;
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    let verificationLink;
    if (process.env.NODE_ENV === "development") {
      verificationLink = `http://localhost:3000/accept-invite?token=${token}`;
    } else {
      verificationLink = `${process.env.FRONTEND_URL}/accept-invite?token=${token}`;
    }
   const result =  await resend.emails.send({
      from: "Easyply <jamcocobutter@gmail.com>",
      to: email,
      subject: "Early Access | Verify your email",
      html: `
        <h2>Welcome to Easyply!</h2>
        <p>Click below to verify your email and get early access:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });
    console.log("result", result);
    const invite = await prisma.invite.create({
      data: { email, token, used: false },
    });
    res.status(201).json({ success: true, invite });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create invite" });
  }
};

export const verifyInvite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
      res.status(400).json({
        success: false,
        message: "Token is required and must be a string",
      });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res
        .status(500)
        .json({ success: false, message: "JWT secret key is not configured" });
      return;
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
      return;
    }

    const email = decoded.email;
    if (!email) {
      res.status(400).json({ success: false, message: "Invalid token" });
      return;
    }

    const invite = await prisma.invite.findFirst({
      where: { email, token, used: false },
    });
    if (!invite) {
      res
        .status(400)
        .json({ success: false, message: "Invite not found or already used" });
      return;
    }

    await prisma.invite.update({
      where: { id: invite.id },
      data: { used: true },
    });

    res
      .status(200)
      .json({ success: true, message: "Email verified and registered!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to verify invite" });
  }
};

// AGAR DB MEI HAI N USED HAI , MTLB THAT IS A VERIFIED USER
