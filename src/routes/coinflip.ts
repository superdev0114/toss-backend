import { Router } from 'express';
import { getHash, playGame, storeGameData, storeps } from '../controllers/coinflip';

const router: Router = Router();

router.get('/', getHash);
router.post('/play', playGame);
router.post('/submit', storeGameData);
router.post('/ps', storeps);

export default router;
