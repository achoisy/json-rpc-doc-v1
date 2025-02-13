import React from 'react';
import type { MethodObject, OpenRPCService } from '@rpcdoc/shared';
import Layout from './method-detail/Layout';

/**
 * A component for displaying JSON-RPC method details.
 */
export interface MethodDetailProps {
  method: MethodObject;
  service: OpenRPCService;
}

const MethodDetail: React.FC<MethodDetailProps> = ({ method, service }) => {
  return <Layout method={method} service={service} />;
};

export default MethodDetail;
