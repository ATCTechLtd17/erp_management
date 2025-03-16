import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save, Edit, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';



// Define types for bank data
interface Bank {
  id: string;
  name: string;
  note: string;
}

const BankInformation: React.FC = () => {
  // Form state management
  const [bankName, setBankName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isInputError, setIsInputError] = useState<boolean>(true);
  
  // Table state management
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  
  // Sample data
  const [banks, setBanks] = useState<Bank[]>([
    { id: '1', name: 'Uttara Bank Ltd', note: 'O' },
    { id: '2', name: 'United Commercial Bank Ltd', note: '' },
    { id: '3', name: 'Islami Bank Ltd', note: '' },
    { id: '4', name: 'Dutch Bangla Bank', note: '' },
    { id: '5', name: 'Brac Bank', note: '' },
    { id: '6', name: 'Janata Bank Ltd', note: '' }
  ]);

  // Filtered banks based on search term
  const filteredBanks = banks.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalItems: number = filteredBanks.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  
  // Get current page items
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredBanks.slice(startIndex, endIndex);
  
  // Handle bank name input change
  const handleBankNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setBankName(value);
    setIsInputError(value.trim() === '');
  };
  
  // Handle note input change
  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNote(e.target.value);
  };
  
  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (bankName.trim() === '') {
      setIsInputError(true);
      return;
    }
    
    const newBank: Bank = {
      id: (banks.length + 1).toString(),
      name: bankName,
      note: note
    };
    
    setBanks([...banks, newBank]);
    resetForm();
  };
  
  // Reset form
  const resetForm = (): void => {
    setBankName('');
    setNote('');
    setIsInputError(true);
  };
  
  // Handle edit bank
  const handleEdit = (bank: Bank): void => {
    setBankName(bank.name);
    setNote(bank.note);
    setIsInputError(false);
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
  
  // Handle pagination
  const goToPage = (page: number): void => {
    const validPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validPage);
  };
  
  // Toggle maximize
  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };
  
  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Bank Information</CardTitle>
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
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <label className="w-32 text-right pr-4 font-medium">Bank Name<span className="text-red-500">*</span></label>
                <Input
                  value={bankName}
                  onChange={handleBankNameChange}
                  placeholder="Can not be empty"
                  className={`flex-1 max-w-md ${isInputError ? 'bg-red-50' : ''}`}
                />
              </div>
              
              <div className="flex items-start">
                <label className="w-32 text-right pr-4 font-medium pt-2">Note</label>
                <textarea
                  value={note}
                  onChange={handleNoteChange}
                  placeholder="Note can be empty"
                  className="flex-1 max-w-md h-24 bg-red-50"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6 justify-center bg-gray-50 p-4">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
          
          <div className="flex justify-end items-center mb-4">
            <span className="mr-2 text-sm">Search</span>
            <Input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Bank"
              className="max-w-xs h-9"
            />
          </div>
          
          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium w-16">Edit</TableHead>
                  <TableHead className="font-medium">Bank Name</TableHead>
                  <TableHead className="font-medium">Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((bank, index) => (
                  <TableRow key={bank.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => handleEdit(bank)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>{bank.name}</TableCell>
                    <TableCell>{bank.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm bg-gray-100 p-2">
            <div>Total Items: {totalItems}</div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                Page Size:
                <Select value={pageSize} onValueChange={handlePageSizeChange}>
                  <SelectTrigger className="w-20 h-8 ml-2">
                    <SelectValue placeholder={pageSize} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Input
                  type="text"
                  className="w-12 h-8 mx-1 text-center"
                  value={currentPage}
                  readOnly
                />
                
                <span className="mx-1">/ {totalPages}</span>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0"
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
    </div>
  );
};

export default BankInformation;