import { useState, useMemo } from 'react';
import { MethodObject } from '@rpcdoc/shared';

export interface FileTreeItem {
  name: string;
  fullPath: string;
  children: Map<string, FileTreeItem>;
  isOpen?: boolean;
  method?: MethodObject;
}

export const buildFileTree = (methods: MethodObject[]): FileTreeItem => {
  const root: FileTreeItem = {
    name: '',
    fullPath: '',
    children: new Map(),
  };

  methods.forEach(method => {
    const pathSegments = method.name.split('/');
    let current = root;

    pathSegments.forEach((segment: string, index: number) => {
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

export const useFileTree = (
  methods: MethodObject[]
): { tree: FileTreeItem; toggleFolder: (path: string) => void } => {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [fileTree] = useState<FileTreeItem>(() => buildFileTree(methods));

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

  const tree = useMemo(
    () => updateTreeState(fileTree, expandedPaths),
    [fileTree, expandedPaths]
  );

  return { tree, toggleFolder };
};
