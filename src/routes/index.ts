import { Router } from 'express';

import coinflip from './coinflip';

const router: Router = Router();
router.use('/coinflip', coinflip);

export default router;
