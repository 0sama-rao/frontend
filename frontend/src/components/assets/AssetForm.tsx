import React, { useState, useEffect } from 'react';

interface AssetFormProps {
  onSubmit: (data: { name: string; value: number; currency: string }) => Promise<void>;
  initialData?: { name: string; value: number; currency: string };
}

const AssetForm = ({ onSubmit, initialData }: AssetFormProps) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [currency, setCurrency] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setValue(initialData.value);
      setCurrency(initialData.currency);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      await onSubmit({ name, value: Number(value), currency });
      setMessage(initialData ? 'Record updated successfully!' : 'Record added successfully!');

      if (!initialData) {
        setName('');
        setValue('');
        setCurrency('');
      }

      setTimeout(() => setMessage(null), 2000);
    } catch (backendError) {
      setMessage(backendError || 'An Unexpected Error occured'
      );

      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded-md shadow-md border border-gray-200 max-w-lg mx-auto"
    >
      {message && (
        <div
          className={`p-2 rounded-md mb-4 ${
            message.includes('successfully')
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {message}
        </div>
      )}
      <input
        type="text"
        placeholder="Asset Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="p-2 border rounded-md border-gray-300 w-full"
      />
      <input
        type="number"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value ? Number(e.target.value) : '')}
        required
        className="p-2 border rounded-md border-gray-300 w-full"
      />
      <input
        type="text"
        placeholder="Currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        required
        className="p-2 border rounded-md border-gray-300 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {initialData ? 'Update Asset' : 'Add Asset'}
      </button>
    </form>
  );
};

export default AssetForm;
