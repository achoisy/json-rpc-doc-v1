import { JSX } from 'react';
import OpenRPCViewer from './components/OpenRPCViewer';

function App(): JSX.Element {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 md:mx-auto md:max-w-7xl">
      <OpenRPCViewer />
    </div>
  );
}

export default App;
