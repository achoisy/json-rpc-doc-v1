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
    <aside className="w-full md:w-72 md:fixed md:left-0 md:top-14 md:bottom-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 md:shadow-lg md:shadow-gray-200/10 dark:md:shadow-black/30 z-40">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <SearchBar />
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <div className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Resources
          </div>
          <div className="space-y-0.5">
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
    </aside>
  );
};

export default Sidebar;
