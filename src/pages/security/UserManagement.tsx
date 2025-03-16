/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

// Define interfaces for our data types
interface User {
  id: number;
  userName: string;
  email: string;
  mobileNo: string;
  userType: number;
}

interface UserFormData {
  employeeName: string;
  mobile: string;
  userName: string;
  email: string;
  password: string;
  active: boolean;
}

const UserManagement: React.FC = () => {
  // State for users list
  const [users, setUsers] = useState<User[]>([
    { id: 1, userName: 'Deshi Systems Limited', email: 'dsl@gmail.com', mobileNo: '01710527492', userType: 1 },
    { id: 2, userName: 'Nazmul', email: 'nazmulislam217@gmail.com', mobileNo: '01677211978', userType: 1 },
    { id: 3, userName: 'Milton', email: 'milton@gmail.com', mobileNo: '01710957249', userType: 1 },
    { id: 4, userName: 'Md Rabbi Mia', email: 'mdrabbi106@gmail.com', mobileNo: '01313447759', userType: 1 },
    { id: 5, userName: 'Badhon', email: 'mahabubalam0096@gmail.com', mobileNo: '01313447765', userType: 1 },
    { id: 6, userName: 'Md Parvez', email: 'mrtohid35@gmail.com', mobileNo: '01313447764', userType: 1 },
    { id: 7, userName: 'sharif2traders@gmail.com', email: 'sharif2traders@gmail.com', mobileNo: '01711056958', userType: 1 },
    { id: 8, userName: 'alamgirgle@gmail.com', email: 'alamgirgle@gmail.com', mobileNo: '01313447756', userType: 1 },
    { id: 9, userName: 'abidhossain@gmail.com', email: 'abidhossain647@gmail.com', mobileNo: '01627816225', userType: 1 },
    { id: 10, userName: 'Gift Electric-kawran Bazar', email: '', mobileNo: '01721957733', userType: 2 },
  ]);

  // State for form data
  const [formData, setFormData] = useState<UserFormData>({
    employeeName: '',
    mobile: '',
    userName: '',
    email: '',
    password: '',
    active: false
  });

  // State for search term
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const totalPages = Math.ceil(users.length / pageSize);

  // Handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation logic would go here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      employeeName: '',
      mobile: '',
      userName: '',
      email: '',
      password: '',
      active: false
    });
  };

  // Handle edit user
  const handleEdit = (userId: number) => {
    console.log('Edit user with ID:', userId);
    // In a real app, you would populate the form with the user data
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobileNo.includes(searchTerm)
  );

  // Get current page of users
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-4 max-w-6xl mx-auto bg-gray-50">
      {/* User Information Form */}
      <div className="mb-6 bg-white shadow-md rounded-md overflow-hidden">
        <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
          <h2 className="text-lg font-medium">User Information</h2>
          <div className="flex space-x-2">
            <button className="hover:text-gray-200">×</button>
            <button className="hover:text-gray-200">▲</button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <label className="w-36 text-right mr-4 font-medium">Employee Name*</label>
              <select 
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                className="flex-1 border rounded-md p-2"
              >
                <option value="">Select Employee</option>
                <option value="employee1">Employee 1</option>
                <option value="employee2">Employee 2</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label className="w-36 text-right mr-4 font-medium">Email*</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-1 border rounded-md p-2"
                placeholder="abcd@gmail.com"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-36 text-right mr-4 font-medium">Mobile</label>
              <input 
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="flex-1 border rounded-md p-2"
                placeholder="0"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-36 text-right mr-4 font-medium">Password*</label>
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="flex-1 border rounded-md p-2"
                placeholder="******"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-36 text-right mr-4 font-medium">User Name*</label>
              <input 
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="flex-1 border rounded-md p-2"
                placeholder="User Name can not be empty"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-36 text-right mr-4 font-medium">Active?</label>
              <input 
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              <span className="mr-1">💾</span> Save
            </button>
            <button 
              type="button"
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      
      {/* Users Table */}
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <div className="p-4 flex justify-end items-center">
          <label className="mr-2 font-medium">Search</label>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md p-2 w-64"
            placeholder="Search..."
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">Edit</th>
                <th className="p-3 text-left">User Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile No</th>
                <th className="p-3 text-left">User Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <button 
                      onClick={() => handleEdit(user.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      📝
                    </button>
                  </td>
                  <td className="p-3">{user.userName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.mobileNo}</td>
                  <td className="p-3">{user.userType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 flex justify-between items-center border-t">
          <div>Total Items: {users.length}</div>
          <div className="flex items-center">
            <span className="mr-2">Page Size:</span>
            <select 
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border rounded-md p-1 mr-4"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded-md disabled:opacity-50"
              >
                ⟪
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded-md ml-1 disabled:opacity-50"
              >
                ⟨
              </button>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="border rounded-md p-1 mx-1"
              >
                {[...Array(totalPages)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <span className="mx-1">/ {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded-md ml-1 disabled:opacity-50"
              >
                ⟩
              </button>
              <button 
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded-md ml-1 disabled:opacity-50"
              >
                ⟫
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;