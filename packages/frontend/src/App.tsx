import { JSX, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex space-x-4">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            alt="Vite logo"
            className="h-24 hover:drop-shadow-xl transition-shadow duration-300"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            alt="React logo"
            className="h-24 hover:drop-shadow-xl transition-shadow duration-300"
          />
        </a>
      </div>
      <h1 className="mt-8 text-4xl font-bold text-gray-800 dark:text-gray-100">
        Vite + React
      </h1>
      <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="block mx-auto px-6 py-3 font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg hover:shadow-2xl transition duration-300 dark:from-indigo-600 dark:to-purple-600"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Edit <code className="font-mono font-bold">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
