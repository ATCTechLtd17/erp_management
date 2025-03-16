/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { X, Save, ChevronUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';


const UnitInformation = () => {
  const [unitName, setUnitName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10');

  const [units, setUnits] = useState([
    { id: '1', name: 'Pcs' },
    { id: '2', name: 'Kg' },
  ]);
//@ts-ignore
  const handleUnitNameChange = (e) => {
    setUnitName(e.target.value);
  };
//@ts-ignore
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSave = () => {
    if (unitName.trim()) {
      const newUnit = {
        id: (units.length + 1).toString(),
        name: unitName
      };
      setUnits([...units, newUnit]);
      setUnitName('');
    }
  };

  const handleCancel = () => {
    setUnitName('');
  };

  const filteredUnits = units.filter(unit => 
    unit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredUnits.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredUnits.slice(startIndex, endIndex);
//@ts-ignore
  const goToPage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader className="p-2 border-b bg-blue-500 text-white flex items-center justify-between">
        <h2 className="text-lg font-medium">Unit Information</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-400 text-white">
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-400 text-white">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-6">
          {/* Form Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Unit Name<span className="text-red-500">*</span></label>
              <Input
                value={unitName}
                onChange={handleUnitNameChange}
                placeholder="Can not be empty"
                className="flex-1"
                required
              />
            </div>
            
            <div className="flex items-center justify-start mt-4 ml-24">
              <Button 
                type="button" 
                onClick={handleSave} 
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                className="ml-2"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Search and Table Section */}
          <div className="flex flex-col space-y-4 mt-6">
            <div className="flex justify-end items-center">
              <span className="mr-2 text-sm">Search</span>
              <Input
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Unit Name"
                className="max-w-xs"
              />
            </div>
            
            <div className="border rounded overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                    <TableHead className="font-medium w-20">Edit</TableHead>
                    <TableHead className="font-medium">Unit Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length > 0 ? (
                    currentItems.map((unit, index) => (
                      <TableRow key={unit.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                          >
                            <img 
                              src="/api/placeholder/16/16" 
                              alt="edit" 
                              className="h-4 w-4" 
                            />
                          </Button>
                        </TableCell>
                        <TableCell>{unit.name}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="h-16 hover:bg-white">
                      <TableCell colSpan={2} className="text-center text-gray-400">
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
                  <ChevronsLeft className="h-4 w-4" />
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
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitInformation;