import React from 'react';
import { ChevronDown, ChevronRight, DivideIcon as LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SubMenuItem {
  label: string;
  path: string;
}

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  path?: string;
  subItems?: SubMenuItem[];
  isOpen?: boolean;
  onToggle?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  path,
  subItems,
  isOpen,
  onToggle,
}) => {
  if (subItems && subItems.length > 0) {
    return (
      <div className="space-y-1">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center">
            <Icon className="w-5 h-5 mr-3" />
            <span>{label}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {isOpen && (
          <div className="pl-11 space-y-1">
            {subItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={path || '#'}
      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{label}</span>
    </Link>
  );
};

export default MenuItem;