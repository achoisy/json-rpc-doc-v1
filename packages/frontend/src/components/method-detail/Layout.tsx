import React from 'react';
import type { MethodObject, OpenRPCService } from '@rpcdoc/shared';
import {
  MethodHeader,
  ParametersSection,
  ResultSection,
  ErrorsSection,
  ExamplesSection,
} from './components';

interface LayoutProps {
  method: MethodObject;
  documentTitle?: string;
  service: OpenRPCService;
}

const Layout: React.FC<LayoutProps> = ({ method, documentTitle, service }) => {
  return (
    <div className="p-8">
      <MethodHeader method={method} documentTitle={documentTitle} />

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Left Column - Method Details */}
        <div className="flex-1 space-y-8">
          <ParametersSection
            params={method.params}
            examples={method.examples}
            service={service}
          />
          <ResultSection
            result={method.result}
            examples={method.examples}
            service={service}
          />
          <ErrorsSection errors={method.errors} service={service} />
        </div>

        {/* Right Column - Examples */}
        <div className="lg:w-[45%]">
          <div className="sticky top-4">
            <ExamplesSection
              examples={method.examples}
              errors={method.errors}
              service={service}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
