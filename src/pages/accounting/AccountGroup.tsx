import React, { useState} from 'react';

// Define types for account group data
type AccountGroupType = 'Income' | 'Expense' | 'Asset' | 'Liability';

interface AccountGroup {
  id: number;
  type: AccountGroupType;
  group: string;
  note?: string;
}

const AccountGroupForm: React.FC = () => {
  // State for form fields
  const [selectedType, setSelectedType] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [accountGroups, setAccountGroups] = useState<AccountGroup[]>([
    { id: 1, type: 'Income', group: 'Income', note: '' },
    { id: 2, type: 'Expense', group: 'Expense', note: '' },
    { id: 3, type: 'Asset', group: 'Fixed Asset', note: '' },
    { id: 4, type: 'Asset', group: 'Current Asset', note: '' },
    { id: 5, type: 'Asset', group: 'Bank Accounts', note: '' },
    { id: 6, type: 'Liability', group: 'Current Liabilities', note: '' },
    { id: 7, type: 'Liability', group: 'Bank OD A/C', note: '' },
  ]);

  // Handle form submission
  const handleSave = () => {
    if (!selectedType || !groupName) {
      alert('Type and Group fields cannot be empty');
      return;
    }

    const newGroup: AccountGroup = {
      id: accountGroups.length + 1,
      type: selectedType as AccountGroupType,
      group: groupName,
      note: remarks || '',
    };

    setAccountGroups([...accountGroups, newGroup]);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedType('');
    setGroupName('');
    setRemarks('');
  };

  // Filter groups based on search term
  const filteredGroups = accountGroups.filter(group =>
    group.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculation
  const totalPages = Math.ceil(filteredGroups.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const displayedGroups = filteredGroups.slice(startIndex, startIndex + pageSize);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Account Group Information</h1>
        <div>
          <button className="mr-2 text-xl">&times;</button>
          <button className="text-xl">&#8599;</button>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-100 p-4">
        <div className="mb-4 flex items-center">
          <label className="w-32 text-right pr-4" htmlFor="type">Type<span className="text-red-500">*</span></label>
          <select
            id="type"
            className="border p-2 w-64"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
            <option value="Asset">Asset</option>
            <option value="Liability">Liability</option>
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-right pr-4" htmlFor="group">Group<span className="text-red-500">*</span></label>
          <input
            id="group"
            type="text"
            className="border p-2 w-64"
            placeholder="Can not be empty"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex items-start">
          <label className="w-32 text-right pr-4 mt-2" htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            className="border p-2 w-64 h-20"
            placeholder="Remarks can not be empty"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Button Section */}
      <div className="bg-gray-200 p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 mr-2"
          onClick={handleSave}
        >
          <span className="mr-1">💾</span> Save
        </button>
        <button
          className="bg-gray-300 px-4 py-2"
          onClick={resetForm}
        >
          Cancel
        </button>
      </div>

      {/* Search Section */}
      <div className="flex justify-end my-4">
        <label className="mr-2 py-2">Search</label>
        <input
          type="text"
          className="border p-2 w-64"
          placeholder="search account group name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-2 text-left">Edit</th>
              <th className="border p-2 text-left">Type</th>
              <th className="border p-2 text-left">Group</th>
              <th className="border p-2 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {displayedGroups.map((group, index) => (
              <tr key={group.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border p-2">
                  <button className="text-blue-500">✏️</button>
                </td>
                <td className="border p-2">{group.type}</td>
                <td className="border p-2">{group.group}</td>
                <td className="border p-2">{group.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>Total Items: {filteredGroups.length}</div>
        <div className="flex items-center">
          <span className="mr-2">Page Size:</span>
          <select
            className="border p-1 mr-4"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          
          <button 
            className="border p-1 mx-1" 
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            ⏮️
          </button>
          <button 
            className="border p-1 mx-1" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀️
          </button>
          
          <span className="mx-2">
            <input 
              type="number" 
              className="border w-12 text-center p-1"
              value={currentPage}
              onChange={(e) => {
                const page = Number(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                }
              }}
            /> / {totalPages}
          </span>
          
          <button 
            className="border p-1 mx-1" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ▶️
          </button>
          <button 
            className="border p-1 mx-1" 
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            ⏭️
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountGroupForm;