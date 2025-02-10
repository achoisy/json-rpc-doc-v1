import React from 'react';
import {
  ChevronRightIcon,
  FolderIcon,
  FolderOpenIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import { MethodObject } from '@rpcdoc/shared';
import type { FileTreeItem } from '../hooks/useFileTree';

export interface FileTreeNodeProps {
  node: FileTreeItem;
  level?: number;
  onToggle: (path: string) => void;
  onSelect: (method: MethodObject) => void;
  selectedMethod: MethodObject | null;
  className?: string;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
  node,
  level = 0,
  onToggle,
  onSelect,
  selectedMethod,
  className,
}) => {
  const isFolder = node.children.size > 0;
  const isSelected = selectedMethod?.name === node.fullPath;

  return (
    <div className={`space-y-1 ${className || ''}`}>
      <div
        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors cursor-pointer ${
          isSelected
            ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => {
          if (isFolder) {
            onToggle(node.fullPath);
          } else if (node.method) {
            onSelect(node.method);
          }
        }}
      >
        {isFolder ? (
          <>
            {node.isOpen ? (
              <FolderOpenIcon className="w-4 h-4 flex-shrink-0" />
            ) : (
              <FolderIcon className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="font-medium">{node.name}</span>
            <ChevronRightIcon
              className={`w-3 h-3 ml-auto transition-transform ${
                node.isOpen ? 'transform rotate-90' : ''
              }`}
            />
          </>
        ) : (
          <>
            <DocumentIcon className="w-4 h-4 flex-shrink-0 text-gray-500" />
            <span className="truncate">{node.name}</span>
          </>
        )}
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
