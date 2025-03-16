import React, { useState, ChangeEvent} from 'react';
import { X, Maximize2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface Product {
  id: string;
  name: string;
  stock: number;
  costPrice: number;
}

interface Warehouse {
  id: string;
  name: string;
}

interface TransferItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  costPrice: number;
}

const WarehouseSendProduct: React.FC = () => {
  // Form data states
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [fromWarehouse, setFromWarehouse] = useState<string>('');
  const [toWarehouse, setToWarehouse] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('0');
  const [stock, setStock] = useState<string>('0');
  const [costPrice, setCostPrice] = useState<string>('0');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  
  // Table data state
  const [transferItems, setTransferItems] = useState<TransferItem[]>([
    { id: '1', productId: '1', productName: 'MTS- 804 -3p/3m', quantity: 23, costPrice: 23 }
  ]);

  // Sample data
  const warehouses: Warehouse[] = [
    { id: '1', name: 'Shilphal Market' },
    { id: '2', name: 'Showroom' },
    { id: '3', name: 'Main Warehouse' },
    { id: '4', name: 'Distribution Center' }
  ];

  const products: Product[] = [
    { id: '1', name: 'MTS- 804 -3p/3m', stock: 792, costPrice: 23 },
    { id: '2', name: 'Product B', stock: 75, costPrice: 35 },
    { id: '3', name: 'Product C', stock: 50, costPrice: 45 },
    { id: '4', name: 'Product D', stock: 120, costPrice: 15 }
  ];

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
    const product = products.find(p => p.id === value);
    if (product) {
      setStock(product.stock.toString());
      setCostPrice(product.costPrice.toString());
    } else {
      setStock('0');
      setCostPrice('0');
    }
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleCostPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCostPrice(e.target.value);
  };

  const handleAddToList = () => {
    if (!selectedProduct || parseInt(quantity) <= 0) {
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    if (!product) {
      return;
    }

    const newItem: TransferItem = {
      id: Date.now().toString(),
      productId: product.id,
      productName: product.name,
      quantity: parseInt(quantity),
      costPrice: parseFloat(costPrice)
    };

    setTransferItems([...transferItems, newItem]);
    resetProductForm();
  };

  const resetProductForm = () => {
    setSelectedProduct('');
    setQuantity('0');
    setStock('0');
    setCostPrice('0');
  };

  const handleDelete = (id: string) => {
    setTransferItems(transferItems.filter(item => item.id !== id));
  };

  const handleEdit = (item: TransferItem) => {
    // Remove item from list
    setTransferItems(transferItems.filter(i => i.id !== item.id));
    
    // Populate form with item data
    setSelectedProduct(item.productId);
    setQuantity(item.quantity.toString());
    setCostPrice(item.costPrice.toString());
    
    // Get stock from products array
    const product = products.find(p => p.id === item.productId);
    if (product) {
      setStock(product.stock.toString());
    }
  };

  const handleSave = () => {
    // Save logic here
    console.log('Saving transfer', {
      date,
      fromWarehouse,
      toWarehouse,
      items: transferItems
    });
    // Reset form after saving if needed
  };

  const handleCancel = () => {
    setDate(new Date().toISOString().split('T')[0]);
    setFromWarehouse('');
    setToWarehouse('');
    setTransferItems([]);
    resetProductForm();
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Warehouse Send Product</CardTitle>
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
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 mb-6">
            {/* Left column */}
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Date<span className="text-red-500">*</span></label>
                <div className="flex-1 flex">
                  <Input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button variant="ghost" size="sm" className="ml-1 p-0 h-full">
                    <span className="text-xl">📅</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Product<span className="text-red-500">*</span></label>
                <Select value={selectedProduct} onValueChange={handleProductChange}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Stock</label>
                <Input
                  type="text"
                  value={stock}
                  readOnly
                  className="flex-1 bg-gray-50"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Cost Price</label>
                <Input
                  type="text"
                  value={costPrice}
                  onChange={handleCostPriceChange}
                  className="flex-1"
                />
              </div>
              
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Quantity<span className="text-red-500">*</span></label>
                <Input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="flex-1"
                />
              </div>
              
              <div className="flex items-center ml-28">
                <Button 
                  type="button" 
                  onClick={handleAddToList} 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Add to List
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetProductForm}
                  className="ml-2"
                >
                  Reset
                </Button>
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Send From<span className="text-red-500">*</span></label>
                <Select value={fromWarehouse} onValueChange={setFromWarehouse}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Send Warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id}>{warehouse.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Recive To<span className="text-red-500">*</span></label>
                <Select value={toWarehouse} onValueChange={setToWarehouse}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Receive Warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id}>{warehouse.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border rounded overflow-hidden mt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                      <TableHead className="font-medium">Edit</TableHead>
                      <TableHead className="font-medium">Delete</TableHead>
                      <TableHead className="font-medium w-1/2">Product</TableHead>
                      <TableHead className="font-medium">Cost Price</TableHead>
                      <TableHead className="font-medium">Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transferItems.length > 0 ? (
                      transferItems.map((item) => (
                        <TableRow key={item.id} className="hover:bg-gray-100">
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0"
                              onClick={() => handleEdit(item)}
                            >
                              <span className="text-xs">✏️</span>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0"
                              onClick={() => handleDelete(item.id)}
                            >
                              <span className="text-xs">🗑️</span>
                            </Button>
                          </TableCell>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.costPrice}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          
          {/* Footer buttons */}
          <div className="flex justify-center gap-2 mt-6">
            <Button 
              type="button" 
              className="bg-blue-500 hover:bg-blue-600 text-white" 
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarehouseSendProduct;