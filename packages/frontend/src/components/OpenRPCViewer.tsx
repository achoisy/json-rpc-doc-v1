import React, { useState } from 'react';
import {
  OpenRPCService,
  sampleOpenrpcDocument,
  MethodObject,
} from '@rpcdoc/shared';

import MethodDetail from './MethodDetail';
import FileTreeNode from './FileTreeNode';
import DropdownMenu from '../design/DropdownMenu';
import { useFileTree } from '../hooks/useFileTree';
import BreadCrumb from '../design/BreadCrumb';
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

  const versionOptions = [
    {
      value: document.info.version,
      label: `v${document.info.version} (current)`,
    },
    { value: '0.8.4', label: 'v0.8.4' },
    { value: '0.7.2', label: 'v0.7.2' },
  ];
  const [selectedVersion, setSelectedVersion] = useState(document.info.version);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-gray-900">
      <NavBar />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Enhanced Sidebar */}
        <div className="w-full md:w-80 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shadow-sm p-4 md:p-6 overflow-y-auto z-20">
          <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
            <div className="mt-3">
              <DropdownMenu
                label={`Version ${selectedVersion}`}
                options={versionOptions}
                selectedValue={selectedVersion}
                onSelect={setSelectedVersion}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              />
            </div>
          </div>
          <nav>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">
              Methods
            </h2>
            <div className="space-y-1.5">
              {Array.from(fileTree.children.values()).map(child => (
                <FileTreeNode
                  key={child.fullPath}
                  node={child}
                  onToggle={toggleFolder}
                  onSelect={setSelectedMethod}
                  selectedMethod={selectedMethod}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors"
                />
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {selectedMethod ? (
            <MethodDetail
              method={selectedMethod}
              documentTitle={document.info.title}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              Select a method to view details
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OpenRPCViewer;
