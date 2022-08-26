import express, { Request, Response } from 'express';
import { adminAuth, userAuth } from '../middlewares';
import TireModel from '../mongo/models/tire.model';


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const allTires = await TireModel.find();
    res.send(allTires);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/submit', userAuth, async (req: Request, res: Response) => {
  console.log(req);

    const tire = new TireModel(req.body);
    console.log(tire);
    try {
      await tire.save();
      res.send(tire);
    } catch (error: any) {
      if (error.code == 11000) {
        res.status(400).send("Tire already exists!");
      }
      else res.status(500).send(error);
    }
});

router.put('/approve', adminAuth, async (req: Request, res: Response) => {
  console.log(res.locals.name);
  TireModel.findByIdAndUpdate({ _id: req.body._id}, {approved: true, approvedBy: res.locals.name}, {new: true},
      function (err, tire) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.send(tire);
        }
    });
});



export default router;
