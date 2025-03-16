/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, ChangeEvent } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';




// Define types for cheque data
interface Cheque {
  id: string;
  customer: string;
  bank: string;
  branch: string;
  accountNo: string;
  maturityDate: string;
  autho: string;
}

const ChequeAuthorization: React.FC = () => {
  // State management with proper types
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  
  // Sample data - replace with actual data in your implementation
  const [cheques, setCheques] = useState<Cheque[]>([]);
  const totalItems: number = cheques.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  
  // Handle pagination
  const goToPage = (page: number): void => {
    const validPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validPage);
  };
  
  // Handle search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };
  
  // Handle page size change
  const handlePageSizeChange = (value: string): void => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page when changing page size
  };
  
  // Toggle maximize
  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };
  
  // Handle page input change
  const handlePageInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const page = parseInt(value);
    if (!isNaN(page)) {
      goToPage(page);
    }
  };
  
  // Handle page input blur
  const handlePageInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const page = parseInt(e.target.value);
    if (isNaN(page)) {
      setCurrentPage(currentPage);
    }
  };
  
  return (
    <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
      <CardHeader className="p-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Cheque Authorization</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleMaximize} className="h-8 w-8 p-0 hover:bg-gray-100">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-end items-center mb-4">
          <span className="mr-2 text-sm">Search</span>
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="max-w-xs h-9"
          />
        </div>
        
        <div className="border rounded overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-medium">Customer</TableHead>
                <TableHead className="font-medium">Bank</TableHead>
                <TableHead className="font-medium">Branch</TableHead>
                <TableHead className="font-medium">Account No</TableHead>
                <TableHead className="font-medium">Maturity Date</TableHead>
                <TableHead className="font-medium">Autho</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cheques.length > 0 ? (
                cheques.map((cheque) => (
                  <TableRow key={cheque.id} className="hover:bg-gray-50">
                    <TableCell>{cheque.customer}</TableCell>
                    <TableCell>{cheque.bank}</TableCell>
                    <TableCell>{cheque.branch}</TableCell>
                    <TableCell>{cheque.accountNo}</TableCell>
                    <TableCell>{cheque.maturityDate}</TableCell>
                    <TableCell>{cheque.autho}</TableCell>
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
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <div>Total Items: {totalItems}</div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span>Page Size:</span>
              <Select value={pageSize} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="w-20 h-9">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 w-9 p-0"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 w-9 p-0"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Input
                type="text"
                className="w-12 h-9 mx-1 text-center"
                value={currentPage}
                onChange={handlePageInputChange}
                onBlur={handlePageInputBlur}
              />
              
              <span className="mx-1">/ {totalPages}</span>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 w-9 p-0"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 w-9 p-0"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChequeAuthorization;