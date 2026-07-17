import { useRef, useCallback, useState, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import type { CanvasElement as CanvasElementType, ElementType } from '@/types/overlay';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/types/overlay';
import { GridBackground } from './GridBackground';
import { CanvasElement } from './CanvasElement';

interface CanvasWorkspaceProps {
  elements: CanvasElementType[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, updates: Partial<CanvasElementType>) => void;
  onAddElement: (type: ElementType, x: number, y: number) => void;
  draggedType: ElementType | null;
  onDragEnd: () => void;
  onStageRef?: (stage: Konva.Stage | null) => void;
}

export function CanvasWorkspace({
  elements,
  selectedId,
  onSelect,
  onUpdate,
  onAddElement,
  draggedType,
  onDragEnd,
  onStageRef,
}: CanvasWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [scale, setScale] = useState(1);

  // Expose stage ref to parent
  useEffect(() => {
    if (onStageRef) {
      onStageRef(stageRef.current);
    }
  }, [onStageRef]);

  // Calculate scale to fit canvas in container while maintaining 16:9
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerWidth = container.clientWidth - 48; // padding
      const containerHeight = container.clientHeight - 48;
      
      const scaleX = containerWidth / CANVAS_WIDTH;
      const scaleY = containerHeight / CANVAS_HEIGHT;
      
      setScale(Math.min(scaleX, scaleY, 1));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleStageClick = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // Deselect when clicking on empty canvas
    if (e.target === e.target.getStage()) {
      onSelect(null);
    }
  }, [onSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedType || !stageRef.current) return;

    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();
    
    if (pointerPosition) {
      const transform = stage.getAbsoluteTransform().copy();
      transform.invert();
      const pos = transform.point(pointerPosition);
      
      onAddElement(draggedType, pos.x, pos.y);
    }
    
    onDragEnd();
  }, [draggedType, onAddElement, onDragEnd]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex-1 bg-zinc-950 flex items-center justify-center p-6 overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div
        className="relative shadow-2xl"
        style={{
          width: CANVAS_WIDTH * scale,
          height: CANVAS_HEIGHT * scale,
        }}
      >
        {/* Canvas label */}
        <div className="absolute -top-6 left-0 text-xs text-zinc-500">
          {CANVAS_WIDTH}×{CANVAS_HEIGHT} (16:9)
        </div>

        <Stage
          ref={stageRef}
          width={CANVAS_WIDTH * scale}
          height={CANVAS_HEIGHT * scale}
          scaleX={scale}
          scaleY={scale}
          onClick={handleStageClick}
          onTap={handleStageClick}
          className="bg-transparent"
        >
          {/* Grid Background */}
          <GridBackground />

          {/* Elements Layer */}
          <Layer>
            {elements.map((element) => (
              <CanvasElement
                key={element.id}
                element={element}
                isSelected={element.id === selectedId}
                onSelect={() => onSelect(element.id)}
                onChange={(updates) => onUpdate(element.id, updates)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
