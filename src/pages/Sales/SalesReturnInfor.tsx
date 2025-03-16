import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save, Edit, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';


interface SalesReturn {
  id: string;
  salesDate: string;
  salesInvoice: string;
  product: string;
  returnMRP: number;
  returnQty: number;
  warehouse: string;
  customer: string;
  details: string;
  total: number;
  rRetPerUnit: number; // Based on the column in the image
}

const SalesReturnInformation: React.FC = () => {
  const [formData, setFormData] = useState<Omit<SalesReturn, 'id' | 'total'>>({
    salesDate: new Date().toISOString().split('T')[0],
    salesInvoice: '',
    product: '',
    returnMRP: 0,
    returnQty: 0,
    warehouse: '',
    customer: '',
    details: '',
    rRetPerUnit: 0
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const [salesReturns, setSalesReturns] = useState<SalesReturn[]>([
    { 
      id: '1', 
      salesDate: '2025-03-01', 
      salesInvoice: 'INV-001', 
      product: 'LED Bulb 5W', 
      returnMRP: 250, 
      returnQty: 5, 
      warehouse: 'Main Warehouse', 
      customer: 'ABC Electronics',
      details: 'Defective items',
      total: 1250,
      rRetPerUnit: 250
    },
    { 
      id: '2', 
      salesDate: '2025-03-05', 
      salesInvoice: 'INV-002', 
      product: 'Wall Socket', 
      returnMRP: 180, 
      returnQty: 10, 
      warehouse: 'Nawabpur Branch', 
      customer: 'XYZ Hardware',
      details: 'Wrong items delivered',
      total: 1800,
      rRetPerUnit: 180
    },
    { 
      id: '3', 
      salesDate: '2025-03-10', 
      salesInvoice: 'INV-003', 
      product: 'Extension Cord', 
      returnMRP: 350, 
      returnQty: 3, 
      warehouse: 'Main Warehouse', 
      customer: 'Home Solutions',
      details: 'Customer changed mind',
      total: 1050,
      rRetPerUnit: 350
    }
  ]);

  const products = [
    'LED Bulb 5W',
    'LED Bulb 10W',
    'Wall Socket',
    'Extension Cord',
    'Power Strip',
    'Light Switch',
    'Circuit Breaker',
    'Electric Wire (per meter)'
  ];

  const warehouses = [
    'Main Warehouse',
    'Nawabpur Branch',
    'Dhaka Center',
    'Chittagong Branch'
  ];

  const filteredReturns = salesReturns.filter(item => 
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.salesInvoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.warehouse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems: number = filteredReturns.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredReturns.slice(startIndex, endIndex);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const total = formData.returnMRP * formData.returnQty;
    
    const newReturn: SalesReturn = {
      id: (salesReturns.length + 1).toString(),
      ...formData,
      total
    };
    
    setSalesReturns([...salesReturns, newReturn]);
    resetForm();
  };

  const resetForm = (): void => {
    setFormData({
      salesDate: new Date().toISOString().split('T')[0],
      salesInvoice: '',
      product: '',
      returnMRP: 0,
      returnQty: 0,
      warehouse: '',
      customer: '',
      details: '',
      rRetPerUnit: 0
    });
  };

  const handleCancel = (): void => {
    resetForm();
  };

  const handleEdit = (item: SalesReturn): void => {
    setFormData({
      salesDate: item.salesDate,
      salesInvoice: item.salesInvoice,
      product: item.product,
      returnMRP: item.returnMRP,
      returnQty: item.returnQty,
      warehouse: item.warehouse,
      customer: item.customer,
      details: item.details,
      rRetPerUnit: item.rRetPerUnit
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormData(prev => ({ ...prev, [name]: value }));
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
            <CardTitle className="text-lg font-medium">Sales Return Information</CardTitle>
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
              <label className="w-36 text-right pr-4">Sales Date <span className="text-red-500">*</span></label>
              <Input
                type="date"
                name="salesDate"
                value={formData.salesDate}
                onChange={handleInputChange}
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Customer <span className="text-red-500">*</span></label>
              <Input
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                placeholder="Customer name"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Sales Invoice <span className="text-red-500">*</span></label>
              <Input
                name="salesInvoice"
                value={formData.salesInvoice}
                onChange={handleInputChange}
                placeholder="Invoice number"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Sales Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Details about the return"
                className="flex-1"
                rows={3}
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Product <span className="text-red-500">*</span></label>
              <Select value={formData.product} onValueChange={(value) => handleSelectChange('product', value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product, index) => (
                    <SelectItem key={index} value={product}>{product}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Return MRP <span className="text-red-500">*</span></label>
              <Input
                type="number"
                name="returnMRP"
                value={formData.returnMRP}
                onChange={handleNumberInputChange}
                placeholder="0"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Return Qty <span className="text-red-500">*</span></label>
              <Input
                type="number"
                name="returnQty"
                value={formData.returnQty}
                onChange={handleNumberInputChange}
                placeholder="0"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">RRetPerUnit <span className="text-red-500">*</span></label>
              <Input
                type="number"
                name="rRetPerUnit"
                value={formData.rRetPerUnit}
                onChange={handleNumberInputChange}
                placeholder="0"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Warehouse <span className="text-red-500">*</span></label>
              <Select value={formData.warehouse} onValueChange={(value) => handleSelectChange('warehouse', value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((warehouse, index) => (
                    <SelectItem key={index} value={warehouse}>{warehouse}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1"></div>

            {/* Form buttons */}
            <div className="flex gap-2 mt-4 justify-center col-span-2">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="h-4 w-4 mr-2" /> Add to List
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>

          {/* Search and table */}
          <div className="flex justify-between items-center mt-6 mb-4">
            <div></div>
            <div className="flex items-center">
              <span className="mr-2 text-sm">Search</span>
              <Input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search returns"
                className="max-w-xs h-9"
              />
            </div>
          </div>

          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium">Edit</TableHead>
                  <TableHead className="font-medium">Delete</TableHead>
                  <TableHead className="font-medium">Product</TableHead>
                  <TableHead className="font-medium">Quantity</TableHead>
                  <TableHead className="font-medium">RRetPerUnit</TableHead>
                  <TableHead className="font-medium">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <TableRow key={item.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.returnQty}</TableCell>
                      <TableCell>{item.rRetPerUnit}</TableCell>
                      <TableCell>{item.total}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-64 hover:bg-white">
                    <TableCell colSpan={6} className="text-center text-gray-400">
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
          
          {/* Save buttons at the bottom */}
          <div className="flex justify-center mt-6">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white mr-2">
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
            <Button variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReturnInformation;