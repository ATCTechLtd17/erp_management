import React, { useState } from 'react';

interface MaterialItem {
  id: number;
  productType: string;
  product: string;
  quantity: number;
  costPrice: number;
}

const ProductManufactureMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [nextId, setNextId] = useState(1);
  const [currentItem, setCurrentItem] = useState<Omit<MaterialItem, 'id'>>({
    productType: '',
    product: '',
    quantity: 0,
    costPrice: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: name === 'quantity' || name === 'costPrice' ? parseFloat(value) || 0 : value
    });
  };

  const addToList = () => {
    if (!currentItem.productType || !currentItem.product || currentItem.quantity <= 0) {
      return; // Basic validation
    }
    
    const newItem = { ...currentItem, id: nextId };
    setMaterials([...materials, newItem]);
    setNextId(nextId + 1);
    resetForm();
  };

  const resetForm = () => {
    setCurrentItem({
      productType: '',
      product: '',
      quantity: 0,
      costPrice: 0
    });
  };

  const deleteItem = (id: number) => {
    setMaterials(materials.filter(item => item.id !== id));
  };

  const handleSave = () => {
    console.log('Saving materials:', materials);
    // Here you would typically send the data to an API
  };

  // Sample options for dropdowns
  const productTypes = ["Raw Material", "Component", "Packaging"];
  const products = ["Aluminum", "Steel", "Plastic", "Glass", "Cardboard"];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-cyan-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Product Manufacture Materials</h1>
        <div className="flex gap-2">
          <button className="bg-white text-cyan-500 p-1 rounded">×</button>
          <button className="bg-white text-cyan-500 p-1 rounded">^</button>
        </div>
      </div>

      <div className="p-4 border-b">
        <div className="flex gap-4 mb-4">
          <div className="flex items-center">
            <label className="mr-2 font-medium">Prod Type<span className="text-red-500">*</span>:</label>
            <select className="border p-2 w-64" defaultValue="">
              <option value="">Select Type</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2 font-medium">Product<span className="text-red-500">*</span>:</label>
            <select className="border p-2 w-64" defaultValue="">
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center">
            <label className="mr-2 w-28 text-right font-medium">Prod Type<span className="text-red-500">*</span>:</label>
            <select 
              className="border p-2 w-64" 
              name="productType"
              value={currentItem.productType}
              onChange={handleInputChange}
            >
              <option value="">Select Type</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2 w-28 text-right font-medium">Product<span className="text-red-500">*</span>:</label>
            <select 
              className="border p-2 w-64" 
              name="product"
              value={currentItem.product}
              onChange={handleInputChange}
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2 w-28 text-right font-medium">Quantity<span className="text-red-500">*</span>:</label>
            <input 
              type="number" 
              className="border p-2 w-64" 
              name="quantity"
              value={currentItem.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2 w-28 text-right font-medium">Cost Price:</label>
            <input 
              type="number" 
              className="border p-2 w-64" 
              name="costPrice"
              value={currentItem.costPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex gap-2 ml-32">
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
      </div>

      <div className="p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-cyan-500 text-white">
              <th className="border p-2 w-24">Edit</th>
              <th className="border p-2 w-24">Delete</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Cost Price</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(item => (
              <tr key={item.id}>
                <td className="border p-2 text-center">
                  <button className="text-blue-500">Edit</button>
                </td>
                <td className="border p-2 text-center">
                  <button className="text-red-500" onClick={() => deleteItem(item.id)}>Delete</button>
                </td>
                <td className="border p-2">{item.product}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.costPrice}</td>
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

export default ProductManufactureMaterials;