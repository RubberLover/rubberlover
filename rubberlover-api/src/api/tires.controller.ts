import express, { Request, Response } from 'express';
import { adminAuth, authorAuth, userAuth } from '../middlewares';
import TireModel from '../mongo/models/tire.model';
import WAMModel from '../mongo/models/wam.model';


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const allTires = await TireModel.find();
    res.send(allTires);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const tire = await TireModel.findById(req.params.id);
      if (tire) {
        res.send(tire);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/submit', userAuth, async (req: Request, res: Response) => {
  const tire = new TireModel(req.body);
  tire.createdBy = res.locals.id;
  try {
    await tire.save();
    res.send(tire);
  } catch (error: any) {
    if (error.code == 11000) {
      res.status(400).send('Tire already exists!');
    } else res.status(500).send(error);
  }
});

router.put('/', authorAuth, async (req: Request, res: Response) => {
  TireModel.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true },
    function (err, tire) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(tire);
      }
    });
});

router.put('/approve', adminAuth, async (req: Request, res: Response) => {
  TireModel.findByIdAndUpdate({ _id: req.body._id }, { approved: true, approvedBy: res.locals.name }, { new: true },
    function (err, tire) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(tire);
      }
    });
});

router.delete('/:id', adminAuth, async (req: Request, res: Response) => {
  try {
    const tire = await TireModel.findById(req.params.id);
    if (tire) {
      await TireModel.deleteOne({ _id: req.params.id });
      await WAMModel.deleteMany({ tireId: req.params.id });
      res.sendStatus(200);
    }
  } catch (error: any) {
    res.status(500).send(error);
  }
});

export default router;
