import React, { useState } from 'react';

interface ProductItem {
  id: number;
  productName: string;
  quantity: number;
  remarks: string;
}

const ProductionAndConsumption: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([
    { id: 1, productName: 'MTS- 804 -2p/3m', quantity: 0, remarks: 'dfd' }
  ]);
  const [nextId, setNextId] = useState(2);
  const [currentProduct, setCurrentProduct] = useState({
    product: '',
    totalQty: 0,
    remarks: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'totalQty' ? parseFloat(value) || 0 : value
    });
  };

  const addToList = () => {
    if (!currentProduct.product) {
      return; // Basic validation
    }
    
    const newItem: ProductItem = {
      id: nextId,
      productName: currentProduct.product,
      quantity: currentProduct.totalQty,
      remarks: currentProduct.remarks
    };
    
    setProducts([...products, newItem]);
    setNextId(nextId + 1);
    resetForm();
  };

  const resetForm = () => {
    setCurrentProduct({
      product: '',
      totalQty: 0,
      remarks: ''
    });
  };

  const deleteItem = (id: number) => {
    setProducts(products.filter(item => item.id !== id));
  };

  const handleSave = () => {
    console.log('Saving products:', products);
    // Here you would typically send the data to an API
  };

  // Sample products for dropdown
  const productOptions = ["MTS- 804 -2p/3m", "MTS- 805 -4p/5m", "MTS- 806 -3p/4m"];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-cyan-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Production and Consumption</h1>
        <div className="flex gap-2">
          <button className="bg-white text-cyan-500 p-1 rounded">×</button>
          <button className="bg-white text-cyan-500 p-1 rounded">^</button>
        </div>
      </div>

      <div className="p-4 bg-white">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <label className="mr-2 w-24 text-right font-medium">Product<span className="text-red-500">*</span>:</label>
            <select 
              className="border p-2 w-64" 
              name="product"
              value={currentProduct.product}
              onChange={handleInputChange}
            >
              <option value="">Select Product</option>
              {productOptions.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2 w-24 text-right font-medium">Total Qty<span className="text-red-500">*</span>:</label>
            <input 
              type="number" 
              className="border p-2 w-64"
              name="totalQty"
              value={currentProduct.totalQty}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-start ml-auto">
            <label className="mr-2 font-medium">Remarks:</label>
            <textarea 
              className="border p-2 w-64 h-24 bg-gray-50"
              name="remarks"
              value={currentProduct.remarks}
              onChange={handleInputChange}
            ></textarea>
            <div className="relative">
              <div className="absolute bottom-2 right-2 text-red-500 bg-red-100 rounded-full w-6 h-6 flex items-center justify-center">
                !
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button 
            className="bg-cyan-500 text-white px-4 py-2 rounded flex items-center" 
            onClick={addToList}
          >
            <span className="mr-1">+</span> Add to List
          </button>
          <button 
            className="bg-gray-200 px-4 py-2 rounded" 
            onClick={resetForm}
          >
            Reset
          </button>
        </div>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr>
              <th className="bg-cyan-500 text-white border p-2 w-20">Edit</th>
              <th className="bg-cyan-500 text-white border p-2 w-20">Delete</th>
              <th className="bg-cyan-500 text-white border p-2">Product Name</th>
              <th className="bg-cyan-500 text-white border p-2 w-24">Quantity</th>
              <th className="bg-cyan-500 text-white border p-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {products.map(item => (
              <tr key={item.id}>
                <td className="border p-2 text-center">
                  <button className="border p-1">
                    <span role="img" aria-label="edit">🖋️</span>
                  </button>
                </td>
                <td className="border p-2 text-center">
                  <button className="border p-1" onClick={() => deleteItem(item.id)}>
                    <span role="img" aria-label="delete">🗑️</span>
                  </button>
                </td>
                <td className="border p-2">{item.productName}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-100 p-4 flex justify-start gap-2">
        <button 
          className="bg-cyan-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleSave}
        >
          <span className="mr-1">💾</span> Save
        </button>
        <button className="bg-white border px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductionAndConsumption;