import { Router } from 'express';
import routes from './api';

const appPrefix = '/api/';
const router = Router();

router.use(appPrefix, routes);

export default router;
