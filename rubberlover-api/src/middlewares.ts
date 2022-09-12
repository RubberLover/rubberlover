import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import jwtSecret from './jwt';

function extractToken(req: Request) : string {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token.toString();
  }
  return '';
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export function userAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (token) {
    jwt.verify(token, jwtSecret, (err: any, decodedToken: any) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' });
      } else {
        if (decodedToken.role == 'user' || decodedToken.role == 'admin') {
          res.locals.name = decodedToken.name;
          res.locals.id = decodedToken.id;
          next();
        } else {
          return res.status(401).json({ message: 'Not authorized' });
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: 'Not authorized, token not available' });
  }
}

export function authorAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (token) {
    jwt.verify(token, jwtSecret, (err: any, decodedToken: any) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' });
      } else {
        if (decodedToken.role == 'user' || decodedToken.role == 'admin') {
          res.locals.name = decodedToken.name;
          res.locals.id = decodedToken.id;
          if ((req.body.createdBy && req.body.createdBy === res.locals.id) || decodedToken.role == 'admin') {
            next();
          } else {
            return res.status(401).json({ message: "Cannot edit tires you didn't create" });
          }
        } else {
          return res.status(401).json({ message: 'Not authorized' });
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: 'Not authorized, token not available' });
  }
}

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (token) {
    jwt.verify(token, jwtSecret, (err: any, decodedToken: any) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' });
      } else {
        if (decodedToken.role !== 'admin') {
          return res.status(401).json({ message: 'Not authorized' });
        } else {
          res.locals.name = decodedToken.name;
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: 'Not authorized, token not available' });
  }
}