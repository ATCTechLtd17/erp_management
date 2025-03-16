import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';

interface OrderItem {
  productName: string;
  qty: number;
  stock: number;
  selected: boolean;
}

interface OrderDetailsProps {
  orderNo: string;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (orderNo: string) => void;
  onReject: (orderNo: string, reason: string) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsProps> = ({
  orderNo,
  isOpen,
  onClose,
  onApprove,
  onReject
}) => {
  const [items, setItems] = useState<OrderItem[]>([
    { productName: 'MTS- 308 =3m', qty: 1, stock: 110, selected: false }
  ]);
  
  const [disapproveCause, setDisapproveCause] = useState<string>('');
  const [selectAll, setSelectAll] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setItems(items.map(item => ({ ...item, selected: newSelectAll })));
  };

  const handleItemSelect = (index: number) => {
    const newItems = [...items];
    newItems[index].selected = !newItems[index].selected;
    setItems(newItems);
    
    // Update selectAll state based on whether all items are selected
    setSelectAll(newItems.every(item => item.selected));
  };

  const handleApprove = () => {
    onApprove(orderNo);
  };

  const handleReject = () => {
    if (!disapproveCause.trim()) {
      alert('Disapprove cause can\'t be empty');
      return;
    }
    onReject(orderNo, disapproveCause);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-2 bg-blue-500 text-white">
          <h2 className="text-lg font-medium">Order Details</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose} 
            className="h-8 w-8 p-0 hover:bg-blue-400 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex p-4">
          {/* Left side - Products table */}
          <div className="w-7/12 pr-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border p-2 text-left">Product Name</th>
                  <th className="border p-2 w-16 text-center">Qty</th>
                  <th className="border p-2 w-16 text-center">Stock</th>
                  <th className="border p-2 w-16 text-center">
                    <div className="flex justify-center">
                      <span className="mr-1">Select</span>
                      <Checkbox
                        checked={selectAll} 
                        onCheckedChange={handleSelectAll}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="border p-2">{item.productName}</td>
                    <td className="border p-2 text-center">{item.qty}</td>
                    <td className="border p-2 text-center">{item.stock}</td>
                    <td className="border p-2">
                      <div className="flex justify-center">
                        <Checkbox 
                          checked={item.selected}
                          onCheckedChange={() => handleItemSelect(index)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-center space-x-2">
              <Button 
                onClick={handleApprove}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" /> Approve
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
          
          {/* Right side - Order details */}
          <div className="w-5/12 pl-4">
            <div className="mb-4">
              <label className="block mb-1 font-medium">Order No</label>
              <Input 
                value={orderNo} 
                readOnly 
                className="w-full bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Disapprove Cause</label>
              <textarea 
                value={disapproveCause}
                onChange={(e) => setDisapproveCause(e.target.value)}
                placeholder="Disapprove cause can't be empty"
                className="w-full h-32"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                onClick={handleReject}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <X className="h-4 w-4 mr-2" /> Reject
              </Button>
              <Button 
                variant="outline" 
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;