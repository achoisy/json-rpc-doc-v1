import React from 'react';
import { SyntaxHighlighter } from './SyntaxHighlighter';

interface CodeExampleProps {
  value: unknown;
}

export const CodeExample: React.FC<CodeExampleProps> = ({ value }) => {
  return (
    <SyntaxHighlighter
      code={JSON.stringify(value, null, 2)}
      customStyle={{
        display: 'block',
        padding: '0.5rem',
        margin: 0,
        backgroundColor: 'transparent',
        borderRadius: '0.375rem',
        fontSize: '0.800rem',
        lineHeight: '1.5',
        whiteSpace: 'pre',
      }}
    />
  );
};
