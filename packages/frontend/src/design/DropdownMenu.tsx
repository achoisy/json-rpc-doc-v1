import React, { useState } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

export interface DropdownMenuOption {
  value: string;
  label: string;
}

export interface DropdownMenuProps {
  label: string;
  options: DropdownMenuOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <span>{label}</span>
        <ChevronUpDownIcon className="w-4 h-4 ml-2" />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="p-2 text-sm">
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 ${
                  option.value === selectedValue ? 'font-bold' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
