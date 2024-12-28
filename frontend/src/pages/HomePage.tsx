import React, { useState, useEffect, useCallback } from 'react';
import AssetForm from '../components/assets/AssetForm';
import AssetList from '../components/assets/AssetList';
import TotalValue from '../components/assets/TotalValue';
import Loader from '../components/baseComponents/Loader';
import ErrorBanner from '../components/baseComponents/ErrorBanner';
import { getAllAssets, addAsset, deleteAsset, updateAsset } from '../services/assetService';

const HomePage = () => {
  const [assets, setAssets] = useState([]);
  const [editingAsset, setEditingAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllAssets();

      // Ensuring all asset values are numbers
      const sanitizedAssets = data.map((asset: any) => ({
        ...asset,
        value: Number(asset.value),
      }));

      setAssets(sanitizedAssets);
    } catch (error) {
      setErrorMessage('Failed to fetch assets. Please try again.');
    } 
      setLoading(false);
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const handleAddAsset = async (newAsset: { name: string; value: number; currency: string }) => {
    setLoading(true);
    try {
      const asset = await addAsset(newAsset); 
      setAssets((prev) => [...prev, asset]); 
      setErrorMessage(null); 

      // Clear success message after 2 seconds
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (error: any) {
      if (error?.errors) {
        setLoading(false)
        const backendError = error.errors[0]?.msg;
        throw backendError || 'An unexpected error occurred'; 
      } 
    } 
      setLoading(false);
  };

  const handleEditAsset = async (id: number, updatedAsset: { name: string; value: number; currency: string }) => {
    setLoading(true);
    try {
      const asset = await updateAsset(id, updatedAsset);
      // Update list of assets
      setAssets((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...asset } : item))
      );
      setEditingAsset(null); 
      setErrorMessage(null); 

      // Clear success message after 2 seconds
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (error: any) {
      if (error?.errors) {
        setLoading(false)
        const backendError = error.errors[0]?.msg; 
        throw backendError || 'An unexpected error occurred'; 
      }
    } 
      setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Asset Manager</h1>
      <ErrorBanner message={errorMessage} />
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
          {successMessage}
        </div>
      )}
      {loading && <Loader />}
      <AssetForm
        onSubmit={editingAsset ? (data) => handleEditAsset(editingAsset.id, data) : handleAddAsset}
        initialData={editingAsset}
      />
        <TotalValue
        totalValue={assets.reduce((sum, asset) => sum + Number(asset.value), 0)}
      />
      <AssetList
        assets={assets}
        onEdit={(asset) => setEditingAsset(asset)}
        onDelete={async (id) => {
          setLoading(true);
          try {
            await deleteAsset(id);
            setAssets((prev) => prev.filter((asset) => asset.id !== id));
          } catch {
            setErrorMessage('Failed to delete asset.');
          } 
            setLoading(false);
        }}
      />
  
    </div>
  );
};

export default HomePage;
