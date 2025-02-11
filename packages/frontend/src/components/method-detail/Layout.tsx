import React from 'react';
import type { MethodObject } from '@rpcdoc/shared';
import { MethodHeader } from './MethodHeader';
import { ParametersSection } from './ParametersSection';
import { ResultSection } from './ResultSection';
import { ErrorsSection } from './ErrorsSection';
import { ExamplesSection } from './ExamplesSection';

interface LayoutProps {
  method: MethodObject;
  documentTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ method }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <MethodHeader method={method} />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Method Details */}
        <div className="flex-1 space-y-6">
          <ParametersSection params={method.params} />
          <ResultSection result={method.result} />
          <ErrorsSection errors={method.errors} />
        </div>

        {/* Right Column - Examples */}
        <div className="lg:w-[45%] space-y-6">
          <div className="sticky top-4">
            <ExamplesSection method={method} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
