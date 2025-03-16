import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Save, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface Customer {
  id: string;
  customerName: string;
  customerType: string;
  division: string;
  district: string;
  thana: string;
  contactPerson?: string;
  mobile: string;
  phone?: string;
  email?: string;
  address: string;
  commission?: string;
  creditLimit?: string;
  billingAddress?: string;
}

const CustomerInformation: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Customer, 'id'>>({
    customerName: '',
    customerType: '',
    division: '',
    district: '',
    thana: '',
    contactPerson: '',
    mobile: '',
    phone: '',
    email: '',
    address: '',
    commission: '',
    creditLimit: '',
    billingAddress: ''
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: '1', customerName: 'Acme Corporation', customerType: 'Corporate', division: 'Dhaka', district: 'Dhaka', thana: 'Gulshan', mobile: '01712345678', address: 'Gulshan Avenue, Dhaka', billingAddress: 'Gulshan-1, Dhaka' },
    { id: '2', customerName: 'Globex Industries', customerType: 'Corporate', division: 'Dhaka', district: 'Dhaka', thana: 'Banani', mobile: '01812345678', address: 'Banani Road, Dhaka', billingAddress: 'Banani DOHS, Dhaka' },
    { id: '3', customerName: 'Monolith Partners', customerType: 'Corporate', division: 'Dhaka', district: 'Dhaka', thana: 'Uttara', mobile: '01912345678', address: 'Sector 4, Uttara, Dhaka', billingAddress: 'Uttara Sector 7, Dhaka' },
    { id: '4', customerName: 'Quick Retail', customerType: 'Retail', division: 'Dhaka', district: 'Gazipur', thana: 'Gazipur Sadar', mobile: '01612345678', address: 'Gazipur Sadar, Gazipur', billingAddress: 'Gazipur City Center' },
    { id: '5', customerName: 'Sunshine Distributors', customerType: 'Distributor', division: 'Dhaka', district: 'Narayanganj', thana: 'Narayanganj Sadar', mobile: '01512345678', address: 'Narayanganj Sadar', billingAddress: 'Central Road, Narayanganj' },
    { id: '6', customerName: 'Eastern Traders', customerType: 'Wholesale', division: 'Chattogram', district: 'Chattogram', thana: 'Kotwali', mobile: '01812345679', address: 'Kotwali, Chattogram', billingAddress: 'Station Road, Chattogram' },
    { id: '7', customerName: 'ABC Electronics', customerType: 'Retail', division: 'Dhaka', district: 'Dhaka', thana: 'Mirpur', mobile: '01712345680', address: 'Mirpur-10, Dhaka', billingAddress: 'Mirpur-10 Circle, Dhaka' },
    { id: '8', customerName: 'Rahman Traders', customerType: 'Wholesale', division: 'Rajshahi', district: 'Rajshahi', thana: 'Boalia', mobile: '01912345681', address: 'Boalia, Rajshahi', billingAddress: 'New Market, Rajshahi' },
    { id: '9', customerName: 'Star Enterprise', customerType: 'Corporate', division: 'Khulna', district: 'Khulna', thana: 'Sonadanga', mobile: '01812345682', address: 'Sonadanga, Khulna', billingAddress: 'KDA Avenue, Khulna' },
    { id: '10', customerName: 'Northern Supplies', customerType: 'Distributor', division: 'Rangpur', district: 'Rangpur', thana: 'Rangpur Sadar', mobile: '01712345683', address: 'Rangpur Sadar', billingAddress: 'Station Road, Rangpur' }
  ]);

  const customerTypes = [
    'Corporate',
    'Retail',
    'Wholesale',
    'Distributor'
  ];

  const divisions = [
    'Dhaka',
    'Chattogram',
    'Rajshahi',
    'Khulna',
    'Barishal',
    'Sylhet',
    'Rangpur',
    'Mymensingh'
  ];

  const districts: { [key: string]: string[] } = {
    'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail'],
    'Chattogram': ['Chattogram', 'Cox\'s Bazar', 'Comilla', 'Noakhali'],
    'Rajshahi': ['Rajshahi', 'Bogura', 'Pabna', 'Sirajganj'],
    'Khulna': ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat'],
    // Add other divisions and their districts as needed
  };

  const thanas: { [key: string]: string[] } = {
    'Dhaka': ['Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Dhanmondi', 'Mohammadpur'],
    'Gazipur': ['Gazipur Sadar', 'Kaliakair', 'Kaliganj', 'Kapasia'],
    'Chattogram': ['Kotwali', 'Patenga', 'Halishahar', 'Chandgaon'],
    // Add other districts and their thanas as needed
  };

  const filteredCustomers = customers.filter(customer =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customerType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.mobile.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems: number = filteredCustomers.length;
  const totalPages: number = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const currentItems = filteredCustomers.slice(startIndex, endIndex);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newCustomer: Customer = {
      id: (customers.length + 1).toString(),
      ...formData
    };
    
    setCustomers([...customers, newCustomer]);
    setFormData({
      customerName: '',
      customerType: '',
      division: '',
      district: '',
      thana: '',
      contactPerson: '',
      mobile: '',
      phone: '',
      email: '',
      address: '',
      commission: '',
      creditLimit: '',
      billingAddress: ''
    });
  };

  const handleCancel = (): void => {
    setFormData({
      customerName: '',
      customerType: '',
      division: '',
      district: '',
      thana: '',
      contactPerson: '',
      mobile: '',
      phone: '',
      email: '',
      address: '',
      commission: '',
      creditLimit: '',
      billingAddress: ''
    });
  };

  const handleEdit = (customer: Customer): void => {
    setFormData({
      customerName: customer.customerName,
      customerType: customer.customerType,
      division: customer.division,
      district: customer.district,
      thana: customer.thana,
      contactPerson: customer.contactPerson || '',
      mobile: customer.mobile,
      phone: customer.phone || '',
      email: customer.email || '',
      address: customer.address,
      commission: customer.commission || '',
      creditLimit: customer.creditLimit || '',
      billingAddress: customer.billingAddress || ''
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormData(prev => ({ ...prev, [name]: value }));
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
            <CardTitle className="text-lg font-medium">Customer Information</CardTitle>
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
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 mb-6">
            {/* Form fields */}
            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Customer Type <span className="text-red-500">*</span></label>
              <Select value={formData.customerType} onValueChange={(value) => handleSelectChange('customerType', value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Customer Type" />
                </SelectTrigger>
                <SelectContent>
                  {customerTypes.map((type, index) => (
                    <SelectItem key={index} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Customer <span className="text-red-500">*</span></label>
              <Input
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Can not be empty"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Phone</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Can be empty"
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Division <span className="text-red-500">*</span></label>
              <Select value={formData.division} onValueChange={(value) => handleSelectChange('division', value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Division" />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((division, index) => (
                    <SelectItem key={index} value={division}>{division}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Contact Person</label>
              <Input
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                placeholder="Can be empty"
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Commission %</label>
              <Input
                name="commission"
                value={formData.commission}
                onChange={handleInputChange}
                placeholder="Can be empty"
                type="number"
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">District <span className="text-red-500">*</span></label>
              <Select 
                value={formData.district} 
                onValueChange={(value) => handleSelectChange('district', value)}
                disabled={!formData.division}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {formData.division && districts[formData.division]?.map((district, index) => (
                    <SelectItem key={index} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Mobile <span className="text-red-500">*</span></label>
              <Input
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Can not be empty"
                required
                className="flex-1"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Email</label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Can be empty"
                type="email"
                className="flex-1"
                />
              </div>
  
              <div className="flex items-center">
                <label className="w-32 text-right pr-4">Thana <span className="text-red-500">*</span></label>
                <Select 
                  value={formData.thana} 
                  onValueChange={(value) => handleSelectChange('thana', value)}
                  disabled={!formData.district}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select Thana" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.district && thanas[formData.district]?.map((thana, index) => (
                      <SelectItem key={index} value={thana}>{thana}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
  
              <div className="flex items-center">
                <label className="w-32 text-right pr-4">Credit Limit</label>
                <Input
                  name="creditLimit"
                  value={formData.creditLimit}
                  onChange={handleInputChange}
                  placeholder="Can be empty"
                  type="number"
                  className="flex-1"
                />
              </div>
  
              <div className="flex items-center col-span-3">
                <label className="w-32 text-right pr-4">Address <span className="text-red-500">*</span></label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Can not be empty"
                  required
                  className="flex-1"
                />
              </div>
  
              <div className="flex items-center col-span-3">
                <label className="w-32 text-right pr-4">Billing Address</label>
                <Input
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  placeholder="Can be empty"
                  className="flex-1"
                />
              </div>
  
              <div className="col-span-3 flex justify-end gap-2 mt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button type="submit" variant="default" className="bg-blue-500 hover:bg-blue-600">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </form>
  
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-64"
                  />
                  <Select value={pageSize} onValueChange={setPageSize}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Page Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 per page</SelectItem>
                      <SelectItem value="10">10 per page</SelectItem>
                      <SelectItem value="20">20 per page</SelectItem>
                      <SelectItem value="50">50 per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
  
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.customerName}</TableCell>
                        <TableCell>{customer.customerType}</TableCell>
                        <TableCell>{customer.district}, {customer.division}</TableCell>
                        <TableCell>{customer.mobile}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(customer)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
  
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page)}
                      className={currentPage === page ? "bg-blue-500 hover:bg-blue-600" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default CustomerInformation;