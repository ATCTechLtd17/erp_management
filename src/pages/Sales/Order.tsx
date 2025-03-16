import React, { useState, ChangeEvent } from 'react';
import { Eye, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import OrderDetailsModal from './OrderDetailsModal';

interface Order {
  id: string;
  orderNo: string;
  customerName: string;
  address: string;
  mobile: string;
  orderDate: string;
  payment: string;
}

const OnlineOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrderNo, setSelectedOrderNo] = useState<string>('');
  
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', orderNo: '2025000001', customerName: 'Md Mehedi Hasan', address: '02 Matborer Pukurpar, East Kazipara', mobile: '01629359804', orderDate: '25/01/2025 [22:56:59]', payment: 'Cash On Delivery' },
    { id: '2', orderNo: '2025010219', customerName: 'Si Nirob', address: 'Vill. PATAL,PO:MONGOLBARI,P.S:D...', mobile: '01601496989', orderDate: '26/01/2025 [13:00:02]', payment: 'Cash On Delivery' },
    { id: '3', orderNo: '2025010220', customerName: 'Si Nirob', address: 'Vill. PATAL,PO:MONGOLBARI,P.S:D...', mobile: '01601496989', orderDate: '26/01/2025 [13:07:43]', payment: 'Cash On Delivery' },
    { id: '4', orderNo: '2025010221', customerName: 'Naiem Newaz', address: '16/ka, Tollabag, Sobhanbag, Dhanm...', mobile: '01978311202', orderDate: '08/02/2025 [23:53:48]', payment: 'Cash On Delivery' },
    { id: '5', orderNo: '2025010222', customerName: 'Naiem Newaz', address: '16/ka, Tollabag, Sobhanbag, Dhanm...', mobile: '01978311202', orderDate: '08/02/2025 [23:55:37]', payment: 'Cash On Delivery' },
    { id: '6', orderNo: '2025010223', customerName: 'Taibur Rahman', address: 'sripur,bijoynagar,brahmanbaria...', mobile: '01747047490', orderDate: '20/02/2025 [20:37:30]', payment: 'Cash On Delivery' },
  ]);

  const filteredOrders = orders.filter(order => 
    order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.payment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems: number = filteredOrders.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredOrders.slice(startIndex, endIndex);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page: number): void => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const viewOrder = (orderNo: string): void => {
    setSelectedOrderNo(orderNo);
    setIsModalOpen(true);
  };

  const handleApproveOrder = (orderNo: string): void => {
    // Here you would typically make an API call to approve the order
    console.log(`Order ${orderNo} approved`);
    setIsModalOpen(false);
    
    // Update order status in the UI as needed
    // For example, you might remove it from the pending orders list
    setOrders(orders.filter(order => order.orderNo !== orderNo));
  };

  const handleRejectOrder = (orderNo: string, reason: string): void => {
    // Here you would typically make an API call to reject the order
    console.log(`Order ${orderNo} rejected. Reason: ${reason}`);
    setIsModalOpen(false);
    
    // Update order status in the UI as needed
    setOrders(orders.filter(order => order.orderNo !== orderNo));
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full border shadow-sm">
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Online Orders</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>

          {/* Search */}
          <div className="flex justify-end items-center mb-4">
            <span className="mr-2 text-sm">Search</span>
            <Input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Product"
              className="max-w-xs h-9"
            />
          </div>

          {/* Orders table */}
          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium">View</TableHead>
                  <TableHead className="font-medium">Order No</TableHead>
                  <TableHead className="font-medium">Customer Name</TableHead>
                  <TableHead className="font-medium">Address</TableHead>
                  <TableHead className="font-medium">Mobile</TableHead>
                  <TableHead className="font-medium">Order Date</TableHead>
                  <TableHead className="font-medium">Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((order, index) => (
                    <TableRow key={order.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 text-green-600"
                          onClick={() => viewOrder(order.orderNo)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{order.orderNo}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.address}</TableCell>
                      <TableCell>{order.mobile}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.payment}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-64 hover:bg-white">
                    <TableCell colSpan={7} className="text-center text-gray-400">
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
                <ChevronFirst className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
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
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronLast className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <OrderDetailsModal
        orderNo={selectedOrderNo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApprove={handleApproveOrder}
        onReject={handleRejectOrder}
      />
    </div>
  );
};

export default OnlineOrders;