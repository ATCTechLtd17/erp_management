import React, { useState } from 'react';

type PaymentType = 'Cash' | 'Credit Card' | 'Bank Transfer' | 'Other';
type EntityType = 'Customer' | 'Supplier';

interface PaymentReceiptProps {
  initialEntityType?: EntityType;
}

const PaymentReceiptForm: React.FC<PaymentReceiptProps> = ({ initialEntityType = 'Customer' }) => {
  // State for form fields
  const [entityType, setEntityType] = useState<EntityType>(initialEntityType);
  const [paymentType, setPaymentType] = useState<PaymentType>('Cash');
  const [entityName, setEntityName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [previousDue, setPreviousDue] = useState<string>('0');
  const [less, setLess] = useState<string>('0');
  const [payable, setPayable] = useState<string>('0');
  const [paid, setPaid] = useState<string>('0');
  const [due, setDue] = useState<string>('0');
  const [note, setNote] = useState<string>('');

  // Handle entity type change
  const handleEntityTypeChange = (type: EntityType) => {
    setEntityType(type);
    setEntityName('');
  };

  // Handle payment calculation
  const calculateDue = () => {
    const paidAmount = parseFloat(paid) || 0;
    const payableAmount = parseFloat(payable) || 0;
    setDue((payableAmount - paidAmount).toFixed(2));
  };

  // Handle save action
  const handleSave = () => {
    // Here you would implement the save functionality
    console.log({
      entityType,
      entityName,
      paymentType,
      address,
      previousDue,
      less,
      payable,
      paid,
      due,
      note
    });
    alert('Payment saved successfully!');
  };

  return (
    <div className="w-full max-w-4xl border border-gray-200 rounded-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex justify-between">
        <h2 className="text-xl">Payment Received</h2>
        <div>
          <button className="px-2">&square;</button>
          <button className="px-2">&times;</button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 bg-white">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-8">
            <label className="flex items-center">
              <input
                type="radio"
                checked={entityType === 'Customer'}
                onChange={() => handleEntityTypeChange('Customer')}
                className="mr-2"
              />
              Customer
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={entityType === 'Supplier'}
                onChange={() => handleEntityTypeChange('Supplier')}
                className="mr-2"
              />
              Supplier
            </label>
          </div>

          <div className="flex items-center">
            <label className="mr-2">
              Payment Type<span className="text-red-500">*</span>:
            </label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as PaymentType)}
              className="p-2 border border-gray-300 rounded w-48"
            >
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 text-right mt-2">
            {entityType}<span className="text-red-500">*</span>:
          </div>
          <div className="col-span-3">
            {entityType === 'Customer' ? (
              <input
                type="text"
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                placeholder={`Search ${entityType}`}
                className="p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <select
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Supplier</option>
                <option value="Supplier 1">Supplier 1</option>
                <option value="Supplier 2">Supplier 2</option>
              </select>
            )}
          </div>

          <div className="col-span-1 text-right mt-2">Address:</div>
          <div className="col-span-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="col-span-1 text-right mt-2">Previous Due:</div>
          <div className="col-span-3">
            <input
              type="text"
              value={previousDue}
              onChange={(e) => setPreviousDue(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {entityType === 'Customer' && (
            <>
              <div className="col-span-1 text-right mt-2">Less:</div>
              <div className="col-span-3">
                <input
                  type="text"
                  value={less}
                  onChange={(e) => setLess(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </>
          )}

          <div className="col-span-1 text-right mt-2">Payable:</div>
          <div className="col-span-3">
            <input
              type="text"
              value={payable}
              onChange={(e) => setPayable(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="col-span-1 text-right mt-2">
            Paid<span className="text-red-500">*</span>:
          </div>
          <div className="col-span-3">
            <input
              type="text"
              value={paid}
              onChange={(e) => {
                setPaid(e.target.value);
                setTimeout(calculateDue, 100);
              }}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          <div className="col-span-1 text-right mt-2">Due:</div>
          <div className="col-span-3">
            <input
              type="text"
              value={due}
              readOnly
              className="p-2 border border-gray-300 rounded w-full bg-gray-50"
            />
          </div>

          <div className="col-span-1 text-right mt-2">Note:</div>
          <div className="col-span-3">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full h-20 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Footer with action buttons */}
      <div className="p-4 bg-gray-100 flex justify-center gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <span className="mr-2">&#128190;</span> Save
        </button>
        <button className="bg-white border border-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentReceiptForm;