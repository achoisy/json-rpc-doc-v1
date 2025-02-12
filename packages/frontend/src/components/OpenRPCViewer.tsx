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

  return (
    <ViewerLayout>
      <Sidebar
        fileTree={fileTree}
        toggleFolder={toggleFolder}
        setSelectedMethod={setSelectedMethod}
        selectedMethod={selectedMethod}
      />
      <MainContent
        selectedMethod={selectedMethod}
        documentTitle={document.info.title}
      />
    </ViewerLayout>
  );
};

export default OpenRPCViewer;
