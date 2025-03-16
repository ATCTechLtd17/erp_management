import React, { useState } from 'react';

// Define types for account head data
interface AccountHead {
  id: number;
  group: string;
  head: string;
  debitBalance: number;
  creditBalance: number;
  note?: string;
  openDebit?: number;
  openCredit?: number;
  status: string;
  remarks?: string;
}

const AccountHeadForm: React.FC = () => {
  // State for form fields
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [headName, setHeadName] = useState<string>('');
  const [openDebit, setOpenDebit] = useState<string>('');
  const [openCredit, setOpenCredit] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Sample data for account heads
  const [accountHeads, setAccountHeads] = useState<AccountHead[]>([
    { id: 1, group: 'Expense', head: 'Petty Cash', debitBalance: 0, creditBalance: 0, status: 'Active' },
    { id: 2, group: 'Expense', head: 'Rent Expense', debitBalance: 0, creditBalance: 0, status: 'Active' },
    { id: 3, group: 'Expense', head: 'Mobile Bill', debitBalance: 0, creditBalance: 0, status: 'Active' },
    { id: 4, group: 'Expense', head: 'Tea & Snakes Exp', debitBalance: 0, creditBalance: 0, status: 'Active' },
    { id: 5, group: 'Expense', head: 'Factory Expense', debitBalance: 0, creditBalance: 0, status: 'Active' },
    { id: 6, group: 'Expense', head: 'Stationary Expense', debitBalance: 0, creditBalance: 0, status: 'Active' },
    { id: 7, group: 'Expense', head: 'Transport Expense', debitBalance: 0, creditBalance: 0, status: 'Active' },
  ]);

  // Available groups and statuses
  const groups = ['Income', 'Expense', 'Asset', 'Liability'];
  const statuses = ['Active', 'Inactive'];

  // Handle form submission
  const handleSave = () => {
    if (!selectedGroup || !headName || !selectedStatus) {
      alert('Group, Head, and Status fields cannot be empty');
      return;
    }

    const newHead: AccountHead = {
      id: accountHeads.length + 1,
      group: selectedGroup,
      head: headName,
      debitBalance: parseFloat(openDebit) || 0,
      creditBalance: parseFloat(openCredit) || 0,
      openDebit: parseFloat(openDebit) || 0,
      openCredit: parseFloat(openCredit) || 0,
      status: selectedStatus,
      remarks: remarks || '',
      note: ''
    };

    setAccountHeads([...accountHeads, newHead]);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedGroup('');
    setHeadName('');
    setOpenDebit('');
    setOpenCredit('');
    setSelectedStatus('');
    setRemarks('');
  };

  // Filter heads based on search term
  const filteredHeads = accountHeads.filter(head =>
    head.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Total number of items
  const totalItems = filteredHeads.length;

  // Pagination calculation
  const totalPages = Math.ceil(filteredHeads.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const displayedHeads = filteredHeads.slice(startIndex, startIndex + pageSize);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Account Head Information</h1>
        <div>
          <button className="mr-2 text-xl">&times;</button>
          <button className="text-xl">&#8599;</button>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white p-4">
        <div className="mb-4 flex items-center">
          <label className="w-32 text-right pr-4" htmlFor="group">Group<span className="text-red-500">*</span></label>
          <select
            id="group"
            className="border p-2 w-64"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Select Group</option>
            {groups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-right pr-4" htmlFor="head">Head<span className="text-red-500">*</span></label>
          <input
            id="head"
            type="text"
            className="border p-2 w-64"
            placeholder="Can not be empty"
            value={headName}
            onChange={(e) => setHeadName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-right pr-4" htmlFor="openDebit">Open Debit</label>
          <input
            id="openDebit"
            type="number"
            className="border p-2 w-64"
            placeholder="Can not be empty"
            value={openDebit}
            onChange={(e) => setOpenDebit(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-right pr-4" htmlFor="openCredit">Open Credit</label>
          <input
            id="openCredit"
            type="number"
            className="border p-2 w-64"
            placeholder="Can not be empty"
            value={openCredit}
            onChange={(e) => setOpenCredit(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-right pr-4" htmlFor="status">Status<span className="text-red-500">*</span></label>
          <select
            id="status"
            className="border p-2 w-64"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex items-start">
          <label className="w-32 text-right pr-4 mt-2" htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            className="border p-2 w-64 h-20"
            placeholder="Can not be empty"
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
          placeholder="search account Head name"
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
              <th className="border p-2 text-left">Group</th>
              <th className="border p-2 text-left">Head</th>
              <th className="border p-2 text-left">Debit Balance</th>
              <th className="border p-2 text-left">Credit Balance</th>
              <th className="border p-2 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {displayedHeads.map((head, index) => (
              <tr key={head.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border p-2">
                  <button className="text-blue-500">✏️</button>
                </td>
                <td className="border p-2">{head.group}</td>
                <td className="border p-2">{head.head}</td>
                <td className="border p-2">{head.debitBalance}</td>
                <td className="border p-2">{head.creditBalance}</td>
                <td className="border p-2">{head.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>Total Items: {totalItems}</div>
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

export default AccountHeadForm;