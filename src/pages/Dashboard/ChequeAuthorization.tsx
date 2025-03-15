import React from 'react';


import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Maximize2, Table } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

const ChequeAuthorization: React.FC = () => {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between bg-blue-500 text-white p-2">
          <CardTitle className="text-lg font-normal">Cheque Authorization</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-white hover:bg-blue-600">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-white hover:bg-blue-600">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex justify-end items-center mb-2">
          <span className="mr-2">Search</span>
          <Input
            placeholder="Search..."
            className="max-w-xs h-8"
          />
        </div>
        
        <div className="border rounded-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                <TableHead className="font-medium border-r">Customer</TableHead>
                <TableHead className="font-medium border-r">Bank</TableHead>
                <TableHead className="font-medium border-r">Branch</TableHead>
                <TableHead className="font-medium border-r">Account No</TableHead>
                <TableHead className="font-medium border-r">Maturity Date</TableHead>
                <TableHead className="font-medium">Autho</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Empty table rows would go here */}
              <TableRow className="h-64 border-b hover:bg-gray-50">
                <TableCell colSpan={6} className="text-center text-gray-400">
                  No data available
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-sm">
          <div>Total Items: 0</div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span>Page Size:</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-20 h-8">
                  <SelectValue />
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
              <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Input
                type="text"
                className="w-12 h-8 mx-1 text-center"
                value="1"
              />
              
              <span className="mx-1">/ 1</span>
              
              <Button variant="outline" size="icon" className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 p-0">
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