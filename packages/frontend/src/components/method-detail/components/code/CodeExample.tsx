import React from 'react';
import { SyntaxHighlighter } from './SyntaxHighlighter';

interface CodeExampleProps {
  value: unknown;
}

export const CodeExample: React.FC<CodeExampleProps> = ({ value }) => {
  return (
    <div className="mt-2">
      <SyntaxHighlighter
        code={JSON.stringify(value)}
        customStyle={{
          display: 'inline',
          padding: '0.2em 0.4em',
          margin: 0,
          backgroundColor: 'var(--tw-prose-pre-bg)',
          borderRadius: '0.375rem',
        }}
      />
    </div>
  );
};
