import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save, Edit, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';


interface PurchaseReturnItem {
  id: string;
  productName: string;
  quantity: number;
  ratePerUnit: number;
  returnQty: number;
  total: number;
}

interface PurchaseReturn {
  id: string;
  purchaseDate: string;
  purchaseInvoice: string;
  supplier: string;
  purchaseDetails: string;
  items: PurchaseReturnItem[];
  warehouse: string;
}

const PurchaseReturnInformation: React.FC = () => {
  const [formData, setFormData] = useState<Omit<PurchaseReturn, 'id' | 'items'>>({
    purchaseDate: new Date().toISOString().split('T')[0],
    purchaseInvoice: '',
    supplier: '',
    purchaseDetails: '',
    warehouse: ''
  });

  const [returnItem, setReturnItem] = useState<Omit<PurchaseReturnItem, 'id' | 'total'>>({
    productName: '',
    quantity: 0,
    ratePerUnit: 0,
    returnQty: 0
  });

  const [returns, setReturns] = useState<PurchaseReturn[]>([]);
  const [returnItems, setReturnItems] = useState<PurchaseReturnItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  // Sample data for dropdowns
  const suppliers = [
    'Golden Electronics Ltd',
    'Tech Innovations Inc',
    'Global Suppliers Co',
    'Nexus Trading Company',
    'Prime Distributors'
  ];

  const warehouses = [
    'Main Warehouse',
    'East Wing Storage',
    'West Distribution Center',
    'Central Inventory',
    'South Storage Facility'
  ];

  const products = [
    'LED Bulb 10W',
    'Power Adapter 12V',
    'HDMI Cable 6ft',
    'USB-C Charger',
    'Bluetooth Speaker',
    'Wireless Mouse',
    'Keyboard Mechanical',
    'Monitor Stand',
    'Network Switch',
    'External Hard Drive'
  ];

  const purchaseInvoices = [
    'INV-2025-001',
    'INV-2025-002',
    'INV-2025-003',
    'INV-2025-004',
    'INV-2025-005'
  ];

  // Filter returns based on search term
  const filteredReturns = returns.filter(returnItem => 
    returnItem.purchaseInvoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    returnItem.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    returnItem.warehouse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalItems: number = filteredReturns.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredReturns.slice(startIndex, endIndex);

  // Handle input changes for the main form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle input changes for the return item form
  const handleItemInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    // Convert string values to numbers for numeric fields
    if (name === 'quantity' || name === 'ratePerUnit' || name === 'returnQty') {
      setReturnItem(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setReturnItem(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string): void => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductSelectChange = (value: string): void => {
    setReturnItem(prev => ({ ...prev, productName: value }));
  };

  // Add item to the return list
  const handleAddItem = (): void => {
    if (!returnItem.productName || returnItem.returnQty <= 0) {
      alert('Please select a product and enter a valid return quantity');
      return;
    }

    const total = returnItem.returnQty * returnItem.ratePerUnit;
    
    const newItem: PurchaseReturnItem = {
      id: (returnItems.length + 1).toString(),
      productName: returnItem.productName,
      quantity: returnItem.quantity,
      ratePerUnit: returnItem.ratePerUnit,
      returnQty: returnItem.returnQty,
      total: total
    };
    
    setReturnItems([...returnItems, newItem]);
    
    // Reset the item form
    setReturnItem({
      productName: '',
      quantity: 0,
      ratePerUnit: 0,
      returnQty: 0
    });
  };

  // Submit the entire form
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (returnItems.length === 0) {
      alert('Please add at least one item to return');
      return;
    }
    
    const newReturn: PurchaseReturn = {
      id: (returns.length + 1).toString(),
      ...formData,
      items: returnItems
    };
    
    setReturns([...returns, newReturn]);
    
    // Reset the forms
    setFormData({
      purchaseDate: new Date().toISOString().split('T')[0],
      purchaseInvoice: '',
      supplier: '',
      purchaseDetails: '',
      warehouse: ''
    });
    
    setReturnItems([]);
  };

  // Reset the form
  const handleCancel = (): void => {
    setFormData({
      purchaseDate: new Date().toISOString().split('T')[0],
      purchaseInvoice: '',
      supplier: '',
      purchaseDetails: '',
      warehouse: ''
    });
    
    setReturnItems([]);
  };

  // Edit a return (for future implementation)
  const handleEdit = (returnData: PurchaseReturn): void => {
    setFormData({
      purchaseDate: returnData.purchaseDate,
      purchaseInvoice: returnData.purchaseInvoice,
      supplier: returnData.supplier,
      purchaseDetails: returnData.purchaseDetails,
      warehouse: returnData.warehouse
    });
    
    setReturnItems(returnData.items);
  };

  // Handle search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Toggle maximize view
  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };

  // Pagination navigation
  const goToPage = (page: number): void => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  // Remove an item from the return list
  const handleRemoveItem = (id: string): void => {
    setReturnItems(returnItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Purchase Return Information</CardTitle>
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
            {/* Main form fields */}
            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Purchase Date <span className="text-red-500">*</span></label>
              <Input
                name="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Supplier <span className="text-red-500">*</span></label>
              <Select value={formData.supplier} onValueChange={(value) => handleSelectChange('supplier', value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier, index) => (
                    <SelectItem key={index} value={supplier}>{supplier}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Purchase Invoice <span className="text-red-500">*</span></label>
              <Select value={formData.purchaseInvoice} onValueChange={(value) => handleSelectChange('purchaseInvoice', value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Invoice" />
                </SelectTrigger>
                <SelectContent>
                  {purchaseInvoices.map((invoice, index) => (
                    <SelectItem key={index} value={invoice}>{invoice}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

            <div className="flex items-center col-span-2">
              <label className="w-36 text-right pr-4">Purchase Details</label>
              <textarea
                name="purchaseDetails"
                value={formData.purchaseDetails}
                onChange={handleInputChange}
                placeholder="Enter purchase details"
                className="flex-1"
                rows={3}
              />
            </div>

            {/* Product return form */}
            <div className="col-span-2 mt-4 mb-2">
              <h3 className="font-medium text-lg border-b pb-2">Return Items</h3>
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Product <span className="text-red-500">*</span></label>
              <Select value={returnItem.productName} onValueChange={handleProductSelectChange}>
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
              <label className="w-36 text-right pr-4">Return MRP</label>
              <Input
                name="ratePerUnit"
                type="number"
                value={returnItem.ratePerUnit || ''}
                onChange={handleItemInputChange}
                placeholder="0.00"
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Original Qty</label>
              <Input
                name="quantity"
                type="number"
                value={returnItem.quantity || ''}
                onChange={handleItemInputChange}
                placeholder="0"
                className="flex-1"
                disabled
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Return Qty <span className="text-red-500">*</span></label>
              <Input
                name="returnQty"
                type="number"
                value={returnItem.returnQty || ''}
                onChange={handleItemInputChange}
                placeholder="0"
                min="1"
                className="flex-1"
              />
            </div>

            <div className="col-span-2 flex justify-center mt-2 mb-4">
              <Button 
                type="button" 
                onClick={handleAddItem}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Add to List
              </Button>
            </div>

            {/* Items table */}
            <div className="col-span-2 border rounded overflow-hidden mb-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                    <TableHead className="font-medium">Product</TableHead>
                    <TableHead className="font-medium">Quantity</TableHead>
                    <TableHead className="font-medium">Rate Per Unit</TableHead>
                    <TableHead className="font-medium">Return Qty</TableHead>
                    <TableHead className="font-medium">Total</TableHead>
                    <TableHead className="font-medium">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returnItems.length > 0 ? (
                    returnItems.map((item, index) => (
                      <TableRow key={item.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.ratePerUnit.toFixed(2)}</TableCell>
                        <TableCell>{item.returnQty}</TableCell>
                        <TableCell>{item.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="h-6 p-1"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="h-16 hover:bg-white">
                      <TableCell colSpan={6} className="text-center text-gray-400">
                        No items added yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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

          {/* Search and returns table */}
          <div className="mt-6 mb-2">
            <h3 className="font-medium text-lg border-b pb-2">Return History</h3>
          </div>
          
          <div className="flex justify-end items-center mb-4">
            <span className="mr-2 text-sm">Search</span>
            <Input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Returns"
              className="max-w-xs h-9"
            />
          </div>

          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium">Edit</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Invoice</TableHead>
                  <TableHead className="font-medium">Supplier</TableHead>
                  <TableHead className="font-medium">Warehouse</TableHead>
                  <TableHead className="font-medium">Items</TableHead>
                  <TableHead className="font-medium">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((returnData, index) => (
                    <TableRow key={returnData.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleEdit(returnData)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{returnData.purchaseDate}</TableCell>
                      <TableCell>{returnData.purchaseInvoice}</TableCell>
                      <TableCell>{returnData.supplier}</TableCell>
                      <TableCell>{returnData.warehouse}</TableCell>
                      <TableCell>{returnData.items.length}</TableCell>
                      <TableCell>
                        {returnData.items.reduce((total, item) => total + item.total, 0).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-16 hover:bg-white">
                    <TableCell colSpan={7} className="text-center text-gray-400">
                      No returns found
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

export default PurchaseReturnInformation;