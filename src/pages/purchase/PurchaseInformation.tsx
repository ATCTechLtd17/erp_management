/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save, Edit, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface Supplier {
  id: string;
  name: string;
}

interface Warehouse {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock?: number;
}

interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface PurchaseFormData {
  supplier: string;
  date: string;
  product: string;
  warehouse: string;
  stock: number;
  costPrice: number;
  quantity: number;
  address: string;
  invoiceNo: string;
  mobileNo: string;
  payType: string;
}

const PurchaseInformation: React.FC = () => {
  const [formData, setFormData] = useState<PurchaseFormData>({
    supplier: '',
    date: new Date().toISOString().split('T')[0],
    product: '',
    warehouse: '',
    stock: 0,
    costPrice: 0,
    quantity: 0,
    address: '',
    invoiceNo: '',
    mobileNo: '',
    payType: 'Cash'
  });

  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [previousDue, setPreviousDue] = useState<number>(0);
  const [less, setLess] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [dueAmount, setDueAmount] = useState<number>(0);
  
  const suppliers: Supplier[] = [
    { id: '1', name: 'Supplier 1' },
    { id: '2', name: 'Supplier 2' },
    { id: '3', name: 'Supplier 3' }
  ];
  
  const warehouses: Warehouse[] = [
    { id: '1', name: 'Warehouse 1' },
    { id: '2', name: 'Warehouse 2' },
    { id: '3', name: 'Warehouse 3' }
  ];
  
  const products: Product[] = [
    { id: '1', name: 'Product 1', price: 100, stock: 50 },
    { id: '2', name: 'Product 2', price: 200, stock: 30 },
    { id: '3', name: 'Product 3', price: 150, stock: 25 }
  ];
  
  const paymentTypes = ['Cash', 'Card', 'Bank Transfer'];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    // Handle number inputs
    if (name === 'stock' || name === 'costPrice' || name === 'quantity') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? 0 : parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update stock when product changes
    if (name === 'product') {
      const selectedProduct = products.find(p => p.id === value);
      if (selectedProduct) {
        setFormData(prev => ({
          ...prev,
          costPrice: selectedProduct.price,
          stock: selectedProduct.stock || 0
        }));
      }
    }
    
    // Update address when supplier changes
    if (name === 'supplier') {
      const selectedSupplier = suppliers.find(s => s.id === value);
      if (selectedSupplier) {
        // In a real app, you would fetch the supplier's address and other details
        setPreviousDue(Math.floor(Math.random() * 5000)); // Mock previous due amount
      }
    }
  };

  const handleAmountChange = (name: string, value: string): void => {
    const numValue = value === '' ? 0 : parseFloat(value);
    
    if (name === 'previousDue') {
      setPreviousDue(numValue);
    } else if (name === 'less') {
      setLess(numValue);
    } else if (name === 'paidAmount') {
      setPaidAmount(numValue);
    } else if (name === 'payAmount') {
      setPayAmount(numValue);
    }
    
    // Calculate due amount whenever values change
    calculateDueAmount();
  };

  const calculateTotal = (): number => {
    return purchaseItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateDueAmount = (): void => {
    const total = calculateTotal();
    const due = total + previousDue - less - paidAmount;
    setDueAmount(due);
  };

  const addToList = (): void => {
    // Validate form data
    if (!formData.product || formData.quantity <= 0 || formData.costPrice <= 0) {
      // Show validation error in a real app
      return;
    }
    
    const selectedProduct = products.find(p => p.id === formData.product);
    if (!selectedProduct) return;
    
    const newItem: PurchaseItem = {
      id: Date.now().toString(),
      productId: formData.product,
      productName: selectedProduct.name,
      quantity: formData.quantity,
      price: formData.costPrice,
      total: formData.quantity * formData.costPrice
    };
    
    setPurchaseItems([...purchaseItems, newItem]);
    
    // Reset product form fields
    setFormData(prev => ({
      ...prev,
      product: '',
      costPrice: 0,
      quantity: 0,
      stock: 0
    }));
    
    // Recalculate totals
    calculateDueAmount();
  };

  const handleRemoveItem = (id: string): void => {
    setPurchaseItems(purchaseItems.filter(item => item.id !== id));
    calculateDueAmount();
  };

  const handleEditItem = (item: PurchaseItem): void => {
    // In a real app, you might want to implement this
    // For now, we'll just remove the item and set the form data
    setPurchaseItems(purchaseItems.filter(i => i.id !== item.id));
    
    setFormData(prev => ({
      ...prev,
      product: item.productId,
      costPrice: item.price,
      quantity: item.quantity
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Submit purchase data to your backend
    // This would be implemented in a real application
    
    // For demo, let's just reset the form
    resetForm();
  };

  const resetForm = (): void => {
    setFormData({
      supplier: '',
      date: new Date().toISOString().split('T')[0],
      product: '',
      warehouse: '',
      stock: 0,
      costPrice: 0,
      quantity: 0,
      address: '',
      invoiceNo: '',
      mobileNo: '',
      payType: 'Cash'
    });
    setPurchaseItems([]);
    setPreviousDue(0);
    setLess(0);
    setPaidAmount(0);
    setPayAmount(0);
    setDueAmount(0);
  };

  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Purchase Information</CardTitle>
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
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Top row */}
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Supplier<span className="text-red-500">*</span></label>
                <Select value={formData.supplier} onValueChange={(value) => handleSelectChange('supplier', value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>{supplier.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Address</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address can not be empty"
                  className="flex-1"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Mobile No</label>
                <Input
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  placeholder="Mobile Number can not be empty"
                  className="flex-1"
                />
              </div>
              
              {/* Second row */}
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Date<span className="text-red-500">*</span></label>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Invoice No</label>
                <Input
                  name="invoiceNo"
                  value={formData.invoiceNo}
                  onChange={handleInputChange}
                  placeholder="Invoice can not be empty"
                  className="flex-1"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Pay Type<span className="text-red-500">*</span></label>
                <Select value={formData.payType} onValueChange={(value) => handleSelectChange('payType', value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Cash" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentTypes.map((type, index) => (
                      <SelectItem key={index} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Product selection area with light blue background */}
            <div className="bg-blue-50 p-4 rounded">
              <div className="grid grid-cols-6 gap-4">
                <div className="flex items-center">
                  <label className="w-24 text-right pr-4">Product<span className="text-red-500">*</span></label>
                  <Input
                    placeholder="Search Product"
                    value={formData.product ? products.find(p => p.id === formData.product)?.name || '' : ''}
                    //@ts-ignore
                    onChange={(e) => {
                      // In a real app, this would filter products as you type
                      // For now, just a placeholder
                    }}
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-28 text-right pr-4">Warehouse<span className="text-red-500">*</span></label>
                  <Select value={formData.warehouse} onValueChange={(value) => handleSelectChange('warehouse', value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select Warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>{warehouse.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center">
                  <label className="w-16 text-right pr-4">Stock</label>
                  <Input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-24 text-right pr-4">Cost Price<span className="text-red-500">*</span></label>
                  <Input
                    name="costPrice"
                    type="number"
                    value={formData.costPrice}
                    onChange={handleInputChange}
                    placeholder="Cost Price"
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-24 text-right pr-4">Quantity<span className="text-red-500">*</span></label>
                  <Input
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <Button 
                    type="button" 
                    onClick={addToList}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add to List
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        product: '',
                        warehouse: '',
                        stock: 0,
                        costPrice: 0,
                        quantity: 0
                      }));
                    }}
                    className="ml-2"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Product table */}
            <div className="mt-4 border rounded overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                    <TableHead className="font-medium">Edit</TableHead>
                    <TableHead className="font-medium">Del</TableHead>
                    <TableHead className="font-medium">Product</TableHead>
                    <TableHead className="font-medium">Price</TableHead>
                    <TableHead className="font-medium">Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseItems.length > 0 ? (
                    purchaseItems.map((item, index) => (
                      <TableRow key={item.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleEditItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.price.toFixed(2)}</TableCell>
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
            
            {/* Total calculation area */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Previous Due</label>
                  <Input
                    type="number"
                    value={previousDue}
                    onChange={(e) => handleAmountChange('previousDue', e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Less</label>
                  <Input
                    type="number"
                    value={less}
                    onChange={(e) => handleAmountChange('less', e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Paid Amount<span className="text-red-500">*</span></label>
                  <Input
                    type="number"
                    value={paidAmount}
                    onChange={(e) => handleAmountChange('paidAmount', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Total</label>
                  <Input
                    type="number"
                    value={calculateTotal()}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Pay Amount</label>
                  <Input
                    type="number"
                    value={payAmount}
                    onChange={(e) => handleAmountChange('payAmount', e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-right pr-4">Due Amount</label>
                  <Input
                    type="number"
                    value={dueAmount}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                </div>
              </div>
            </div>
            
            {/* Form submit buttons */}
            <div className="flex gap-2 mt-6 justify-center">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseInformation;