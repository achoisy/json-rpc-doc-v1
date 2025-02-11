import React from 'react';
import type { MethodObject } from '@rpcdoc/shared';
import { SyntaxHighlighter } from './SyntaxHighlighter';
import { ResponseTabs } from '../ResponseTabs';

interface ExamplesSectionProps {
  method: MethodObject;
}

export const ExamplesSection: React.FC<ExamplesSectionProps> = ({ method }) => {
  const requestExample = {
    jsonrpc: '2.0',
    method: method.name,
    params:
      method.examples?.[0]?.params?.map((p: { value: any }) => p.value) || [],
    id: 1,
  };

  return (
    <>
      {/* Example Request */}
      <div className="mb-8">
        <div className="rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
            <span className="text-sm text-gray-400">JSON-RPC Request</span>
          </div>
          <SyntaxHighlighter
            code={JSON.stringify(requestExample, null, 2)}
            customStyle={{
              margin: 0,
              borderRadius: '0 0 0.5rem 0.5rem',
            }}
          />
        </div>
      </div>

      {/* Example Response */}
      {(method.examples?.[0]?.result ||
        (method.errors && method.errors.length > 0)) && (
        <ResponseTabs method={method} />
      )}
    </>
  );
};
