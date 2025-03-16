import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface AdjustmentItem {
  id: string;
  product: string;
  costPrice: number;
  quantity: number;
}

interface Adjustment {
  date: string;
  type: string;
  reason: string;
  product: string;
  warehouse: string;
  stock: number;
  costPrice: number;
  quantity: number;
  items: AdjustmentItem[];
}

const AdjustmentInformation: React.FC = () => {
  const [formData, setFormData] = useState<Adjustment>({
    date: new Date().toISOString().split('T')[0],
    type: '',
    reason: '',
    product: '',
    warehouse: '',
    stock: 0,
    costPrice: 0,
    quantity: 0,
    items: []
  });

  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<AdjustmentItem[]>([
    { 
      id: '1', 
      product: 'MTS- 804 -2p/3m', 
      costPrice: 233, 
      quantity: 5 
    }
  ]);

  const adjustmentTypes = [
    'Select Adjustment Type',
    'Lost',
    'Gift',
    'Damage',
    'Waste',
    'Garbage',
    'Found'
  ];

  const products = [
    'Select Product',
    'MTS- 804 -2p/3m',
    'Product A',
    'Product B',
    'Product C'
  ];

  const warehouses = [
    'Select Warehouse',
    'Warehouse 1',
    'Warehouse 2',
    'Warehouse 3'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value === '' ? '' : parseFloat(value) || 0 }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Save logic would go here
    console.log("Form submitted:", formData);
    console.log("Items:", currentItems);
  };

  const resetForm = (): void => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: '',
      reason: '',
      product: '',
      warehouse: '',
      stock: 0,
      costPrice: 0,
      quantity: 0,
      items: []
    });
  };

  const handleEdit = (item: AdjustmentItem): void => {
    // Set the form data based on the selected item
    setFormData(prev => ({
      ...prev,
      product: item.product,
      costPrice: item.costPrice,
      quantity: item.quantity
    }));
  };

  const handleDelete = (id: string): void => {
    setCurrentItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };

  const handleAddToList = (): void => {
    if (!formData.product || formData.product === 'Select Product') {
      // Display validation error
      return;
    }

    const newItem: AdjustmentItem = {
      id: (currentItems.length + 1).toString(),
      product: formData.product,
      costPrice: formData.costPrice,
      quantity: formData.quantity
    };
    
    setCurrentItems([...currentItems, newItem]);
    
    // Reset only the product-related fields
    setFormData(prev => ({
      ...prev,
      product: '',
      costPrice: 0,
      quantity: 0
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Adjustment Information</CardTitle>
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Form fields - left column */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Date<span className="text-red-500">*</span></label>
                  <div className="flex-1 flex">
                    <Input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="flex-1"
                    />
                    <Button type="button" variant="ghost" className="px-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Product<span className="text-red-500">*</span></label>
                  <Select value={formData.product} onValueChange={(value) => handleSelectChange("product", value)}>
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
                  <label className="w-32 text-right pr-4">Warehouse<span className="text-red-500">*</span></label>
                  <Select value={formData.warehouse} onValueChange={(value) => handleSelectChange("warehouse", value)}>
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

                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Stock</label>
                  <Input
                    type="text"
                    name="stock"
                    value={formData.stock}
                    onChange={handleNumberChange}
                    placeholder="0"
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Cost Price<span className="text-red-500">*</span></label>
                  <Input
                    type="text"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleNumberChange}
                    placeholder="0"
                    required
                    className="flex-1"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Quantity<span className="text-red-500">*</span></label>
                  <Input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleNumberChange}
                    placeholder="0"
                    required
                    className="flex-1"
                  />
                </div>

                <div className="flex mt-4 space-x-2">
                  <Button 
                    type="button" 
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleAddToList}
                  >
                    <span className="mr-1">+</span> Add to List
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Reset
                  </Button>
                </div>
              </div>

              {/* Middle and right columns for type, reason and table */}
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <label className="w-16 text-right pr-4">Type<span className="text-red-500">*</span></label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select Adjustment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {adjustmentTypes.map((type, index) => (
                          <SelectItem key={index} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start">
                    <label className="w-20 text-right pr-4 pt-2">Reason</label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder=""
                      className="flex-1 min-h-24 p-2 border rounded"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="border rounded overflow-hidden mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                        <TableHead className="font-medium w-16">Edit</TableHead>
                        <TableHead className="font-medium w-16">Delete</TableHead>
                        <TableHead className="font-medium">Product</TableHead>
                        <TableHead className="font-medium">Cost Price</TableHead>
                        <TableHead className="font-medium">Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                          <TableRow key={item.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                            <TableCell className="p-1 text-center">
                              <button 
                                type="button"
                                className="p-1 border rounded"
                                onClick={() => handleEdit(item)}
                              >
                                <img src="/api/placeholder/16/16" alt="Edit" />
                              </button>
                            </TableCell>
                            <TableCell className="p-1 text-center">
                              <button 
                                type="button"
                                className="p-1 border rounded"
                                onClick={() => handleDelete(item.id)}
                              >
                                <img src="/api/placeholder/16/16" alt="Delete" />
                              </button>
                            </TableCell>
                            <TableCell>{item.product}</TableCell>
                            <TableCell>{item.costPrice}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
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
              </div>
            </div>

            {/* Action buttons at bottom */}
            <div className="flex justify-center mt-6 bg-gray-50 py-4">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button type="button" variant="outline" className="ml-2">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdjustmentInformation;