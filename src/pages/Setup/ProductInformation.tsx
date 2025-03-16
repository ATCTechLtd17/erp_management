import React, { useState } from 'react';

interface Product {
  id: string;
  productCode: string;
  productName: string;
  productType: string;
  costPrice: number;
  retailPrice: number;
  dealerPrice: number;
  wholePrice: number;
  series?: string;
  model?: string;
  pin?: string;
  motor?: string;
  unit?: string;
  brand?: string;
  category?: string;
  websitePublish: boolean;
  productImages: string[];
}

const ProductManagement: React.FC = () => {
  // State for the form inputs
  const [formData, setFormData] = useState<Partial<Product>>({
    productCode: '',
    productName: '',
    productType: '',
    brand: '',
    category: '',
    series: '',
    model: '',
    pin: '',
    motor: '',
    unit: '',
    costPrice: 0,
    retailPrice: 0,
    dealerPrice: 0,
    wholePrice: 0,
    websitePublish: false,
    productImages: [],
  });

  // State for the product list
  const [products, setProducts] = useState<Product[]>([
    { id: "1", productCode: "804", productName: "MTS- 804 -2p3m", productType: "Finish Goods", costPrice: 233, retailPrice: 365, dealerPrice: 305, wholePrice: 310, websitePublish: false, productImages: [] },
    { id: "2", productCode: "804", productName: "MTS- 804 -3p3m", productType: "Finish Goods", costPrice: 233, retailPrice: 365, dealerPrice: 305, wholePrice: 315, websitePublish: false, productImages: [] },
    { id: "3", productCode: "805", productName: "MTS- 805 -2p3m", productType: "Finish Goods", costPrice: 251, retailPrice: 425, dealerPrice: 325, wholePrice: 335, websitePublish: false, productImages: [] },
    { id: "4", productCode: "805", productName: "MTS- 805 -3p3m", productType: "Finish Goods", costPrice: 251, retailPrice: 425, dealerPrice: 325, wholePrice: 335, websitePublish: false, productImages: [] },
    { id: "5", productCode: "2030", productName: "MTS- 2030 -2p4m", productType: "Finish Goods", costPrice: 365, retailPrice: 610, dealerPrice: 700, wholePrice: 705, websitePublish: false, productImages: [] },
    { id: "6", productCode: "2030", productName: "MTS- 2030 -3p4m", productType: "Finish Goods", costPrice: 375, retailPrice: 610, dealerPrice: 700, wholePrice: 705, websitePublish: false, productImages: [] },
    { id: "7", productCode: "2040", productName: "MTS- 2040 -2p4m", productType: "Finish Goods", costPrice: 435, retailPrice: 860, dealerPrice: 750, wholePrice: 755, websitePublish: false, productImages: [] },
    { id: "8", productCode: "2040", productName: "MTS- 2040 -3p4m", productType: "Finish Goods", costPrice: 435, retailPrice: 860, dealerPrice: 750, wholePrice: 755, websitePublish: false, productImages: [] },
    { id: "9", productCode: "2050", productName: "MTS- 2050 -2p4m", productType: "Finish Goods", costPrice: 465, retailPrice: 925, dealerPrice: 800, wholePrice: 805, websitePublish: false, productImages: [] },
    { id: "10", productCode: "2050", productName: "MTS- 2050 -3p4m", productType: "Finish Goods", costPrice: 465, retailPrice: 925, dealerPrice: 800, wholePrice: 805, websitePublish: false, productImages: [] },
  ]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  // State for selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Editor state for the rich text editor
  const [editorContent, setEditorContent] = useState<string>('');

  // Options for dropdowns
  const productTypes = ['Select Product Type', 'Finish Goods', 'Raw Materials', 'Services'];
  const brands = ['Select Brand', 'MTS', 'Other'];
  const categories = ['Select Category', 'Motors', 'Pumps', 'Electronics'];
  const series = ['Select Series', 'Standard', 'Premium', 'Economy'];
  const models = ['Select Model', 'Base', 'Advanced', 'Pro'];
  const pins = ['Select Pin', 'Standard', 'Custom'];
  const motors = ['Select Motor', '2p3m', '3p3m', '2p4m', '3p4m'];
  const units = ['Select Unit', 'Piece', 'Set', 'Bundle'];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes('Price') ? parseFloat(value) : value,
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.productName || !formData.productType || !formData.brand || !formData.category) {
      alert('Please fill in all required fields.');
      return;
    }

    // Add the new product to the list
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      productCode: formData.productCode || '',
      productName: formData.productName || '',
      productType: formData.productType || '',
      costPrice: formData.costPrice || 0,
      retailPrice: formData.retailPrice || 0,
      dealerPrice: formData.dealerPrice || 0,
      wholePrice: formData.wholePrice || 0,
      websitePublish: formData.websitePublish || false,
      productImages: [],
      ...formData,
    };

    setProducts([...products, newProduct]);

    // Reset form
    setFormData({
      productCode: '',
      productName: '',
      productType: '',
      brand: '',
      category: '',
      series: '',
      model: '',
      pin: '',
      motor: '',
      unit: '',
      costPrice: 0,
      retailPrice: 0,
      dealerPrice: 0,
      wholePrice: 0,
      websitePublish: false,
      productImages: [],
    });
    setEditorContent('');
    setSelectedFile(null);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page changes
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Product Information Panel */}
      <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Product Information</h2>
        <div className="flex space-x-1">
          <button className="bg-transparent hover:bg-blue-600 px-2 py-1 rounded">−</button>
          <button className="bg-transparent hover:bg-blue-600 px-2 py-1 rounded">+</button>
        </div>
      </div>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow">
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Product Code</label>
              <input
                type="text"
                name="productCode"
                value={formData.productCode}
                onChange={handleInputChange}
                className="border p-1 w-full"
                placeholder="Can be empty"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Product Name*</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="border p-1 w-full"
                placeholder="Can not be empty"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Product Type*</label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              >
                {productTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Brand*</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              >
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Category*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Series*</label>
              <select
                name="series"
                value={formData.series}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              >
                {series.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Model*</label>
              <select
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              >
                {models.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Pin*</label>
              <select
                name="pin"
                value={formData.pin}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              >
                {pins.map((pin, index) => (
                  <option key={index} value={pin}>
                    {pin}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Motor*</label>
              <select
                name="motor"
                value={formData.motor}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              >
                {motors.map((motor, index) => (
                  <option key={index} value={motor}>
                    {motor}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Unit*</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="border p-1 w-full"
                required
              >
                {units.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Cost Price</label>
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleInputChange}
                className="border p-1 w-full"
                placeholder="0.00 BDT"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Regular M.R.P</label>
              <input
                type="number"
                name="retailPrice"
                value={formData.retailPrice}
                onChange={handleInputChange}
                className="border p-1 w-full"
                placeholder="0.00 BDT"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Dealer Price</label>
              <input
                type="number"
                name="dealerPrice"
                value={formData.dealerPrice}
                onChange={handleInputChange}
                className="border p-1 w-full"
                placeholder="0.00 BDT"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Whole Sale Price*</label>
              <input
                type="number"
                name="wholePrice"
                value={formData.wholePrice}
                onChange={handleInputChange}
                className="border p-1 w-full"
                placeholder="0.00 BDT"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-right pr-4">Website Publish</label>
              <input
                type="checkbox"
                name="websitePublish"
                checked={formData.websitePublish || false}
                onChange={handleCheckboxChange}
                className="ml-2"
              />
            </div>
          </div>
        </div>

        {/* Product Images Upload */}
        <div className="col-span-3 border-t pt-4 mt-4">
          <div className="flex items-center">
            <label className="w-32 text-right pr-4">Product Images</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-1"
              accept="image/*"
            />
            {selectedFile && <span className="ml-2">{selectedFile.name}</span>}
          </div>
        </div>

        {/* Description Editor */}
        <div className="col-span-3 mt-4">
          <div className="flex items-center">
            <label className="w-32 text-right pr-4">Description</label>
            <textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="border p-1 w-full h-32"
              placeholder="Product description..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-3 text-right mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Product
          </button>
        </div>
      </form>

      {/* Product List Table */}
      <div className="mt-8 p-4 bg-white shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 w-full"
          />
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2">Code</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Cost Price</th>
              <th className="border p-2">Retail Price</th>
              <th className="border p-2">Dealer Price</th>
              <th className="border p-2">Whole Price</th>
              <th className="border p-2">Published</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.productCode}</td>
                <td className="border p-2">{product.productName}</td>
                <td className="border p-2">{product.productType}</td>
                <td className="border p-2">{product.costPrice}</td>
                <td className="border p-2">{product.retailPrice}</td>
                <td className="border p-2">{product.dealerPrice}</td>
                <td className="border p-2">{product.wholePrice}</td>
                <td className="border p-2">
                  {product.websitePublish ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of{' '}
            {filteredProducts.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={firstPage}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              First
            </button>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={lastPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;