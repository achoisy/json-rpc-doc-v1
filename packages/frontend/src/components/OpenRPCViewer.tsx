import React, { useState } from 'react';
import {
  OpenRPCService,
  sampleOpenrpcDocument,
  MethodObject,
} from '@rpcdoc/shared';

import { useFileTree } from '../hooks/useFileTree';
import ViewerLayout from './layout/ViewerLayout';
import Sidebar from './sidebar/Sidebar';
import MainContent from './main/MainContent';

/**
 * The main OpenRPCViewer component that orchestrates the documentation viewer.
 */
const OpenRPCViewer: React.FC = () => {
  const service = new OpenRPCService(sampleOpenrpcDocument);
  const document = service.getDocument();
  const methods = service.getMethods();
  const [selectedMethod, setSelectedMethod] = useState<MethodObject | null>(
    methods[0] || null
  );

  const { tree: fileTree, toggleFolder } = useFileTree(methods);

  const handleMethodSelect = (method: MethodObject | null) => {
    setSelectedMethod(method);
  };

  return (
    <ViewerLayout>
      <Sidebar
        fileTree={fileTree}
        toggleFolder={toggleFolder}
        setSelectedMethod={handleMethodSelect}
        selectedMethod={selectedMethod}
        service={service}
      />
      <MainContent
        selectedMethod={selectedMethod}
        documentTitle={document.info.title}
        service={service}
      />
    </ViewerLayout>
  );
};

export default OpenRPCViewer;
