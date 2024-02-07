import {Router} from 'express';
import healthRouter from './health.router';
import studentRouter from './students.router';

const router = Router();

router.use('/health', healthRouter);
router.use('/', studentRouter);

export default router;