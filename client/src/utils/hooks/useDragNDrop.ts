import { useCallback, useState } from 'react';

interface DragNDropHook {
  dragging: boolean;
  dragOver: (e: React.DragEvent) => void;
  dragEnter: (e: React.DragEvent) => void;
  dragLeave: (e: React.DragEvent) => void;
  fileDrop: (e: React.DragEvent) => File[] | null;
}

/**
 * Custom hook for handling drag-and-drop file interactions.
 * @returns {DragNDropHook}
 */
export const useDragNDrop = (): DragNDropHook => {
  const [dragging, setDragging] = useState(false);

  const dragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true); // Activate dragging state
  }, []);

  const dragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true); // Activate dragging state
  }, []);

  const dragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false); // Deactivate dragging state
  }, []);

  const fileDrop = useCallback((e: React.DragEvent): File[] | null => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false); // Désactiver l'état de glisser-déposer
  
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      return Array.from(e.dataTransfer.files);
    }
    return null;
  }, []);
  
  

  return {
    dragging,
    dragOver,
    dragEnter,
    dragLeave,
    fileDrop,
  };
};
