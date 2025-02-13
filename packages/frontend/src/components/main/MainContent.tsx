import React, { useEffect } from 'react';
import { MethodObject, OpenRPCService } from '@rpcdoc/shared';
import MethodDetail from '../MethodDetail';

interface MainContentProps {
  documentTitle: string;
  service: OpenRPCService;
  selectedMethod: MethodObject | null;
}

const MainContent: React.FC<MainContentProps> = ({
  documentTitle,
  service,
  selectedMethod,
}) => {
  const methods = service.getMethods();

  useEffect(() => {
    if (selectedMethod) {
      const element = document.getElementById(`method-${selectedMethod.name}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedMethod]);

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        {documentTitle}
      </h1>
      {methods.map(method => (
        <div
          key={method.name}
          id={`method-${method.name}`}
          className={`mb-8 scroll-mt-8 ${
            selectedMethod?.name === method.name
              ? 'bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 -mx-4'
              : ''
          }`}
        >
          <MethodDetail method={method} service={service} />
          <hr className="my-8 border-t border-gray-200 dark:border-gray-700" />
        </div>
      ))}
    </div>
  );
};

export default MainContent;
