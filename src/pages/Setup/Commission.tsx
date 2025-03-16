import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface Commission {
  id: string;
  customerName: string;
  address: string;
  totalAmount: number;
  commissionPercentage: number;
  category?: string;
  lastDateOfCommission?: string;
}

const CommissionManagement: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Commission, 'id'>>({
    customerName: '',
    address: '',
    totalAmount: 0,
    commissionPercentage: 0,
    category: '',
    lastDateOfCommission: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const [commissions, setCommissions] = useState<Commission[]>([
    { id: '1', customerName: 'M/S Sharif Traders', address: 'Nawabpur, Dhaka', totalAmount: 5000, commissionPercentage: 2.5 },
    { id: '2', customerName: 'A To Z', address: 'Nawabpur, Dhaka', totalAmount: 7500, commissionPercentage: 3 },
    { id: '3', customerName: 'Riad International', address: 'Nawabpur, Dhaka', totalAmount: 12000, commissionPercentage: 2 },
    { id: '4', customerName: 'Sharif Electrical Industrial Co.', address: 'Nawabpur, Dhaka', totalAmount: 8500, commissionPercentage: 2.5 }
  ]);

  const categories = [
    'Retail',
    'Wholesale',
    'Distribution',
    'Manufacturing',
    'Service'
  ];

  const filteredCommissions = commissions.filter(commission => 
    commission.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    commission.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    commission.totalAmount.toString().includes(searchTerm) ||
    commission.commissionPercentage.toString().includes(searchTerm)
  );

  const totalItems: number = filteredCommissions.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredCommissions.slice(startIndex, endIndex);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'totalAmount' || name === 'commissionPercentage' 
        ? parseFloat(value) || 0 
        : value 
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newCommission: Commission = {
      id: (commissions.length + 1).toString(),
      ...formData
    };
    
    setCommissions([...commissions, newCommission]);
    setFormData({
      customerName: '',
      address: '',
      totalAmount: 0,
      commissionPercentage: 0,
      category: '',
      lastDateOfCommission: ''
    });
  };

  const handleCancel = (): void => {
    setFormData({
      customerName: '',
      address: '',
      totalAmount: 0,
      commissionPercentage: 0,
      category: '',
      lastDateOfCommission: ''
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (value: string): void => {
    setFormData(prev => ({ ...prev, category: value }));
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
            <CardTitle className="text-lg font-medium">Commission</CardTitle>
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
              <label className="w-36 text-right pr-4">Category <span className="text-red-500">*</span></label>
              <Select value={formData.category} onValueChange={handleSelectChange}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Last Date of Commission <span className="text-red-500">*</span></label>
              <Input
                name="lastDateOfCommission"
                value={formData.lastDateOfCommission}
                onChange={handleInputChange}
                type="date"
                className="flex-1"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Customer Name <span className="text-red-500">*</span></label>
              <Input
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Enter customer name"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Total Amount <span className="text-red-500">*</span></label>
              <Input
                name="totalAmount"
                value={formData.totalAmount || ''}
                onChange={handleInputChange}
                type="number"
                placeholder="0.00"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Address <span className="text-red-500">*</span></label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Commission % <span className="text-red-500">*</span></label>
              <Input
                name="commissionPercentage"
                value={formData.commissionPercentage || ''}
                onChange={handleInputChange}
                type="number"
                step="0.1"
                placeholder="0.0"
                required
                className="flex-1"
              />
            </div>

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
              placeholder="Search commission"
              className="max-w-xs h-9"
            />
          </div>

          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium">Customer Name</TableHead>
                  <TableHead className="font-medium">Address</TableHead>
                  <TableHead className="font-medium">Total Amount</TableHead>
                  <TableHead className="font-medium">Commission %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((commission, index) => (
                    <TableRow key={commission.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                      <TableCell>{commission.customerName}</TableCell>
                      <TableCell>{commission.address}</TableCell>
                      <TableCell>{commission.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{commission.commissionPercentage.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-64 hover:bg-white">
                    <TableCell colSpan={4} className="text-center text-gray-400">
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

export default CommissionManagement;