import express from 'express';

import tires from './tires.controller';
import users from './users.controller';
import wam from './wam.controller';

const router = express.Router();

router.use('/tires', tires);
router.use('/users', users);
router.use('/wam', wam);

export default router;
