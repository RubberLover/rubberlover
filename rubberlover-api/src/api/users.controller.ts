import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../mongo/models/user.model';
import jwt from 'jsonwebtoken';
import jwtSecret from '../jwt';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/register', async (req: Request, res: Response) => {
    const user = new UserModel(req.body);
    bcrypt.hash(user.password, 10).then(async (hash: string) => {
          user.password = hash;
          const maxAge = 24 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, name: user.name, emailAddress: user.emailAddress, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          try {
              await user.save();
              res.status(200).json({
                message: "Registration successful",
                emailAddress: user.emailAddress,
                role: user.role,
                token: token
            })
          } catch (error) {
              res.status(500).send(error);
          }
    });
});

router.post('/login', async (req: Request, res: Response) => {
    const { emailAddress, password } = req.body
    // Check if username and password is provided
    if (!emailAddress || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        const user = await UserModel.findOne({ emailAddress: emailAddress })
        if (!user) {
            res.status(400).json({
            message: "Login not successful, user not fou d",
            error: "User not found",
        })
        } else {
            // comparing given password with hashed password
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const maxAge = 24 * 60 * 60;
                    const token = jwt.sign(
                      { id: user._id, name: user.name, emailAddress: user.emailAddress, role: user.role },
                        jwtSecret,
                      {
                        expiresIn: maxAge, // 3hrs in sec
                      }
                    );
                    res.status(200).json({
                        message: "Login successful",
                        emailAddress: user.emailAddress,
                        role: user.role,
                        token: token
                    })
                }
                else res.status(400).json({ message: "Login not succesful" })
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred"
        })
    }
});

export default router;
