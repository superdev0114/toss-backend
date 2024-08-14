import { Router } from 'express';
import { getHash, playGame, storeGameData } from '../controllers/coinflip';

const router: Router = Router();

router.get('/', getHash);
router.post('/play', playGame);
router.post('/submit', storeGameData);

export default router;
