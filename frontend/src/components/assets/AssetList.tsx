import React from 'react';
import AssetItem from './AssetItem';

interface Asset {
  id: number;
  name: string;
  value: number;
  currency: string;
}

interface AssetListProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: number) => void;
}

const AssetList = ({ assets, onEdit, onDelete }: AssetListProps) => {
  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <AssetItem
          key={asset.id}
          name={asset.name}
          value={asset.value}
          currency={asset.currency}
          onEdit={() => onEdit(asset)}
          onDelete={() => onDelete(asset.id)}
        />
      ))}
    </div>
  );
};

export default AssetList;
