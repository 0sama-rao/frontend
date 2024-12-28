import { Request, Response, NextFunction } from 'express';
import assetService from '../../services/asset.service';

const createAsset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newAsset = await assetService.addAsset(req.body);
    res.status(201).json(newAsset);
  } catch (error) {
    next(error);
  }
};

export default createAsset;
    