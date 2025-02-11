import React from 'react';
import {
  ChevronRightIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { MethodObject } from '@rpcdoc/shared';
import type { FileTreeItem } from '../hooks/useFileTree';

export interface FileTreeNodeProps {
  node: FileTreeItem;
  level?: number;
  onToggle: (path: string) => void;
  onSelect: (method: MethodObject) => void;
  selectedMethod: MethodObject | null;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
  node,
  level = 0,
  onToggle,
  onSelect,
  selectedMethod,
}) => {
  const isFolder = node.children.size > 0;
  const isSelected = selectedMethod?.name === node.fullPath;

  // Get the display name (last part of the path)
  const displayName = node.name.split('/').pop() || node.name;

  return (
    <div>
      <div
        className={`flex items-center px-3 py-1.5 text-sm cursor-pointer ${
          isSelected
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => {
          if (isFolder) {
            onToggle(node.fullPath);
          } else if (node.method) {
            onSelect(node.method);
          }
        }}
      >
        {isFolder && (
          <ChevronRightIcon
            className={`w-4 h-4 mr-1.5 text-gray-400 transition-transform ${
              node.isOpen ? 'transform rotate-90' : ''
            }`}
          />
        )}
        {!isFolder && (
          <DocumentTextIcon className="w-4 h-4 mr-1.5 text-gray-400" />
        )}
        <span className="truncate">{displayName}</span>
      </div>

      {node.isOpen &&
        Array.from(node.children.values()).map(child => (
          <FileTreeNode
            key={child.fullPath}
            node={child}
            level={level + 1}
            onToggle={onToggle}
            onSelect={onSelect}
            selectedMethod={selectedMethod}
          />
        ))}
    </div>
  );
};

export default FileTreeNode;
