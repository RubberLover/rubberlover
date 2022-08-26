import express, { Request, Response } from 'express';

import tires from './tires.controller';
import users from './users.controller';

const router = express.Router();

router.use('/tires', tires);
router.use('/users', users);


export default router;
