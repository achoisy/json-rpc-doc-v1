import React from 'react';
import { MethodObject, OpenRPCService } from '@rpcdoc/shared';
import MethodDetail from '../MethodDetail';

interface MainContentProps {
  selectedMethod: MethodObject | null;
  documentTitle: string;
  service: OpenRPCService;
}

const MainContent: React.FC<MainContentProps> = ({
  selectedMethod,
  documentTitle,
  service,
}) => {
  if (!selectedMethod) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {documentTitle}
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Select a method from the sidebar to view its details.
        </p>
      </div>
    );
  }

  return (
    <MethodDetail
      method={selectedMethod}
      documentTitle={documentTitle}
      service={service}
    />
  );
};

export default MainContent;
