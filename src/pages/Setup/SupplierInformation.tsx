import React, { useState} from 'react';

// Define TypeScript interfaces
interface Supplier {
  id: number;
  name: string;
  type: string;
  contactPerson: string;
  address: string;
  phone: string;
  mobile: string;
  email: string;
  country: string;
  vatRegNo: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
}

const SupplierManagement: React.FC = () => {
  // State for form inputs
  const [formData, setFormData] = useState<Supplier>({
    id: 0,
    name: '',
    type: '',
    contactPerson: '',
    address: '',
    phone: '',
    mobile: '',
    email: '',
    country: '',
    vatRegNo: ''
  });
  
  // State for suppliers list
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: 'H.R Matal', type: '', contactPerson: 'Kiron', address: 'Copper', phone: '', mobile: '01711425529', email: '', country: '', vatRegNo: '' },
    { id: 2, name: 'Hazi PVC', type: '', contactPerson: '', address: '', phone: '', mobile: '01711972580', email: '', country: '', vatRegNo: '' },
    { id: 3, name: 'Faruk', type: '', contactPerson: '', address: 'Powder', phone: '', mobile: '01818351437', email: '', country: '', vatRegNo: '' },
    { id: 4, name: 'Forkan', type: '', contactPerson: '', address: 'Carton', phone: '', mobile: '01917038181', email: '', country: '', vatRegNo: '' },
    { id: 5, name: 'Vashani', type: '', contactPerson: '', address: 'Carton', phone: '', mobile: '01707392550', email: '', country: '', vatRegNo: '' },
    { id: 6, name: 'Abdul Batan', type: '', contactPerson: '', address: 'Striker', phone: '', mobile: '01960683143', email: '', country: '', vatRegNo: '' },
    { id: 7, name: 'Harvest', type: '', contactPerson: '', address: '', phone: '', mobile: '01677888888', email: '', country: '', vatRegNo: '' },
    { id: 8, name: 'Ami Corporation', type: '', contactPerson: 'Anub Babu', address: 'Agra bad, Chattogram', phone: '', mobile: '01766533445', email: '', country: '', vatRegNo: '' },
    { id: 9, name: 'Alamgir Kabir', type: '', contactPerson: '', address: '', phone: '', mobile: '01313447756', email: '', country: '', vatRegNo: '' },
    { id: 10, name: 'Ali Agam', type: '', contactPerson: '', address: '', phone: '', mobile: '01344556678', email: '', country: '', vatRegNo: '' },
  ]);
  
  // State for form visibility and editing
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [pageSize] = useState<number>(10);
  
  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Supplier name cannot be empty';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number cannot be empty';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (isEditing) {
      // Update existing supplier
      setSuppliers(prev => 
        prev.map(supplier => 
          supplier.id === formData.id ? formData : supplier
        )
      );
    } else {
      // Add new supplier
      const newSupplier = {
        ...formData,
        id: suppliers.length > 0 ? Math.max(...suppliers.map(s => s.id)) + 1 : 1
      };
      setSuppliers(prev => [...prev, newSupplier]);
    }
    
    // Reset form
    resetForm();
  };
  
  // Handle edit button click
  const handleEdit = (id: number) => {
    const supplierToEdit = suppliers.find(supplier => supplier.id === id);
    if (supplierToEdit) {
      setFormData(supplierToEdit);
      setIsEditing(true);
      setShowForm(true);
    }
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      id: 0,
      name: '',
      type: '',
      contactPerson: '',
      address: '',
      phone: '',
      mobile: '',
      email: '',
      country: '',
      vatRegNo: ''
    });
    setIsEditing(false);
    setShowForm(false);
    setErrors({});
  };
  
  // Handle cancel button click
  const handleCancel = () => {
    resetForm();
  };
  
  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (supplier.contactPerson && supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (supplier.address && supplier.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Calculate pagination
  const indexOfLastSupplier = currentPage * pageSize;
  const indexOfFirstSupplier = indexOfLastSupplier - pageSize;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);
  const totalPages = Math.ceil(filteredSuppliers.length / pageSize);
  
  // Handle pagination
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  // Add new supplier button handler
  const handleAddNewSupplier = () => {
    resetForm();
    setShowForm(true);
  };
  
  return (
    <div className="supplier-management p-4">
      {/* Form Section */}
      {showForm && (
        <div className="bg-white rounded shadow mb-6">
          <div className="bg-cyan-500 text-white px-4 py-2 flex justify-between items-center">
            <h2 className="text-lg font-medium">Supplier Information</h2>
            <div>
              <button 
                className="text-white" 
                onClick={handleCancel}
              >
                ✕
              </button>
              <button 
                className="text-white ml-4" 
                onClick={handleCancel}
              >
                ↗
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center">
                <label className="w-32 text-right mr-4">Supplier Name*</label>
                <div className="flex-1">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Can not be empty"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="w-32 text-right mr-4">Phone</label>
                <div className="flex-1">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Can be empty"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="w-32 text-right mr-4">Supplier Type</label>
                <div className="flex-1">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Supplier Type</option>
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Importer">Importer</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="w-32 text-right mr-4">Mobile*</label>
                <div className="flex-1">
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Can not be empty"
                  />
                  {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="w-32 text-right mr-4">Contact Person</label>
                <div className="flex-1">
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Can be empty"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="w-32 text-right mr-4">E-Mail</label>
                <div className="flex-1">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Can be empty"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="w-32 text-right mr-4">Address</label>
                <div className="flex-1">
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Can be empty"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="w-32 text-right mr-4">Country</label>
                <div className="flex-1">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Country</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="India">India</option>
                    <option value="China">China</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="w-32 text-right mr-4">VAT Reg.No</label>
                <div className="flex-1">
                  <input
                    type="text"
                    name="vatRegNo"
                    value={formData.vatRegNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Can be empty"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="bg-cyan-500 text-white px-4 py-2 rounded mr-2"
              >
                <span className="mr-1">💾</span> Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Search and Table Section */}
      <div className="bg-white rounded shadow">
        <div className="p-4 flex justify-end">
          <div className="flex items-center">
            <label className="mr-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded"
              placeholder="Search Supplier"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cyan-500 text-white">
                <th className="py-2 px-4 text-left">Edit</th>
                <th className="py-2 px-4 text-left">Supplier Name</th>
                <th className="py-2 px-4 text-left">Mobile</th>
                <th className="py-2 px-4 text-left">Contact Person</th>
                <th className="py-2 px-4 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {currentSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <button 
                      className="text-cyan-500 hover:text-cyan-700"
                      onClick={() => handleEdit(supplier.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-4">{supplier.name}</td>
                  <td className="py-2 px-4">{supplier.mobile}</td>
                  <td className="py-2 px-4">{supplier.contactPerson}</td>
                  <td className="py-2 px-4">{supplier.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <button
              className="bg-cyan-500 text-white px-4 py-2 rounded"
              onClick={handleAddNewSupplier}
            >
              Add New Supplier
            </button>
          </div>
          <div className="flex items-center">
            <button
              className="px-4 py-2 border border-gray-300 rounded-l"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 border-t border-b border-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 border border-gray-300 rounded-r"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;