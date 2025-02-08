import { OpenRPCService } from '../openrpcService';
import type { OpenrpcDocumentCustom } from '../../types';
import { sampleOpenrpcDocument } from '../../mock/openrpcExamples';

describe('OpenRPCService', () => {
  it('returns the provided valid document', () => {
    const service = new OpenRPCService(sampleOpenrpcDocument);
    const document = service.getDocument();
    expect(document).toHaveProperty('openrpc', '1.2.6');
    expect(document).toHaveProperty('x-uuid', sampleOpenrpcDocument['x-uuid']);
  });

  it('returns a non-empty list of methods', () => {
    const service = new OpenRPCService(sampleOpenrpcDocument);
    const methods = service.getMethods();
    expect(Array.isArray(methods)).toBe(true);
    expect(methods.length).toBeGreaterThan(0);
  });

  it('throws an error for an invalid document', () => {
    expect(() => {
      new OpenRPCService({} as OpenrpcDocumentCustom);
    }).toThrow('Invalid OpenRPC document');
  });
});
