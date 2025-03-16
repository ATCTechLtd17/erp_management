import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface Designation {
  id: string;
  designationName: string;
  department?: string;
  description?: string;
  salary?: string;
  createdDate?: string;
  status?: 'Active' | 'Inactive';
}

const DesignationInformation: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Designation, 'id'>>({
    designationName: '',
    department: '',
    description: '',
    salary: '',
    createdDate: '',
    status: 'Active'
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [designations, setDesignations] = useState<Designation[]>([
    { id: '1', designationName: 'Driver', department: 'Operations', createdDate: '2025-01-10', status: 'Active' },
    { id: '2', designationName: 'Delivery Man', department: 'Logistics', createdDate: '2025-01-15', status: 'Active' },
    { id: '3', designationName: 'Chemist', department: 'R&D', createdDate: '2024-11-20', status: 'Active' },
    { id: '4', designationName: 'Production Worker', department: 'Manufacturing', createdDate: '2024-12-05', status: 'Active' },
    { id: '5', designationName: 'Technician', department: 'Maintenance', createdDate: '2024-10-30', status: 'Active' },
    { id: '6', designationName: 'Marketing & Billing Officer', department: 'Marketing', createdDate: '2025-02-01', status: 'Active' },
    { id: '7', designationName: 'Delivery Supervisor', department: 'Logistics', createdDate: '2025-02-10', status: 'Active' },
    { id: '8', designationName: 'Delivery In Charge', department: 'Logistics', createdDate: '2025-01-25', status: 'Active' },
    { id: '9', designationName: 'Factory Manager', department: 'Manufacturing', createdDate: '2024-09-15', status: 'Active' },
    { id: '10', designationName: 'Director', department: 'Management', createdDate: '2024-08-01', status: 'Active' }
  ]);

  const departments = [
    'Management',
    'Operations',
    'Logistics',
    'R&D',
    'Manufacturing',
    'Marketing',
    'Maintenance',
    'Human Resources',
    'Finance',
    'IT'
  ];

  const filteredDesignations = designations.filter(designation => 
    designation.designationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (designation.department?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const totalItems: number = filteredDesignations.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredDesignations.slice(startIndex, endIndex);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (editMode && currentId) {
      // Update existing designation
      setDesignations(prevDesignations => 
        prevDesignations.map(designation => 
          designation.id === currentId 
            ? { ...designation, ...formData } 
            : designation
        )
      );
      setEditMode(false);
      setCurrentId(null);
    } else {
      // Add new designation
      const newDesignation: Designation = {
        id: (designations.length + 1).toString(),
        ...formData,
        createdDate: new Date().toISOString().split('T')[0]
      };
      
      setDesignations([...designations, newDesignation]);
    }
    
    // Reset form
    setFormData({
      designationName: '',
      department: '',
      description: '',
      salary: '',
      createdDate: '',
      status: 'Active'
    });
  };

  const handleCancel = (): void => {
    setFormData({
      designationName: '',
      department: '',
      description: '',
      salary: '',
      createdDate: '',
      status: 'Active'
    });
    setEditMode(false);
    setCurrentId(null);
  };

  const handleEdit = (designation: Designation): void => {
    setFormData({
      designationName: designation.designationName,
      department: designation.department || '',
      description: designation.description || '',
      salary: designation.salary || '',
      createdDate: designation.createdDate || '',
      status: designation.status || 'Active'
    });
    setEditMode(true);
    setCurrentId(designation.id);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (value: string): void => {
    setFormData(prev => ({ ...prev, department: value }));
  };

  const handleStatusChange = (value: string): void => {
    setFormData(prev => ({ ...prev, status: value as 'Active' | 'Inactive' }));
  };

  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };

  const goToPage = (page: number): void => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Designation Information</CardTitle>
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
            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Designation <span className="text-red-500">*</span></label>
              <Input
                name="designationName"
                value={formData.designationName}
                onChange={handleInputChange}
                placeholder="Enter designation name"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Salary</label>
              <Input
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="Enter salary range"
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Department</label>
              <Select value={formData.department} onValueChange={handleSelectChange}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department, index) => (
                    <SelectItem key={index} value={department}>{department}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Status</label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center col-span-2">
              <label className="w-36 text-right pr-4">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="flex-1 rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                rows={3}
              />
            </div>

            <div className="flex gap-2 mt-4 justify-center col-span-2">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="h-4 w-4 mr-2" /> {editMode ? 'Update' : 'Save'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>

          <div className="flex justify-end items-center mt-6 mb-4">
            <span className="mr-2 text-sm">Search</span>
            <Input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Designation"
              className="max-w-xs h-9"
            />
          </div>

          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium">Edit</TableHead>
                  <TableHead className="font-medium">Designation Name</TableHead>
                  <TableHead className="font-medium">Department</TableHead>
                  <TableHead className="font-medium">Created Date</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((designation, index) => (
                    <TableRow key={designation.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleEdit(designation)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{designation.designationName}</TableCell>
                      <TableCell>{designation.department || ''}</TableCell>
                      <TableCell>{designation.createdDate || ''}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${designation.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {designation.status || 'Active'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-64 hover:bg-white">
                    <TableCell colSpan={5} className="text-center text-gray-400">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

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

export default DesignationInformation;