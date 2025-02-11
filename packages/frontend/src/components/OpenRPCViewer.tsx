import React, { useState } from 'react';
import {
  OpenRPCService,
  sampleOpenrpcDocument,
  MethodObject,
} from '@rpcdoc/shared';

import MethodDetail from './MethodDetail';
import FileTreeNode from './FileTreeNode';
import { useFileTree } from '../hooks/useFileTree';
import NavBar from '../design/NavBar';

/**
 * The main OpenRPCViewer component.
 */
const OpenRPCViewer: React.FC = () => {
  const service = new OpenRPCService(sampleOpenrpcDocument);
  const document = service.getDocument();
  const methods = service.getMethods();
  const [selectedMethod, setSelectedMethod] = useState<MethodObject | null>(
    methods[0] || null
  );

  const { tree: fileTree, toggleFolder } = useFileTree(methods);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full md:w-72 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 overflow-y-auto">
          <div className="sticky top-0 space-y-4">
            <div className="flex items-center space-x-2 px-3 py-2">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-md"
              />
            </div>
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

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
          {selectedMethod ? (
            <MethodDetail
              method={selectedMethod}
              documentTitle={document.info.title}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a method to view details
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OpenRPCViewer;
