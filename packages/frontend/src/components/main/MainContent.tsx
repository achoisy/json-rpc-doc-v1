import React from 'react';
import { MethodObject } from '@rpcdoc/shared';
import MethodDetail from '../MethodDetail';

interface MainContentProps {
  selectedMethod: MethodObject | null;
  documentTitle: string;
}

const MainContent: React.FC<MainContentProps> = ({
  selectedMethod,
  documentTitle,
}) => {
  return (
    <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
      {selectedMethod ? (
        <MethodDetail method={selectedMethod} documentTitle={documentTitle} />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          Select a method to view details
        </div>
      )}
    </main>
  );
};

export default MainContent;
