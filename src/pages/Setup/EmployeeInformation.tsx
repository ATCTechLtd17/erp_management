import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface Employee {
  id: string;
  employeeName: string;
  designation: string;
  address: string;
  contactNo: string;
  salary?: string;
  note?: string;
}

const EmployeeInformation: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    employeeName: '',
    designation: '',
    address: '',
    contactNo: '',
    salary: '',
    note: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', employeeName: 'Deshi Systems Limited', designation: 'Managing Director', address: 'DSL', contactNo: '01710527492', salary: '0', note: 'N/A' },
    { id: '2', employeeName: 'Saiful islam', designation: 'Showroom Maintenance', address: 'B-Baria', contactNo: '01756676799', salary: '0' },
    { id: '3', employeeName: 'Minto Mia', designation: 'Delivery Man', address: 'B-Baria', contactNo: '01966882874', salary: '0' },
    { id: '4', employeeName: 'Showroom Nawabpur', designation: 'Showroom In charge', address: 'Nawabpur, Dhaka', contactNo: '01677211978', salary: '0' },
    { id: '5', employeeName: 'Md Alamgir Kabir', designation: 'Genaral Manager', address: 'Jatrabari,Dhaka', contactNo: '01313447756', salary: '0' },
    { id: '6', employeeName: 'Ekhtear Uddin Milton', designation: 'Showroom In charge', address: 'Gulpibag,Dhaka', contactNo: '01710957249', salary: '0' },
    { id: '7', employeeName: 'M/S SHARIF TRADERS', designation: 'Showroom Maintenance', address: '16/2, Nawabpur, Dhaka', contactNo: '01721957733', salary: '0' },
    { id: '8', employeeName: 'Rabby', designation: 'Billing & collection Officer', address: 'Matuail,Dhaka', contactNo: '01313447759', salary: '0' },
    { id: '9', employeeName: 'Parvez', designation: 'Stock Officer', address: 'Narayangang', contactNo: '01313447764', salary: '0' },
    { id: '10', employeeName: 'Mahabub Alam Badhon', designation: 'Marketing & Billing Officer', address: 'Demra,Dhaka', contactNo: '01313447765', salary: '0' }
  ]);

  const designations = [
    'Managing Director',
    'Genaral Manager',
    'Showroom In charge',
    'Showroom Maintenance',
    'Delivery Man',
    'Billing & collection Officer',
    'Stock Officer',
    'Marketing & Billing Officer'
  ];

  const filteredEmployees = employees.filter(employee => 
    employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.contactNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems: number = filteredEmployees.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredEmployees.slice(startIndex, endIndex);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newEmployee: Employee = {
      id: (employees.length + 1).toString(),
      ...formData
    };
    
    setEmployees([...employees, newEmployee]);
    setFormData({
      employeeName: '',
      designation: '',
      address: '',
      contactNo: '',
      salary: '',
      note: ''
    });
  };

  const handleCancel = (): void => {
    setFormData({
      employeeName: '',
      designation: '',
      address: '',
      contactNo: '',
      salary: '',
      note: ''
    });
  };

  const handleEdit = (employee: Employee): void => {
    setFormData({
      employeeName: employee.employeeName,
      designation: employee.designation,
      address: employee.address,
      contactNo: employee.contactNo,
      salary: employee.salary || '',
      note: employee.note || ''
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (value: string): void => {
    setFormData(prev => ({ ...prev, designation: value }));
  };

  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };

  // Pagination function
  const goToPage = (page: number): void => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Employee Information</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={toggleMaximize} className="h-8 w-8 p-0 hover:bg-blue-400 text-white">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-400 text-white">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
            {/* Form fields */}
            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Employee <span className="text-red-500">*</span></label>
              <Input
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                placeholder="Can not be empty"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Mobile <span className="text-red-500">*</span></label>
              <Input
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                placeholder="Can not be empty"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Designation <span className="text-red-500">*</span></label>
              <Select value={formData.designation} onValueChange={handleSelectChange}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Designation" />
                </SelectTrigger>
                <SelectContent>
                  {designations.map((designation, index) => (
                    <SelectItem key={index} value={designation}>{designation}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Salary</label>
              <Input
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="Can be empty"
                type="number"
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Address <span className="text-red-500">*</span></label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Can not be empty"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Note</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Can be empty"
                className="flex-1 border rounded p-2"
                rows={3}
              />
            </div>

            <div className="flex-1"></div>
            <div className="flex-1"></div>

            {/* Form buttons */}
            <div className="flex gap-2 mt-4 justify-center col-span-2">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>

          {/* Search and table */}
          <div className="flex justify-end items-center mt-6 mb-4">
            <span className="mr-2 text-sm">Search</span>
            <Input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Employee"
              className="max-w-xs h-9"
            />
          </div>

          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium">Edit</TableHead>
                  <TableHead className="font-medium">Employee Name</TableHead>
                  <TableHead className="font-medium">Designation</TableHead>
                  <TableHead className="font-medium">Address</TableHead>
                  <TableHead className="font-medium">ContactNo</TableHead>
                  <TableHead className="font-medium">Salary</TableHead>
                  <TableHead className="font-medium">Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((employee, index) => (
                    <TableRow key={employee.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleEdit(employee)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{employee.employeeName}</TableCell>
                      <TableCell>{employee.designation}</TableCell>
                      <TableCell>{employee.address}</TableCell>
                      <TableCell>{employee.contactNo}</TableCell>
                      <TableCell>{employee.salary || '0'}</TableCell>
                      <TableCell>{employee.note || ''}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-64 hover:bg-white">
                    <TableCell colSpan={7} className="text-center text-gray-400">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between mt-4">
            <div>Total Items: {totalItems}</div>
            <div className="flex items-center gap-2">
              <span>Page Size:</span>
              <Select value={pageSize} onValueChange={(value) => {
                setPageSize(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-16">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <span>«</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <span>‹</span>
              </Button>
              
              <Input
                value={currentPage}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) {
                    goToPage(val);
                  }
                }}
                className="w-10 h-8 text-center"
                min={1}
                max={totalPages}
              />
              <span>of {totalPages}</span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <span>›</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <span>»</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeInformation;