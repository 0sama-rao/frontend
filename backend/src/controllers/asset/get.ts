import { Request, Response, NextFunction } from 'express';
import assetService from '../../services/asset.service';

const getAllAssets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assets = await assetService.getAllAssets();
    res.json(assets);
  } catch (error) {
    next(error);
  }
};

export default getAllAssets;
