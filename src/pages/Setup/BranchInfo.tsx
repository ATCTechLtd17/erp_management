import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';


interface Branch {
  id: string;
  branchName: string;
  bankName: string;
  address: string;
  accountNo: string;
  mobile?: string;
  email?: string;
  remarks?: string;
}

const BranchInformation: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Branch, 'id'>>({
    branchName: '',
    bankName: '',
    address: '',
    accountNo: '',
    mobile: '',
    email: '',
    remarks: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const [branches, setBranches] = useState<Branch[]>([
    { id: '1', branchName: 'M/S Sharif Traders', bankName: 'Uttara Bank Ltd', address: 'Nawabpur, Dhaka', accountNo: 'CC-63000031147' },
    { id: '2', branchName: 'M/S Sharif Traders', bankName: 'United Commercial Bank Ltd', address: 'Nawabpur, Dhaka', accountNo: '282101000005392' },
    { id: '3', branchName: 'A To Z', bankName: 'Dutch Bangla Bank', address: 'Nawabpur, Dhaka', accountNo: '104110021818' },
    { id: '4', branchName: 'M/S Sharif Traders(47114)', bankName: 'Islami Bank Ltd', address: 'Nawabpur, Dhaka', accountNo: '20501180100547114' },
    { id: '5', branchName: 'M/S Sharif Traders(58071002)', bankName: 'Brac Bank', address: 'Nawabpur, Dhaka', accountNo: '1502200258071002' },
    { id: '6', branchName: 'M/S Sharif Traders(2806)', bankName: 'Uttara Bank Ltd', address: 'Nawabpur,Dhaka', accountNo: '12200212806' },
    { id: '7', branchName: 'M/S Sharif Traders(8929)', bankName: 'Janata Bank Ltd', address: 'Nawabpur,Dhaka', accountNo: '53910110189299' },
    { id: '8', branchName: 'Sharif Electrical Industrial Co.', bankName: 'Uttara Bank Ltd', address: 'Nawabpur Dhaka', accountNo: '12200214610' },
    { id: '9', branchName: 'Riad International', bankName: 'Uttara Bank Ltd', address: 'Nawabpur,Dhaka', accountNo: '12200214222' },
    { id: '10', branchName: 'Yeasmeen Khaton', bankName: 'Uttara Bank Ltd', address: 'Nawabpur, Dhaka', accountNo: '12100214083' }
  ]);

  const banks = [
    'Uttara Bank Ltd',
    'United Commercial Bank Ltd',
    'Dutch Bangla Bank',
    'Islami Bank Ltd',
    'Brac Bank',
    'Janata Bank Ltd'
  ];

  const filteredBranches = branches.filter(branch => 
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.accountNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems: number = filteredBranches.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredBranches.slice(startIndex, endIndex);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newBranch: Branch = {
      id: (branches.length + 1).toString(),
      ...formData
    };
    
    setBranches([...branches, newBranch]);
    setFormData({
      branchName: '',
      bankName: '',
      address: '',
      accountNo: '',
      mobile: '',
      email: '',
      remarks: ''
    });
  };

  const handleCancel = (): void => {
    setFormData({
      branchName: '',
      bankName: '',
      address: '',
      accountNo: '',
      mobile: '',
      email: '',
      remarks: ''
    });
  };

  const handleEdit = (branch: Branch): void => {
    setFormData({
      branchName: branch.branchName,
      bankName: branch.bankName,
      address: branch.address,
      accountNo: branch.accountNo,
      mobile: branch.mobile || '',
      email: branch.email || '',
      remarks: branch.remarks || ''
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (value: string): void => {
    setFormData(prev => ({ ...prev, bankName: value }));
  };

  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };

  // Added pagination function
  const goToPage = (page: number): void => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Branch Information</CardTitle>
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
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
            {/* Form fields */}
            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Bank <span className="text-red-500">*</span></label>
              <Select value={formData.bankName} onValueChange={handleSelectChange}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank, index) => (
                    <SelectItem key={index} value={bank}>{bank}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Mobile</label>
              <Input
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Can be empty"
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Branch Name <span className="text-red-500">*</span></label>
              <Input
                name="branchName"
                value={formData.branchName}
                onChange={handleInputChange}
                placeholder="Can not be empty"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-right pr-4">E-Mail</label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="abc@gmail.com"
                type="email"
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Address</label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Can be empty"
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-24 text-right pr-4">Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Can be empty"
                className="flex-1"
                rows={3}
              />
            </div>

            <div className="flex items-center">
              <label className="w-36 text-right pr-4">Account No <span className="text-red-500">*</span></label>
              <Input
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
                placeholder="Can be empty"
                className="flex-1"
              />
            </div>

            <div className="flex-1"></div>

            {/* Form buttons moved inside form */}
            <div className="flex gap-2 mt-4 justify-center col-span-2">
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
              placeholder="Search Branch"
              className="max-w-xs h-9"
            />
          </div>

          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
                  <TableHead className="font-medium">Edit</TableHead>
                  <TableHead className="font-medium">Branch Name</TableHead>
                  <TableHead className="font-medium">Bank Name</TableHead>
                  <TableHead className="font-medium">Address</TableHead>
                  <TableHead className="font-medium">AccountNo</TableHead>
                  <TableHead className="font-medium">Mobile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((branch, index) => (
                    <TableRow key={branch.id} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleEdit(branch)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>{branch.branchName}</TableCell>
                      <TableCell>{branch.bankName}</TableCell>
                      <TableCell>{branch.address}</TableCell>
                      <TableCell>{branch.accountNo}</TableCell>
                      <TableCell>{branch.mobile || ''}</TableCell>
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

export default BranchInformation;