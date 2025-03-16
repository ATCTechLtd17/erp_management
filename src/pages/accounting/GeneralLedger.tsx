import React, { useState } from 'react';

type PaymentType = 'Cash' | 'Credit Card' | 'Bank Transfer' | 'Check' | 'Other';
type LedgerType = 'Debit' | 'Credit';
type AccountType = string;
type AccountGroup = string;
type AccountHead = string;

interface GeneralLedgerProps {
  initialLedgerType?: LedgerType;
}

const GeneralLedgerForm: React.FC<GeneralLedgerProps> = ({ initialLedgerType = 'Debit' }) => {
  // State for form fields
  const [ledgerType, setLedgerType] = useState<LedgerType>(initialLedgerType);
  const [paymentType, setPaymentType] = useState<PaymentType>('Cash');
  const [accountType, setAccountType] = useState<AccountType>('');
  const [accountGroup, setAccountGroup] = useState<AccountGroup>('');
  const [accountHead, setAccountHead] = useState<AccountHead>('');
  const [amount, setAmount] = useState<string>('0');
  const [note, setNote] = useState<string>('');

  // Handle save action
  const handleSave = () => {
    // Here you would implement the save functionality
    console.log({
      ledgerType,
      paymentType,
      accountType,
      accountGroup,
      accountHead,
      amount,
      note
    });
    alert('General Ledger entry saved successfully!');
  };

  return (
    <div className="w-full max-w-4xl border border-gray-200 rounded-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex justify-between">
        <h2 className="text-xl">General Ledger</h2>
        <div>
          <button className="px-2">&times;</button>
          <button className="px-2">&uarr;</button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 bg-white">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-8 ml-28">
            <label className="flex items-center">
              <input
                type="radio"
                checked={ledgerType === 'Debit'}
                onChange={() => setLedgerType('Debit')}
                className="mr-2"
              />
              Debit
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={ledgerType === 'Credit'}
                onChange={() => setLedgerType('Credit')}
                className="mr-2"
              />
              Credit
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
              <option value="Check">Check</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 text-right mt-2">
            Account Type<span className="text-red-500">*</span>:
          </div>
          <div className="col-span-3">
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Account Type</option>
              <option value="Assets">Assets</option>
              <option value="Liabilities">Liabilities</option>
              <option value="Equity">Equity</option>
              <option value="Revenue">Revenue</option>
              <option value="Expenses">Expenses</option>
            </select>
          </div>

          <div className="col-span-1 text-right mt-2">
            Account Group<span className="text-red-500">*</span>:
          </div>
          <div className="col-span-3">
            <select
              value={accountGroup}
              onChange={(e) => setAccountGroup(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Account Group</option>
              {/* Dynamically populate based on Account Type selection */}
              {accountType === 'Assets' && (
                <>
                  <option value="Current Assets">Current Assets</option>
                  <option value="Fixed Assets">Fixed Assets</option>
                </>
              )}
              {accountType === 'Liabilities' && (
                <>
                  <option value="Current Liabilities">Current Liabilities</option>
                  <option value="Long-term Liabilities">Long-term Liabilities</option>
                </>
              )}
              {/* Other options would be populated based on selection */}
            </select>
          </div>

          <div className="col-span-1 text-right mt-2">
            Account Head<span className="text-red-500">*</span>:
          </div>
          <div className="col-span-3">
            <select
              value={accountHead}
              onChange={(e) => setAccountHead(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Account Head</option>
              {/* Dynamically populate based on Account Group selection */}
              {accountGroup === 'Current Assets' && (
                <>
                  <option value="Cash">Cash</option>
                  <option value="Accounts Receivable">Accounts Receivable</option>
                  <option value="Inventory">Inventory</option>
                </>
              )}
              {accountGroup === 'Fixed Assets' && (
                <>
                  <option value="Equipment">Equipment</option>
                  <option value="Buildings">Buildings</option>
                  <option value="Vehicles">Vehicles</option>
                </>
              )}
              {/* Other options would be populated based on selection */}
            </select>
          </div>

          <div className="col-span-1 text-right mt-2">
            Amount<span className="text-red-500">*</span>:
          </div>
          <div className="col-span-3">
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                ⇅
              </div>
            </div>
          </div>

          <div className="col-span-1 text-right mt-2">Note:</div>
          <div className="col-span-3">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write Description"
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
          <span className="mr-2">💾</span> Save
        </button>
        <button className="bg-white border border-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GeneralLedgerForm;