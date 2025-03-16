import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface Size {
  id: string;
  sizeName: string;
  remarks?: string;
}

const SizeInformation: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Size, 'id'>>({
    sizeName: '',
    remarks: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const [sizes, setSizes] = useState<Size[]>([
    { id: '1', sizeName: '2p' },
    { id: '2', sizeName: '3p' },
    { id: '3', sizeName: 'Others' }
  ]);

  const filteredSizes = sizes.filter(size => 
    size.sizeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (size.remarks && size.remarks.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalItems: number = filteredSizes.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredSizes.slice(startIndex, endIndex);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newSize: Size = {
      id: (sizes.length + 1).toString(),
      ...formData
    };
    
    setSizes([...sizes, newSize]);
    setFormData({
      sizeName: '',
      remarks: ''
    });
  };

  const handleCancel = (): void => {
    setFormData({
      sizeName: '',
      remarks: ''
    });
  };

  const handleEdit = (size: Size): void => {
    setFormData({
      sizeName: size.sizeName,
      remarks: size.remarks || ''
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };

  // Pagination function
  const goToPage = (page: number): void => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Size Information</CardTitle>
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
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
            {/* Form fields */}
            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Size/Model <span className="text-red-500">*</span></label>
              <Input
                name="sizeName"
                value={formData.sizeName}
                onChange={handleInputChange}
                placeholder="Can not be empty"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Can be empty"
                className="flex-1 rounded-md border border-input p-2"
                rows={3}
              />
            </div>

            {/* Form buttons */}
            <div className="flex gap-2 mt-4 justify-center">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>

          {/* Search and table */}
          <div className="flex justify-end items-center mt-6 mb-4">
            <span className="mr-2 text-sm">Search</span>
            <Input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="search size name"
              className="max-w-xs h-9"
            />
          </div>

          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium">Edit</TableHead>
                  <TableHead className="font-medium">Size Name</TableHead>
                  <TableHead className="font-medium">Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((size, index) => (
                    <TableRow key={size.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleEdit(size)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{size.sizeName}</TableCell>
                      <TableCell>{size.remarks || ''}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-64 hover:bg-white">
                    <TableCell colSpan={3} className="text-center text-gray-400">
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
                <span>«</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <span>‹</span>
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
                <span>›</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <span>»</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SizeInformation;