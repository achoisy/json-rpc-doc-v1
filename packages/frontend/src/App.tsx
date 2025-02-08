import { JSX } from 'react';
import OpenRPCViewer from './components/OpenRPCViewer';

function App(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <OpenRPCViewer />
    </div>
  );
}

export default App;
