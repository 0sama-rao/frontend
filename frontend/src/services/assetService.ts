import apiClient from '../utils/client';

// Fetch all assets
export const getAllAssets = async () => {
  const response = await apiClient.get('/assets');
  return response.data;
};

// Add a new asset
export const addAsset = async (asset: { name: string; value: number; currency: string }) => {
  const response = await apiClient.post('/assets', asset);
  return response.data;
};

// Update an asset
export const updateAsset = async (id: number, asset: { name: string; value: number; currency: string }) => {
  const response = await apiClient.patch(`/assets/${id}`, asset);
  return response.data;
};

// Delete an asset
export const deleteAsset = async (id: number) => {
  await apiClient.delete(`/assets/${id}`);
};
