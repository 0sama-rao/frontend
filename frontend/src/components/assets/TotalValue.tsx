import React from 'react';

const TotalValue = ({ totalValue }: { totalValue: number }) => {
  return (
    <div className="mt-6 font-bold text-lg text-gray-700">
      Total Value: {totalValue.toFixed(2)}
    </div>
  );
};

export default TotalValue;
