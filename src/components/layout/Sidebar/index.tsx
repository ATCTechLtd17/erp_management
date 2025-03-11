import React, { useState } from 'react';
import { X } from 'lucide-react';
import * as Icons from 'lucide-react';
import MenuItem from './MenuItem';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      icon: Icons.LayoutDashboard,
      label: 'Dashboard',
      path: '/',
      subItems: [
        { label: 'Cheque Authorization', path: '/cheque-authorization' }
      ]
    },
    {
      id: 'setup',
      icon: Icons.Settings,
      label: 'Setup',
      subItems: [
        { label: 'Warehouse Information', path: '/setup/warehouse' },
        { label: 'Brand Information', path: '/setup/brand' },
        { label: 'Product Category', path: '/setup/product-category' },
        { label: 'Bank Information', path: '/setup/bank' },
        { label: 'Branch Information', path: '/setup/branch' },
        { label: 'Unit Information', path: '/setup/unit' },
        { label: 'Product Ordering', path: '/setup/product-ordering' },
        { label: 'Product Information', path: '/setup/product' },
        { label: 'Supplier Information', path: '/setup/supplier' },
        { label: 'Designation Information', path: '/setup/designation' },
        { label: 'Employee Information', path: '/setup/employee' },
        { label: 'Size Information', path: '/setup/size' },
        { label: 'Commission', path: '/setup/commission' }
      ]
    },
    {
      id: 'purchase',
      icon: Icons.ShoppingCart,
      label: 'Purchase',
      subItems: [
        { label: 'Purchase Information', path: '/purchase/information' },
        { label: 'Purchase Return', path: '/purchase/return' }
      ]
    },
    {
      id: 'sales',
      icon: Icons.Store,
      label: 'Sales',
      subItems: [
        { label: 'Sales', path: '/sales' },
        { label: 'Sales Return', path: '/sales/return' },
        { label: 'Order', path: '/sales/order' },
        { label: 'Delivery', path: '/sales/delivery' }
      ]
    },
    {
      id: 'adjustment',
      icon: Icons.ClipboardEdit,
      label: 'Adjustment',
      subItems: [
        { label: 'Adjustment Information', path: '/adjustment' }
      ]
    },
    {
      id: 'accounting',
      icon: Icons.Calculator,
      label: 'Accounting',
      subItems: [
        { label: 'Account Group', path: '/accounting/group' },
        { label: 'Account Head', path: '/accounting/head' },
        { label: 'Payment Received', path: '/accounting/payment' },
        { label: 'General Ledger', path: '/accounting/ledger' }
      ]
    },
    {
      id: 'security',
      icon: Icons.Shield,
      label: 'Security',
      subItems: [
        { label: 'User Permission', path: '/security/permissions' },
        { label: 'Create User', path: '/security/create-user' },
        { label: 'Remove Invoice', path: '/security/remove-invoice' }
      ]
    },
    {
      id: 'production',
      icon: Icons.Factory,
      label: 'Production',
      subItems: [
        { label: 'Product Recipe', path: '/production/recipe' },
        { label: 'Production', path: '/production/manage' },
        { label: 'Manual Consumption', path: '/production/consumption' }
      ]
    },
    {
      id: 'customer',
      icon: Icons.Users,
      label: 'Customer Information',
      subItems: [
        { label: 'Message', path: '/customer/message' },
        { label: 'Customer Information', path: '/customer/information' }
      ]
    },
    {
      id: 'warehouse',
      icon: Icons.Warehouse,
      label: 'Warehouse Send & Receive',
      subItems: [
        { label: 'Warehouse Send', path: '/warehouse/send' },
        { label: 'Warehouse Receive', path: '/warehouse/receive' },
        { label: 'Product Replacement', path: '/warehouse/replacement' }
      ]
    },
    {
      id: 'reporting',
      icon: Icons.FileText,
      label: 'Reporting',
      subItems: [
        { label: 'Purchase Reports', path: '/reports/purchase' },
        { label: 'Purchase Return Reports', path: '/reports/purchase-return' },
        { label: 'Sales Reports', path: '/reports/sales' },
        { label: 'Sales Return Reports', path: '/reports/sales-return' },
        { label: 'Inventory Reports', path: '/reports/inventory' },
        { label: 'Stock Report (Raw)', path: '/reports/stock-raw' },
        { label: 'Accounts Reports', path: '/reports/accounts' },
        { label: 'Adjustment Reports', path: '/reports/adjustment' },
        { label: 'Customer Reports', path: '/reports/customer' },
        { label: 'Employee Report', path: '/reports/employee' },
        { label: 'Supplier Report', path: '/reports/supplier' },
        { label: 'Send Warehouse', path: '/reports/send-warehouse' },
        { label: 'Receive Warehouse', path: '/reports/receive-warehouse' },
        { label: 'Product Information', path: '/reports/product' },
        { label: 'Authority Report', path: '/reports/authority' }
      ]
    },
    {
      id: 'replacement',
      icon: Icons.Replace,
      label: 'Product Replacement',
      subItems: [
        { label: 'Product Receive', path: '/replacement/receive' },
        { label: 'Send To Factory', path: '/replacement/send-factory' }
      ]
    }
  ];

  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b">
        <span className="text-xl font-semibold">Admin Panel</span>
        <button
          onClick={onClose}
          className="p-2 rounded-md lg:hidden hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              path={item.path}
              subItems={item.subItems}
              isOpen={openMenus.includes(item.id)}
              onToggle={() => toggleMenu(item.id)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;