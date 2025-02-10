import { JSX, useState } from 'react';
import {
  OpenRPCService,
  sampleOpenrpcDocument,
  MethodObject,
} from '@rpcdoc/shared';
import {
  ChevronRightIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ChevronUpDownIcon,
  FolderIcon,
  FolderOpenIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';

interface MethodDetailProps {
  method: MethodObject;
}

/**
 * A component for displaying method details.
 */
const MethodDetail = ({ method }: MethodDetailProps): JSX.Element => (
  <div className="space-y-6">
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {method.name}
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{method.summary}</p>
    </div>

    {method.params && (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <CodeBracketIcon className="w-5 h-5" />
          Parameters
        </h3>
        <div className="grid gap-4">
          {method.params.map((param, index) =>
            '$ref' in param ? (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-gray-900 dark:text-gray-200">
                    {param.$ref}
                  </span>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-gray-900 dark:text-gray-200">
                    {param.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {(typeof param.schema === 'object' && param.schema.type) ||
                      'any'}
                    {param.required ? ' *' : ''}
                  </span>
                </div>
                {param.description && (
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {param.description}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </div>
    )}

    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <DocumentTextIcon className="w-5 h-5" />
        Example Request
      </h3>
      <pre className="p-4 bg-gray-800 text-gray-100 rounded-lg overflow-x-auto">
        <code>
          {JSON.stringify({ method: method.name, params: [] }, null, 2)}
        </code>
      </pre>
    </div>
  </div>
);

interface FileTreeItem {
  name: string;
  fullPath: string;
  children: Map<string, FileTreeItem>;
  isOpen?: boolean;
  method?: MethodObject;
}

/**
 * Builds a file tree structure from a list of methods.
 */
const buildFileTree = (methods: MethodObject[]): FileTreeItem => {
  const root: FileTreeItem = {
    name: '',
    fullPath: '',
    children: new Map(),
  };

  methods.forEach(method => {
    const pathSegments = method.name.split('/');
    let current = root;

    pathSegments.forEach((segment, index) => {
      const isLeaf = index === pathSegments.length - 1;

      if (!current.children.has(segment)) {
        current.children.set(segment, {
          name: segment,
          fullPath: pathSegments.slice(0, index + 1).join('/'),
          children: new Map(),
          isOpen: false,
          ...(isLeaf ? { method } : {}),
        });
      }

      current = current.children.get(segment)!;
    });
  });

  return root;
};

interface FileTreeNodeProps {
  node: FileTreeItem;
  level?: number;
  onToggle: (path: string) => void;
  onSelect: (method: MethodObject) => void;
  selectedMethod: MethodObject | null;
}

/**
 * A tree node component for files and methods.
 */
const FileTreeNode = ({
  node,
  level = 0,
  onToggle,
  onSelect,
  selectedMethod,
}: FileTreeNodeProps): JSX.Element => {
  const isFolder = node.children.size > 0;
  const isSelected = selectedMethod?.name === node.fullPath;

  return (
    <div className="space-y-1">
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-colors cursor-pointer
          ${isSelected ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
        `}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          if (isFolder) {
            onToggle(node.fullPath);
          } else if (node.method) {
            onSelect(node.method);
          }
        }}
      >
        {isFolder ? (
          <>
            {node.isOpen ? (
              <FolderOpenIcon className="w-4 h-4 flex-shrink-0" />
            ) : (
              <FolderIcon className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="font-medium">{node.name}</span>
            <ChevronRightIcon
              className={`w-3 h-3 ml-auto transition-transform ${
                node.isOpen ? 'transform rotate-90' : ''
              }`}
            />
          </>
        ) : (
          <>
            <DocumentIcon className="w-4 h-4 flex-shrink-0 text-gray-500" />
            <span className="truncate">{node.name}</span>
          </>
        )}
      </div>

      {node.isOpen &&
        Array.from(node.children.values()).map(child => (
          <FileTreeNode
            key={child.fullPath}
            node={child}
            level={level + 1}
            onToggle={onToggle}
            onSelect={onSelect}
            selectedMethod={selectedMethod}
          />
        ))}
    </div>
  );
};

/**
 * The main OpenRPCViewer component.
 */
const OpenRPCViewer = (): JSX.Element => {
  const service = new OpenRPCService(sampleOpenrpcDocument);
  const document = service.getDocument();
  const methods = service.getMethods();
  const [selectedMethod, setSelectedMethod] = useState<MethodObject | null>(
    methods[0] || null
  );
  const [isVersionMenuOpen, setVersionMenuOpen] = useState<boolean>(false);
  const [fileTree, setFileTree] = useState<FileTreeItem>(() =>
    buildFileTree(methods)
  );
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string): void => {
    setExpandedPaths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const updateTreeState = (
    node: FileTreeItem,
    expandedPaths: Set<string>
  ): FileTreeItem => {
    const newNode: FileTreeItem = {
      ...node,
      isOpen: expandedPaths.has(node.fullPath),
    };

    newNode.children = new Map(
      Array.from(newNode.children.entries()).map(([key, child]) => [
        key,
        updateTreeState(child, expandedPaths),
      ])
    );

    return newNode;
  };

  const treeWithState: FileTreeItem = updateTreeState(fileTree, expandedPaths);

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 p-6 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {document.info.title}
          </h1>
          <div className="relative mt-2">
            <button
              onClick={() => setVersionMenuOpen(!isVersionMenuOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <span>Version {document.info.version}</span>
              <ChevronUpDownIcon className="w-4 h-4 ml-2" />
            </button>
            {isVersionMenuOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <div className="p-2 text-sm">
                  <button className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                    v1.0.0 (current)
                  </button>
                  <button className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                    v0.8.4
                  </button>
                  <button className="w-full px-3 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                    v0.7.2
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <nav>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
            methods
          </h2>
          <div className="space-y-1">
            {Array.from(treeWithState.children.values()).map(child => (
              <FileTreeNode
                key={child.fullPath}
                node={child}
                onToggle={toggleFolder}
                onSelect={setSelectedMethod}
                selectedMethod={selectedMethod}
              />
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {selectedMethod ? (
          <MethodDetail method={selectedMethod} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a method to view details
          </div>
        )}
      </main>
    </div>
  );
};

export default OpenRPCViewer;
