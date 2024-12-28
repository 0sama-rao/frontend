import { Request, Response, NextFunction } from 'express';
import assetService from '../../services/asset.service';

const updateAsset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedAsset = await assetService.updateAsset(Number(req.params.id), req.body);
    res.json(updatedAsset);
  } catch (error) {
    next(error);
  }
};

export default updateAsset;
