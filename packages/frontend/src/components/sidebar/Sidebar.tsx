import React from 'react';
import { MethodObject } from '@rpcdoc/shared';
import { FileTreeItem } from '../../hooks/useFileTree';
import FileTreeNode from '../FileTreeNode';
import SearchBar from './SearchBar';

interface SidebarProps {
  fileTree: FileTreeItem;
  toggleFolder: (path: string) => void;
  setSelectedMethod: (method: MethodObject | null) => void;
  selectedMethod: MethodObject | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  fileTree,
  toggleFolder,
  setSelectedMethod,
  selectedMethod,
}) => {
  return (
    <div className="w-full md:w-72 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 overflow-y-auto">
      <div className="sticky top-0 space-y-4">
        <SearchBar />
        <nav className="space-y-1">
          <div className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Resources
          </div>
          <div>
            {Array.from(fileTree.children.values()).map(child => (
              <FileTreeNode
                key={child.fullPath}
                node={child}
                onToggle={toggleFolder}
                onSelect={setSelectedMethod}
                selectedMethod={selectedMethod}
              />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
