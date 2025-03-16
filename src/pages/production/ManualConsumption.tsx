/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, ChangeEvent,  } from 'react';
import { X, Maximize2, Save, Plus, Edit, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface Product {
  id: string;
  productType: string;
  productName: string;
  quantity: number;
}

interface ConsumptionItem {
  id: string;
  productType: string;
  productName: string;
  rawQuantity: number;
}

const ManualConsumption: React.FC = () => {
  const [formData, setFormData] = useState<Omit<ConsumptionItem, 'id'>>({
    productType: '',
    productName: '',
    rawQuantity: 0
  });

  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [consumptionItems, setConsumptionItems] = useState<ConsumptionItem[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);

  // Sample data for dropdowns
  const productTypes = [
    'Raw Material',
    'Finished Product',
    'Packaging Material',
    'Machinery Parts',
    'Consumables'
  ];

  const products = {
    'Raw Material': ['Aluminum', 'Steel', 'Copper', 'Plastic Granules', 'Wood'],
    'Finished Product': ['Product A', 'Product B', 'Product C'],
    'Packaging Material': ['Cartons', 'Bubble Wrap', 'Tape', 'Labels'],
    'Machinery Parts': ['Bearings', 'Belts', 'Motors', 'Gears'],
    'Consumables': ['Lubricants', 'Cleaning Agents', 'Gloves', 'Tools']
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === 'rawQuantity') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProductTypeChange = (value: string): void => {
    setFormData(prev => ({ ...prev, productType: value, productName: '' }));
  };

  const handleProductNameChange = (value: string): void => {
    setFormData(prev => ({ ...prev, productName: value }));
  };

  const handleAddToList = (): void => {
    if (!formData.productType || !formData.productName || formData.rawQuantity <= 0) {
      alert('Please fill all required fields');
      return;
    }

    if (editMode && editItemId) {
      setConsumptionItems(prev => 
        prev.map(item => 
          item.id === editItemId 
            ? { ...formData, id: editItemId } 
            : item
        )
      );
      setEditMode(false);
      setEditItemId(null);
    } else {
      const newItem: ConsumptionItem = {
        id: Date.now().toString(),
        ...formData
      };
      setConsumptionItems(prev => [...prev, newItem]);
    }

    // Reset form
    resetForm();
  };

  const resetForm = (): void => {
    setFormData({
      productType: '',
      productName: '',
      rawQuantity: 0
    });
    setEditMode(false);
    setEditItemId(null);
  };

  const handleSave = (): void => {
    if (consumptionItems.length === 0) {
      alert('Please add at least one item to the list');
      return;
    }
    
    console.log('Saved consumption items:', consumptionItems);
    // Here you would typically send the data to your backend
    
    // Clear the list after saving
    setConsumptionItems([]);
    resetForm();
  };

  const handleEdit = (item: ConsumptionItem): void => {
    setFormData({
      productType: item.productType,
      productName: item.productName,
      rawQuantity: item.rawQuantity
    });
    setEditMode(true);
    setEditItemId(item.id);
  };

  const handleDelete = (id: string): void => {
    setConsumptionItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Manual Consumption</CardTitle>
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
          {/* Top form row */}
          <div className="grid grid-cols-3 gap-4 mb-6 items-center">
            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Prodt Type<span className="text-red-500">*</span></label>
              <Select value={formData.productType} onValueChange={handleProductTypeChange}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((type, index) => (
                    <SelectItem key={index} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Product<span className="text-red-500">*</span></label>
              <Select 
                value={formData.productName} 
                onValueChange={handleProductNameChange}
                disabled={!formData.productType}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {formData.productType && products[formData.productType as keyof typeof products]?.map((product, index) => (
                    <SelectItem key={index} value={product}>{product}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Quantity<span className="text-red-500">*</span></label>
              <Input
                name="rawQuantity"
                type="number"
                value={formData.rawQuantity === 0 ? '' : formData.rawQuantity}
                onChange={handleInputChange}
                placeholder="0"
                className="flex-1"
                min="0"
              />
            </div>
          </div>

          {/* Light blue form section */}
          <div className="bg-blue-50 p-4 rounded mb-6">
            <div className="grid grid-cols-3 gap-4 mb-4 items-center">
              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Prodt Type<span className="text-red-500">*</span></label>
                <Select value={formData.productType} onValueChange={handleProductTypeChange}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type, index) => (
                      <SelectItem key={index} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Product<span className="text-red-500">*</span></label>
                <Select 
                  value={formData.productName} 
                  onValueChange={handleProductNameChange}
                  disabled={!formData.productType}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.productType && products[formData.productType as keyof typeof products]?.map((product, index) => (
                      <SelectItem key={index} value={product}>{product}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center">
                <label className="w-24 text-right pr-4">Quantity<span className="text-red-500">*</span></label>
                <Input
                  name="rawQuantity"
                  type="number"
                  value={formData.rawQuantity === 0 ? '' : formData.rawQuantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="flex-1"
                  min="0"
                />
              </div>
            </div>

            {/* Add to List and Reset buttons */}
            <div className="flex gap-2 mt-4">
              <Button 
                type="button" 
                onClick={handleAddToList} 
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Add to List
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>

            {/* Table of added items */}
            <div className="border rounded mt-4 overflow-hidden bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                    <TableHead className="font-medium w-20">Edit</TableHead>
                    <TableHead className="font-medium w-20">Delete</TableHead>
                    <TableHead className="font-medium">Product</TableHead>
                    <TableHead className="font-medium w-24">Raw Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consumptionItems.length > 0 ? (
                    consumptionItems.map((item, index) => (
                      <TableRow key={item.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 text-blue-500"
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
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.rawQuantity}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="h-32 hover:bg-white">
                      <TableCell colSpan={4} className="text-center text-gray-400">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Save and Cancel buttons */}
          <div className="flex gap-2 mt-4">
            <Button 
              type="button" 
              onClick={handleSave} 
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
            <Button type="button" variant="outline" onClick={() => {
              setConsumptionItems([]);
              resetForm();
            }}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualConsumption;