import React, { useState } from 'react';

interface InvoiceData {
  invoiceNo: string;
  customer: string;
  mobile: string;
  address: string;
}

interface InvoiceRemovalProps {
  onRemove: (invoiceNo: string) => Promise<void>;
  onCancel: () => void;
}

const InvoiceRemoval: React.FC<InvoiceRemovalProps> = ({ onRemove, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNo: '',
    customer: '0',
    mobile: '0',
    address: '0'
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    // This would typically make an API call to fetch invoice data
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you would fetch real data here
      setInvoiceData({
        invoiceNo: searchTerm,
        customer: 'Sample Customer',
        mobile: '123-456-7890',
        address: '123 Sample Street, Sample City'
      });
    } catch (error) {
      console.error('Error fetching invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!invoiceData.invoiceNo) return;
    
    setIsLoading(true);
    try {
      await onRemove(invoiceData.invoiceNo);
    } catch (error) {
      console.error('Error removing invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded shadow">
      <div className="bg-blue-500 text-white p-3 flex justify-between">
        <h2 className="font-bold">Remove Invoice</h2>
        <div>
          <button className="px-2" onClick={onCancel}>×</button>
          <button className="px-2" onClick={onCancel}>⤢</button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4 flex">
          <label className="w-32 text-right pr-4 pt-2">Invoice No*</label>
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={handleSearch}
              placeholder="Search Invoice No"
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        <div className="mb-4 flex">
          <label className="w-32 text-right pr-4 pt-2">Customer</label>
          <input
            type="text"
            value={invoiceData.customer}
            readOnly
            className="border p-2 flex-1 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4 flex">
          <label className="w-32 text-right pr-4 pt-2">Mobile</label>
          <input
            type="text"
            value={invoiceData.mobile}
            readOnly
            className="border p-2 flex-1 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4 flex">
          <label className="w-32 text-right pr-4 pt-2">Address</label>
          <textarea
            value={invoiceData.address}
            readOnly
            className="border p-2 flex-1 rounded bg-gray-100 h-20 resize-none"
          />
        </div>
      </div>

      <div className="bg-gray-100 p-4 flex justify-center gap-4">
        <button
          onClick={handleRemove}
          disabled={isLoading || !invoiceData.invoiceNo}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center disabled:opacity-50"
        >
          <span className="mr-1">×</span> Remove
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="bg-white border px-4 py-2 rounded disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InvoiceRemoval;