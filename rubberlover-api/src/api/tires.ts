import express, { NextFunction, Request, Response } from 'express';
import { adminAuth } from '../middlewares';
import TireModel from '../mongo/models/tire';


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const allTires = await TireModel.find();
    res.send(allTires);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', adminAuth, async (req: Request, res: Response, next: NextFunction) => {
    const tire = new TireModel(req.body);
    try {
      await tire.save();
      res.send(tire);
    } catch (error) {
      res.status(500).send(error);
    }
});

export default router;
