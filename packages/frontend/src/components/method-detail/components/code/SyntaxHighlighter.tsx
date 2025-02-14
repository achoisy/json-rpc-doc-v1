import React from 'react';
import { Prism as SyntaxHighlighterBase } from 'react-syntax-highlighter';
import {
  coldarkDark,
  coldarkCold,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SyntaxHighlighterProps {
  code: string;
  isDark?: boolean;
  customStyle?: React.CSSProperties;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  isDark = false,
  customStyle = {},
}) => {
  return (
    <SyntaxHighlighterBase
      language="json"
      style={isDark ? coldarkDark : coldarkCold}
      customStyle={customStyle}
    >
      {code}
    </SyntaxHighlighterBase>
  );
};
