import Asset from '../models/asset.model';

class AssetService {
  async getAllAssets() {
    return await Asset.findAll();
  }

  async getAssetById(id: number) {
    return await Asset.findByPk(id); 
  }

  async addAsset(data: { name: string; value: number; currency: string }) {
    return await Asset.create(data);
  }

  async updateAsset(id: number, data: Partial<{ name: string; value: number; currency: string }>) {
    const asset = await Asset.findByPk(id);
    if (!asset) throw new Error('Asset not found');
    return await asset.update(data);
  }

  async deleteAsset(id: number) {
    const asset = await Asset.findByPk(id);
    if (!asset) throw new Error('Asset not found');
    await asset.destroy();
  }
}

export default new AssetService();
