import { Request, Response, NextFunction } from 'express';
import assetService from '../../services/asset.service';

const deleteAsset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await assetService.deleteAsset(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default deleteAsset;
