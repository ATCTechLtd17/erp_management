import React, { useState, useEffect } from 'react';

// Define types for our component
interface User {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
}

interface MenuPermission {
  menuId: string;
  selected: boolean;
}

interface UserPermissionProps {
  onSave: (userId: string, email: string, permissions: MenuPermission[]) => void;
  onCancel: () => void;
  onClose?: () => void;
  availableUsers?: User[];
  availableMenus?: MenuItem[];
}

const UserPermission: React.FC<UserPermissionProps> = ({
  onSave,
  onCancel,
  onClose,
  availableUsers = [],
  availableMenus = []
}) => {
  // State for form
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [menuPermissions, setMenuPermissions] = useState<MenuPermission[]>([]);
  const [emailError, setEmailError] = useState<string>('');

  // Initialize menu permissions based on available menus
  useEffect(() => {
    setMenuPermissions(
      availableMenus.map(menu => ({
        menuId: menu.id,
        selected: false
      }))
    );
  }, [availableMenus]);

  // Email validation
  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError('Email cannot be empty');
      return false;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email);
    setEmailError(isValid ? '' : 'Email must be valid');
    return isValid;
  };

  // Handle permission toggling
  const togglePermission = (menuId: string) => {
    setMenuPermissions(prevPermissions =>
      prevPermissions.map(perm =>
        perm.menuId === menuId ? { ...perm, selected: !perm.selected } : perm
      )
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateEmail(email) && selectedUserId) {
      onSave(selectedUserId, email, menuPermissions);
    } else if (!selectedUserId) {
      // Add validation for user selection
      alert('Please select a user');
    }
  };

  // Handle close button
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      onCancel();
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">User Permission</h2>
        <div>
          <button className="mr-2 text-lg" onClick={handleClose}>&times;</button>
          <button className="text-lg" onClick={handleClose}>&times;</button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <label className="col-span-1 text-right pt-2">User Name</label>
          <div className="col-span-2">
            <select
              className="w-full p-2 border rounded"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select User Name</option>
              {availableUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <label className="col-span-1 text-right pt-2">Email</label>
          <div className="col-span-2">
            <input
              type="email"
              className={`w-full p-2 border rounded ${emailError ? 'border-red-500' : ''}`}
              placeholder="Email can't be empty"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <label className="col-span-1 text-right pt-2">Menu</label>
          <div className="col-span-2">
            <select
              className="w-full p-2 border rounded"
              value={selectedMenu}
              onChange={(e) => setSelectedMenu(e.target.value)}
            >
              <option value="">Select Menu</option>
              {availableMenus.map(menu => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            onClick={handleSubmit}
          >
            <span className="mr-2">✓</span> Permission
          </button>
          <button
            className="border border-gray-300 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="px-6 pb-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-blue-500 text-white">Menu Name</th>
              <th className="border border-gray-300 p-2 bg-blue-500 text-white">Select</th>
            </tr>
          </thead>
          <tbody>
            {availableMenus.map(menu => (
              <tr key={menu.id}>
                <td className="border border-gray-300 p-2">{menu.name}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="checkbox"
                    checked={menuPermissions.find(p => p.menuId === menu.id)?.selected || false}
                    onChange={() => togglePermission(menu.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPermission;