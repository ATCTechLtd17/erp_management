import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';


interface Product {
  id: string;
  productName: string;
  quantity: number;
  rate: number;
  discount: number;
  tk: number;
  total: number;
}

interface SalesFormData {
  customer: string;
  saleDate: string;
  probable: string;
  details: string;
  payType: string;
  priceType: string;
  model: string;
  product: string;
  warehouse: string;
  stock: number;
  price: number;
  quantity: number;
  discount: string;
  tk: string;
}

const SalesInformation: React.FC = () => {
  const [formData, setFormData] = useState<SalesFormData>({
    customer: '',
    saleDate: new Date().toISOString().split('T')[0],
    probable: new Date().toISOString().split('T')[0],
    details: '',
    payType: 'Cash',
    priceType: '',
    model: '',
    product: '',
    warehouse: '',
    stock: 0,
    price: 0,
    quantity: 0,
    discount: '%',
    tk: ''
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  
  // Financial calculations
  const [previousDue, setPreviousDue] = useState<number>(0);
  const [overLess, setOverLess] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [paidAmt, setPaidAmt] = useState<number>(0);
  const [payableAmt, setPayableAmt] = useState<number>(0);
  const [balanceDue, setBalanceDue] = useState<number>(0);

  // Options for dropdowns
  const payTypes = ['Cash', 'Credit', 'Check', 'Online Transfer'];
  const priceTypes = ['Retail', 'Wholesale', 'Special', 'Discount'];
  const models = ['Model A', 'Model B', 'Model C', 'Model D'];
  const productOptions = ['Product 1', 'Product 2', 'Product 3', 'Product 4'];
  const warehouses = ['Main Warehouse', 'Secondary Warehouse', 'Store Front'];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseFloat(value);
    setFormData(prev => ({ ...prev, [name]: numValue }));
  };

  const handleFinancialChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseFloat(value);
    
    switch(name) {
      case 'previousDue':
        setPreviousDue(numValue);
        break;
      case 'overLess':
        setOverLess(numValue);
        break;
      case 'shippingCost':
        setShippingCost(numValue);
        break;
      case 'paidAmt':
        setPaidAmt(numValue);
        break;
      default:
        break;
    }
  };

  const addToList = (): void => {
    if (!formData.product || formData.quantity <= 0) return;
    
    const total = formData.price * formData.quantity;
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      productName: formData.product,
      quantity: formData.quantity,
      rate: formData.price,
      discount: parseFloat(formData.discount),
      tk: parseFloat(formData.tk || '0'),
      total: total
    };
    
    setProducts([...products, newProduct]);
    
    // Reset product form fields
    setFormData(prev => ({
      ...prev,
      model: '',
      product: '',
      warehouse: '',
      stock: 0,
      price: 0,
      quantity: 0
    }));

    // Recalculate totals
    calculateTotals([...products, newProduct]);
  };

  const calculateTotals = (productList: Product[]): void => {
    const totalAmount = productList.reduce((sum, product) => sum + product.total, 0);
    const calculatedPayable = totalAmount + previousDue + shippingCost - overLess;
    setPayableAmt(calculatedPayable);
    setBalanceDue(calculatedPayable - paidAmt);
  };

  const resetForm = (): void => {
    setFormData({
      customer: '',
      saleDate: new Date().toISOString().split('T')[0],
      probable: new Date().toISOString().split('T')[0],
      details: '',
      payType: 'Cash',
      priceType: '',
      model: '',
      product: '',
      warehouse: '',
      stock: 0,
      price: 0,
      quantity: 0,
      discount: '%',
      tk: ''
    });
    setProducts([]);
    setPreviousDue(0);
    setOverLess(0);
    setShippingCost(0);
    setPaidAmt(0);
    setPayableAmt(0);
    setBalanceDue(0);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", { formData, products, financials: {
      previousDue,
      overLess,
      shippingCost,
      paidAmt,
      payableAmt,
      balanceDue
    }});
    
    // Optional: Reset form after submission
    // resetForm();
  };

  const handleCancel = (): void => {
    resetForm();
  };

  const removeProduct = (id: string): void => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    calculateTotals(updatedProducts);
  };

  const editProduct = (id: string): void => {
    const productToEdit = products.find(product => product.id === id);
    if (!productToEdit) return;
    
    // You would typically set form fields to the values of the product to edit
    // and remove the product from the list
    setFormData(prev => ({
      ...prev,
      product: productToEdit.productName,
      quantity: productToEdit.quantity,
      price: productToEdit.rate,
      discount: productToEdit.discount.toString(),
      tk: productToEdit.tk.toString()
    }));
    
    removeProduct(id);
  };

  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };

  const getTotalSum = (): number => {
    return products.reduce((sum, product) => sum + product.total, 0);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Sales Information</CardTitle>
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
              {/* First Column */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4">Customer<span className="text-red-500">*</span></label>
                  <Input
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    placeholder="Search Customer"
                    required
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4">Sale Date<span className="text-red-500">*</span></label>
                  <Input
                    type="date"
                    name="saleDate"
                    value={formData.saleDate}
                    onChange={handleInputChange}
                    required
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Second Column */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-28 text-right pr-4">Details</label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    placeholder="Can not be empty"
                    className="flex-1"
                    rows={4}
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-28 text-right pr-4">Probable<span className="text-red-500">*</span></label>
                  <Input
                    type="date"
                    name="probable"
                    value={formData.probable}
                    onChange={handleInputChange}
                    required
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Third Column */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-28 text-right pr-4">Pay Type<span className="text-red-500">*</span></label>
                  <Select value={formData.payType} onValueChange={(value) => handleSelectChange('payType', value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select Pay Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {payTypes.map((type, index) => (
                        <SelectItem key={index} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center">
                  <label className="w-28 text-right pr-4">Price Type<span className="text-red-500">*</span></label>
                  <Select value={formData.priceType} onValueChange={(value) => handleSelectChange('priceType', value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceTypes.map((type, index) => (
                        <SelectItem key={index} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Product Selection Section */}
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <label className="w-24 text-right pr-4">Model<span className="text-red-500">*</span></label>
                  <Select value={formData.model} onValueChange={(value) => handleSelectChange('model', value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model, index) => (
                        <SelectItem key={index} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center">
                  <label className="w-24 text-right pr-4">Product<span className="text-red-500">*</span></label>
                  <Select value={formData.product} onValueChange={(value) => handleSelectChange('product', value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select Product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptions.map((product, index) => (
                        <SelectItem key={index} value={product}>{product}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center">
                  <label className="w-28 text-right pr-4">Warehouse<span className="text-red-500">*</span></label>
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
              </div>

              <div className="grid grid-cols-5 gap-4 mb-4">
                <div className="flex items-center">
                  <label className="w-16 text-right pr-4">Stock</label>
                  <Input
                    type="number"
                    name="stock"
                    value={formData.stock || ''}
                    onChange={handleNumberChange}
                    className="flex-1"
                    readOnly
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-16 text-right pr-4">Price<span className="text-red-500">*</span></label>
                  <Input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleNumberChange}
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-20 text-right pr-4">Quantity<span className="text-red-500">*</span></label>
                  <Input
                    type="number"
                    name="quantity"
                    value={formData.quantity || ''}
                    onChange={handleNumberChange}
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-20 text-right pr-4">Discount</label>
                  <Input
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="%"
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-12 text-right pr-4">TK</label>
                  <Input
                    name="tk"
                    value={formData.tk}
                    onChange={handleInputChange}
                    placeholder="Tk"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <Button type="button" className="bg-blue-500 text-white" onClick={addToList}>
                  Add to List
                </Button>
                <Button type="button" variant="outline" className="ml-2" onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    model: '',
                    product: '',
                    warehouse: '',
                    stock: 0,
                    price: 0,
                    quantity: 0,
                    discount: '%',
                    tk: ''
                  }));
                }}>
                  Reset
                </Button>
              </div>
            </div>

            {/* Products Table */}
            <div className="border rounded overflow-hidden mb-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                    <TableHead className="font-medium">Edit</TableHead>
                    <TableHead className="font-medium">Delete</TableHead>
                    <TableHead className="font-medium">Product Name</TableHead>
                    <TableHead className="font-medium">Qty</TableHead>
                    <TableHead className="font-medium">Rate</TableHead>
                    <TableHead className="font-medium">Dis Tk</TableHead>
                    <TableHead className="font-medium">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <TableRow key={product.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => editProduct(product.id)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 text-red-500"
                            onClick={() => removeProduct(product.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.rate.toFixed(2)}</TableCell>
                        <TableCell>{product.tk}</TableCell>
                        <TableCell>{product.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="h-32 hover:bg-white">
                      <TableCell colSpan={7} className="text-center text-gray-400">
                        No products added
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Financial Left */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4">Previous Due</label>
                  <Input
                    type="number"
                    name="previousDue"
                    value={previousDue || ''}
                    onChange={handleFinancialChange}
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4">Over Less</label>
                  <Input
                    type="number"
                    name="overLess"
                    value={overLess || ''}
                    onChange={handleFinancialChange}
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4">Shipping Cost</label>
                  <Input
                    type="number"
                    name="shippingCost"
                    value={shippingCost || ''}
                    onChange={handleFinancialChange}
                    className="flex-1"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4">Paid Amt</label>
                  <Input
                    type="number"
                    name="paidAmt"
                    value={paidAmt || ''}
                    onChange={handleFinancialChange}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Space in the middle */}
              <div></div>

              {/* Financial Right */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4">Total</label>
                  <Input
                    type="number"
                    value={getTotalSum() || ''}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4">Payable Amt</label>
                  <Input
                    type="number"
                    value={payableAmt || ''}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4">Balance Due</label>
                  <Input
                    type="number"
                    value={balanceDue || ''}
                    readOnly
                    className="flex-1 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-center gap-4 mt-6">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesInformation;