import React from 'react';
import type { MethodObject } from '@rpcdoc/shared';
import Layout from './method-detail/Layout';

/**
 * A component for displaying JSON-RPC method details.
 */
export interface MethodDetailProps {
  method: MethodObject;
  documentTitle?: string;
}

const MethodDetail: React.FC<MethodDetailProps> = props => {
  return <Layout {...props} />;
};

export default MethodDetail;
