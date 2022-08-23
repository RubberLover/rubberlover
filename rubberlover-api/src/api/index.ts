import express, { Request, Response } from 'express';

import tires from './tires';
import users from './users';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/tires', tires);
router.use('/users', users);


export default router;
