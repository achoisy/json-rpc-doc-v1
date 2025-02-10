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
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-gray-200 dark:border-gray-800 p-4 md:p-6 overflow-y-auto z-10">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {document.info.title}
          </h1>
          <div className="mt-2">
            <DropdownMenu
              label={`Version ${selectedVersion}`}
              options={versionOptions}
              selectedValue={selectedVersion}
              onSelect={setSelectedVersion}
            />
          </div>
        </div>
        <nav>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
            methods
          </h2>
          <div className="space-y-1">
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

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {selectedMethod ? (
          <MethodDetail method={selectedMethod} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a method to view details
          </div>
        )}
      </main>
    </div>
  );
};

export default OpenRPCViewer;
