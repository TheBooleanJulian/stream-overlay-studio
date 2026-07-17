import { useState, useRef, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { CanvasWorkspace } from '@/components/canvas/CanvasWorkspace';
import { ExportDialog } from '@/components/export/ExportDialog';
import { useCanvasState } from '@/hooks/useCanvasState';
import type { ElementType, ThemeTemplate } from '@/types/overlay';
import Konva from 'konva';
import { Toaster, toast } from 'sonner';

function App() {
  const {
    elements,
    selectedId,
    selectedElement,
    activeTheme,
    addElement,
    applyTemplate,
    clearCanvas,
    updateElement,
    deleteElement,
    selectElement,
    clearSelection,
    moveElement,
    bringToFront,
    sendToBack,
    duplicateElement,
  } = useCanvasState();

  const [draggedType, setDraggedType] = useState<ElementType | null>(null);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const stageRef = useRef<Konva.Stage | null>(null);

  const handleDragStart = useCallback((type: ElementType) => {
    setDraggedType(type);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedType(null);
  }, []);

  const handleStageRef = useCallback((stage: Konva.Stage | null) => {
    stageRef.current = stage;
  }, []);

  const handleApplyTemplate = useCallback((template: ThemeTemplate) => {
    applyTemplate(template);
  }, [applyTemplate]);

  const handleExportClick = useCallback(() => {
    if (elements.length === 0) {
      toast.error('Add some elements before exporting!');
      return;
    }
    setIsExportDialogOpen(true);
  }, [elements.length]);

  const handleCloseExportDialog = useCallback(() => {
    setIsExportDialogOpen(false);
  }, []);

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Delete selected element with Delete or Backspace
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        deleteElement(selectedId);
        toast.info('Element deleted');
      }
      // Deselect with Escape
      if (e.key === 'Escape') {
        clearSelection();
      }
      // Duplicate with Ctrl+D
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedId) {
        e.preventDefault();
        duplicateElement(selectedId);
        toast.success('Element duplicated');
      }
      // Arrow keys for nudging
      if (selectedId) {
        const amount = e.shiftKey ? 20 : 5;
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            moveElement(selectedId, 'up', amount);
            break;
          case 'ArrowDown':
            e.preventDefault();
            moveElement(selectedId, 'down', amount);
            break;
          case 'ArrowLeft':
            e.preventDefault();
            moveElement(selectedId, 'left', amount);
            break;
          case 'ArrowRight':
            e.preventDefault();
            moveElement(selectedId, 'right', amount);
            break;
        }
      }
    },
    [selectedId, deleteElement, clearSelection, duplicateElement, moveElement]
  );

  return (
    <div 
      className="h-screen flex flex-col bg-zinc-950 overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid #27272a',
          },
        }}
      />
      
      <Header 
        onExport={handleExportClick} 
        elementCount={elements.length}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar 
          onDragStart={handleDragStart} 
          onApplyTemplate={handleApplyTemplate}
          onClearCanvas={clearCanvas}
          elementCount={elements.length}
        />
        
        <CanvasWorkspace
          elements={elements}
          selectedId={selectedId}
          onSelect={selectElement}
          onUpdate={updateElement}
          onAddElement={addElement}
          draggedType={draggedType}
          onDragEnd={handleDragEnd}
          onStageRef={handleStageRef}
        />
        
        <RightSidebar
          selectedElement={selectedElement}
          onUpdate={updateElement}
          onDelete={deleteElement}
          onDuplicate={duplicateElement}
          onMove={moveElement}
          onBringToFront={bringToFront}
          onSendToBack={sendToBack}
        />
      </div>

      {/* Status bar */}
      <div className="h-8 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-4 text-xs text-zinc-500">
        <div className="flex items-center gap-4">
          <span>{elements.length} element{elements.length !== 1 ? 's' : ''}</span>
          {activeTheme && (
            <span className="text-violet-400 capitalize">Theme: {activeTheme}</span>
          )}
          {selectedId && (
            <span className="text-cyan-400">
              Selected: {selectedElement?.type.replace(/\d/, ' $&').replace(/([A-Z])/g, ' $1').trim()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">↑↓←→</kbd> nudge</span>
          <span><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">Ctrl+D</kbd> duplicate</span>
          <span><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">Delete</kbd> remove</span>
          <span><kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">Esc</kbd> deselect</span>
        </div>
      </div>

      {/* Export Dialog */}
      <ExportDialog
        isOpen={isExportDialogOpen}
        onClose={handleCloseExportDialog}
        elements={elements}
      />
    </div>
  );
}

export default App;
