import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, Maximize2, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

import { Checkbox } from '../../components/ui/checkbox';

interface MessageData {
  id: string;
  customerType: string;
  message: string;
  date: string;
  status: 'sent' | 'failed' | 'pending';
}

const MessageSend: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<Omit<MessageData, 'id' | 'date' | 'status'>>({
    customerType: '',
    message: ''
  });

  // UI state
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isCustomerTypeWise, setIsCustomerTypeWise] = useState<boolean>(false);
  const [messageHistory, setMessageHistory] = useState<MessageData[]>([
    { id: '1', customerType: 'Regular', message: 'Thank you for your recent purchase!', date: '2025-03-15', status: 'sent' },
    { id: '2', customerType: 'Premium', message: 'Exclusive offer for our premium customers!', date: '2025-03-14', status: 'sent' },
    { id: '3', customerType: 'Corporate', message: 'New products available for bulk orders', date: '2025-03-13', status: 'failed' }
  ]);

  const customerTypes = [
    'Regular',
    'Premium',
    'Corporate',
    'Wholesale',
    'Retail'
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string): void => {
    setFormData(prev => ({ ...prev, customerType: value }));
  };

  const toggleMaximize = (): void => {
    setIsMaximized(!isMaximized);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.customerType || !formData.message) {
      alert('Please fill all required fields');
      return;
    }
    
    // Create new message
    const newMessage: MessageData = {
      id: (messageHistory.length + 1).toString(),
      customerType: formData.customerType,
      message: formData.message,
      date: new Date().toISOString().split('T')[0],
      status: 'sent'
    };
    
    // Add to message history
    setMessageHistory([...messageHistory, newMessage]);
    
    // Reset form
    setFormData({
      customerType: '',
      message: ''
    });
    
    // Show success message
    alert('Message sent successfully!');
  };

  const handleReset = (): void => {
    setFormData({
      customerType: '',
      message: ''
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className={`w-full border shadow-sm ${isMaximized ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
        <CardHeader className="p-2 border-b bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Message Send</CardTitle>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-end">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="customerTypeWise" 
                  checked={isCustomerTypeWise}
                  onCheckedChange={(checked) => setIsCustomerTypeWise(checked as boolean)}
                />
                <label htmlFor="customerTypeWise">Customer Type Wise</label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-36 text-right pr-4">Customer Type<span className="text-red-500">*</span></label>
                <Select value={formData.customerType} onValueChange={handleSelectChange}>
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

              <div className="flex items-start">
                <label className="w-36 text-right pr-4 pt-2">Message<span className="text-red-500">*</span></label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Can not be empty"
                  className="flex-1 min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Send className="h-4 w-4 mr-2" /> Send
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageSend;