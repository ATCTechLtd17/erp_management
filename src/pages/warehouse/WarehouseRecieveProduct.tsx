/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { X, Maximize2, Edit, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';


interface Product {
  id: string;
  name: string;
  costPrice: number;
  quantity: number;
}

interface Transfer {
  id: string;
  date: string;
  sendWarehouse: string;
  receiveWarehouse: string;
  products: Product[];
}

interface WarehouseDetails {
  id: string;
  name: string;
}

const WarehouseReceiveProduct: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [remarks, setRemarks] = useState<string>('');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>("10");
  const [totalItems, setTotalItems] = useState<number>(0);

  // Example warehouse data
  const warehouses: WarehouseDetails[] = [
    { id: '1', name: 'Shilphal Market' },
    { id: '2', name: 'Showroom' },
    { id: '3', name: 'Main Warehouse' },
    { id: '4', name: 'Distribution Center' }
  ];

  // Example products
  const products: Product[] = [
    { id: '1', name: 'MTS- 804 -3p/3m', costPrice: 23, quantity: 10 },
    { id: '2', name: 'Product B', costPrice: 35, quantity: 5 },
    { id: '3', name: 'Product C', costPrice: 45, quantity: 8 }
  ];

  // Example transfer data
  const exampleTransfers: Transfer[] = [
    {
      id: '1',
      date: '2025-03-15',
      sendWarehouse: 'Shilphal Market',
      receiveWarehouse: 'Showroom',
      products: [
        { id: '1', name: 'MTS- 804 -3p/3m', costPrice: 23, quantity: 10 }
      ]
    },
    {
      id: '2',
      date: '2025-03-16',
      sendWarehouse: 'Main Warehouse',
      receiveWarehouse: 'Distribution Center',
      products: [
        { id: '2', name: 'Product B', costPrice: 35, quantity: 5 },
        { id: '3', name: 'Product C', costPrice: 45, quantity: 8 }
      ]
    }
  ];

  useEffect(() => {
    // In a real application, this would fetch data from an API
    setTransfers(exampleTransfers);
    setTotalItems(exampleTransfers.length);
  }, []);

  const handleEditTransfer = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
  };

  const handleConfirm = () => {
    // In a real application, this would update the database
    console.log('Confirmed transfer:', selectedTransfer);
    console.log('Remarks:', remarks);
    // Reset form
    setSelectedTransfer(null);
    setRemarks('');
  };

  const handleCancel = () => {
    setSelectedTransfer(null);
    setRemarks('');
  };

  const handleReset = () => {
    setRemarks('');
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Warehouse Recive Product</CardTitle>
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
          {/* Product details table */}
          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium">Sending Date</TableHead>
                  <TableHead className="font-medium">Send Warehouse Name</TableHead>
                  <TableHead className="font-medium">Recive Warehouse Name</TableHead>
                  <TableHead className="font-medium">Product</TableHead>
                  <TableHead className="font-medium">Cost Price</TableHead>
                  <TableHead className="font-medium">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedTransfer ? (
                  selectedTransfer.products.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-100">
                      <TableCell>{selectedTransfer.date}</TableCell>
                      <TableCell>{selectedTransfer.sendWarehouse}</TableCell>
                      <TableCell>{selectedTransfer.receiveWarehouse}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.costPrice}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-16">
                    <TableCell colSpan={6} className="text-center text-gray-400">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Remarks section */}
          <div className="mt-4 flex items-start">
            <label className="w-24 text-right pr-4 pt-2">Remarks</label>
            <div className="flex-1 relative">
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks"
                className="w-full"
                rows={3}
              />
              <div className="absolute bottom-2 right-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-center gap-2 mt-4 mb-4">
            <Button 
              type="button" 
              className="bg-blue-500 hover:bg-blue-600 text-white" 
              onClick={handleConfirm}
            >
              Confirm
            </Button>
            <Button 
              type="button" 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          
          {/* Transfers list */}
          <div className="border rounded overflow-hidden mt-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium w-16">Edit</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Sending Warehouse</TableHead>
                  <TableHead className="font-medium">Receiving Warehouse</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.length > 0 ? (
                  transfers.map((transfer) => (
                    <TableRow key={transfer.id} className="hover:bg-gray-100">
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleEditTransfer(transfer)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{transfer.date}</TableCell>
                      <TableCell>{transfer.sendWarehouse}</TableCell>
                      <TableCell>{transfer.receiveWarehouse}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-64">
                    <TableCell colSpan={4} className="text-center text-gray-400">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div>Total Items: {totalItems}</div>
            <div className="flex items-center gap-2">
              <span>Page Size:</span>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-20 h-8">
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
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <span>⟪</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <span>⟨</span>
              </Button>
              
              <Input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > 0 && value <= totalPages) {
                    setCurrentPage(value);
                  }
                }}
                className="w-16 h-8 text-center"
              />
              
              <span>of {totalPages}</span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <span>⟩</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <span>⟫</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarehouseReceiveProduct;