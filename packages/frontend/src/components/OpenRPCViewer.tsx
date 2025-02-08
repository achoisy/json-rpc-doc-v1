import { JSX } from 'react';
import { OpenRPCService, sampleOpenrpcDocument } from '@rpcdoc/shared';

/**
 * A component that displays OpenRPC document details using mocked data.
 *
 * @returns {JSX.Element} The OpenRPC document viewer.
 */
const OpenRPCViewer = (): JSX.Element => {
  const service = new OpenRPCService(sampleOpenrpcDocument);
  const document = service.getDocument();
  const methods = service.getMethods();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {document.info.title}
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {document.info.description}
      </p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Methods ({methods.length})
        </h3>
        <ul className="list-disc ml-6 mt-2">
          {methods.map(method => (
            <li key={method.name} className="text-gray-600 dark:text-gray-300">
              <span className="font-bold">{method.name}</span>: {method.summary}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OpenRPCViewer;
