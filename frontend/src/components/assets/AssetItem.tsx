import React from 'react';

interface AssetItemProps {
  name: string;
  value: number;
  currency: string;
  onEdit: () => void;
  onDelete: () => void;
  assetId?: number;
}

const AssetItem = ({ name, value, currency, onEdit, onDelete, assetId }: AssetItemProps) => {
  const formattedValue = !isNaN(Number(value)) ? Number(value).toFixed(2) : 'Invalid Value';

  return (
    <div className="flex justify-between items-center p-4 border rounded-md shadow-sm bg-gray-50">
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p>{`${formattedValue} ${currency}`}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AssetItem;
