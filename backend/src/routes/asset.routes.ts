import { Router } from 'express';
import createAsset from '../controllers/asset/create';
import updateAsset from '../controllers/asset/update';
import getAllAssets from '../controllers/asset/get';
import deleteAsset from '../controllers/asset/delete';

import { validateAsset } from '../middlewares/validate';

const router = Router();

router.get('/assets', getAllAssets);
router.post('/assets', validateAsset, createAsset);
router.patch('/assets/:id', validateAsset,updateAsset);
router.delete('/assets/:id', deleteAsset);

export default router;
