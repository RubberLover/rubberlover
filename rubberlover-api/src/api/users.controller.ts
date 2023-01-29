import bcrypt from 'bcrypt';
import crypto from 'crypto';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import jwtSecret from '../jwt';
import { adminAuth } from '../middlewares';
import EmailVerificationTokenModel from '../mongo/models/email-verification-token.model';
import PasswordResetTokenModel from '../mongo/models/password-reset-token.model';
import UserModel from '../mongo/models/user.model';
import sendEmail from '../sendEmail';
const router = express.Router();

router.get('/', adminAuth, async (req: Request, res: Response) => {
  try {
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/register', async (req: Request, res: Response) => {
  const user = new UserModel(req.body);
  if (user) {
    bcrypt.hash(user.password, 10).then(async (hash: string) => {
      user.password = hash;
      try {
        await user.save();
        try {
          const token = crypto.randomBytes(16).toString('hex');
          const emailVerification = new EmailVerificationTokenModel({ userId: user._id, token: token });
          await emailVerification.save();
          const link = `${process.env.BASE_URL}/emailVerification?token=${token}`;
          sendEmail(user.emailAddress,
            'Verify your RubberLover account',
            `<p>Thanks for creating an account on RubberLover!</p>
            <p>Click <a href="${link}">this link</a> to verify your email and login.</p>`);
        } catch (error: any) {
          res.status(500).send('Error generating email verification');
        }
        res.status(200).json({
          message: 'Registration successful. Please click the link in your email verification. ',
        });
      } catch (error: any) {
        if (error.code == 11000) {
          if (error.keyPattern.name) {
            res.status(400).send('That username is already taken! ');
            return;
          }
          if (error.keyPattern.emailAddress) {
            res.status(400).send('That email address already has an account.');
            return;
          }
        } else {
          res.status(500).send(error);
        }
      }
    });
  } else {
    console.log('dups');
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { emailAddress, password } = req.body;
  // Check if username and password is provided
  if (!emailAddress || !password) {
    return res.status(400).json({
      message: 'Username or Password not present',
    });
  }
  try {
    const user = await UserModel.findOne({ emailAddress: emailAddress });
    if (!user) {
      res.status(400).json({
        message: 'Login not successful',
        error: 'Invalid username/password combo',
      });
    } else {
      if (user.active == false) {
        res.status(400).json({ 
          message: 'Login not successful',
          error: 'Email not verified',
        });
        return;
      }
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 60 * 24 * 7;
          const token = jwt.sign(
            { id: user._id, name: user.name, emailAddress: user.emailAddress, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 7 days in sec
            },
          );
          res.status(200).json({
            message: 'Login successful',
            emailAddress: user.emailAddress,
            name: user.name,
            role: user.role,
            id: user._id,
            token: token,
          });
        } else res.status(400).json({ message: 'Login not succesful' });
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'An error occurred',
    });
  }
});

router.post('/resetpassword', async (req: Request, res: Response) => { 
  const { userId, token, password } = req.body;

  let passwordResetToken = await PasswordResetTokenModel.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error('Invalid or expired password reset token');
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error('Invalid or expired password reset token');
  }
  const hash = await bcrypt.hash(password, 10);
  await UserModel.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true },
  );
  await passwordResetToken.deleteOne();
  res.status(200).json({ message: 'ok' });
});

router.post('/forgotpassword', async (req: Request, res: Response) => { 
  const { emailAddress } = req.body;
  const user = await UserModel.findOne({ emailAddress: emailAddress });
  if (!user) throw new Error('Email does not exist');

  let token = await PasswordResetTokenModel.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString('hex');
  const hash = await bcrypt.hash(resetToken, 10);

  await new PasswordResetTokenModel({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  // const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
  const link = `${process.env.BASE_URL}/passwordReset?token=${resetToken}&id=${user._id}`;
  sendEmail(
    user.emailAddress,
    'Password Reset Request',
    `<p>A password reset request was made for your account on rubberlover.xyz.</p>
    <p>If that wasn't you, you can safely ignore this email.</p>
    <p>Otherwise, you can click <a href="${link}">this link</a> to reset your password.</p>`);
  res.status(200).json({ message: 'success' });
});

router.post('/emailverification', async (req: Request, res: Response) => { 
  const token = req.query.token;

  let foundToken = await EmailVerificationTokenModel.findOne({ token: token });
  if (foundToken == null) {
    res.status(400).json({ message: 'Invalid verification token' });
    return;
  }
  let user = await UserModel.findOne({ _id: foundToken?.userId });
  if (user == null) {
    res.status(400).json({ message: 'User not found' });
    return;
  } 
  try {
    user.active = true;
    await user.save();
    await foundToken?.deleteOne();
    res.status(200).json({ message: 'success' });
  } catch (error: any) {
    res.status(500).json({ message: 'Unable to verify user' });
  }
});

export default router;
