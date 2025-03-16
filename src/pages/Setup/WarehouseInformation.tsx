import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Maximize2, Save, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

// Define types for warehouse data
interface Warehouse {
  id: string;
  name: string;
  address: string;
  mobile: string;
  email: string;
}

const WarehouseInformation: React.FC = () => {
  // Form state management
  const [formData, setFormData] = useState<Omit<Warehouse, 'id'>>({
    name: '',
    address: '',
    mobile: '',
    email: ''
  });
  
  // Table state management
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  
  // Sample data - replace with actual data in your implementation
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    { id: '1', name: 'Shilpibai Market', address: 'Nawabpur', mobile: '01313447764', email: '' },
    { id: '2', name: 'Showroom', address: 'Rohoi Amin Electric Market', mobile: '01721957733', email: '' },
    { id: '3', name: 'Rep less', address: 'Nawabpur', mobile: '0', email: '' },
    { id: '4', name: 'Barodi', address: 'Narayanganj', mobile: '0', email: '' },
    { id: '5', name: 'Adjusted Warehouse', address: 'Valtual', mobile: '01313447758', email: '' }
  ]);

  // Filtered warehouses based on search term
  const filteredWarehouses = warehouses.filter(warehouse => 
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.mobile.includes(searchTerm)
  );
  
  const totalItems: number = filteredWarehouses.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  
  // Get current page items
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredWarehouses.slice(startIndex, endIndex);
  
  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newWarehouse: Warehouse = {
      id: (warehouses.length + 1).toString(),
      ...formData
    };
    
    setWarehouses([...warehouses, newWarehouse]);
    
    // Reset form after submission
    setFormData({
      name: '',
      address: '',
      mobile: '',
      email: ''
    });
  };
  
  // Handle reset form
  const handleReset = (): void => {
    setFormData({
      name: '',
      address: '',
      mobile: '',
      email: ''
    });
  };
  
  // Handle edit warehouse (in a real app, this would populate the form)
  const handleEdit = (warehouse: Warehouse): void => {
    setFormData({
      name: warehouse.name,
      address: warehouse.address,
      mobile: warehouse.mobile,
      email: warehouse.email
    });
  };
  
  // Handle search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };
  
  // Handle page size change
  const handlePageSizeChange = (value: string): void => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page when changing page size
  };
  
  // Handle pagination
  const goToPage = (page: number): void => {
    const validPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validPage);
  };
  
  // Toggle maximize
  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };
  
  // Handle page input change
  const handlePageInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const page = parseInt(value);
    if (!isNaN(page)) {
      goToPage(page);
    }
  };
  
  // Handle page input blur
  const handlePageInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const page = parseInt(e.target.value);
    if (isNaN(page)) {
      setCurrentPage(currentPage);
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Warehouse Information</CardTitle>
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
          <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 mb-6">
            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Name <span className="text-red-500">*</span></label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="can not be empty"
                required
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Address <span className="text-red-500">*</span></label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="can not be empty"
                required
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Mobile</label>
              <Input
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="0"
                className="flex-1"
              />
            </div>
            
            <div className="col-span-4 flex gap-2 mt-4">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
          
          <div className="flex justify-end items-center mb-4">
            <span className="mr-2 text-sm">Search</span>
            <Input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search name"
              className="max-w-xs h-9"
            />
          </div>
          
          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium">Edit</TableHead>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Address</TableHead>
                  <TableHead className="font-medium">Mobile</TableHead>
                  <TableHead className="font-medium">Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((warehouse) => (
                    <TableRow key={warehouse.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleEdit(warehouse)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{warehouse.name}</TableCell>
                      <TableCell>{warehouse.address}</TableCell>
                      <TableCell>{warehouse.mobile}</TableCell>
                      <TableCell>{warehouse.email}</TableCell>
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
          
          <div className="flex items-center justify-between mt-4 text-sm">
            <div>Total Items: {totalItems}</div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                Page Size:
                <Select value={pageSize} onValueChange={handlePageSizeChange}>
                  <SelectTrigger className="w-20 h-9 ml-2">
                    <SelectValue placeholder={pageSize} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 w-9 p-0"
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 w-9 p-0"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Input
                  type="text"
                  className="w-12 h-9 mx-1 text-center"
                  value={currentPage}
                  onChange={handlePageInputChange}
                  onBlur={handlePageInputBlur}
                />
                
                <span className="mx-1">/ {totalPages}</span>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 w-9 p-0"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 w-9 p-0"
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarehouseInformation;