import { Rect, Text, Group, Transformer } from 'react-konva';
import type { CanvasElement as CanvasElementType } from '@/types/overlay';
import { useRef, useEffect } from 'react';
import Konva from 'konva';

interface CanvasElementProps {
  element: CanvasElementType;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (updates: Partial<CanvasElementType>) => void;
}

export function CanvasElement({
  element,
  isSelected,
  onSelect,
  onChange,
}: CanvasElementProps) {
  const shapeRef = useRef<Konva.Group>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    onChange({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = () => {
    if (!shapeRef.current) return;
    
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    onChange({
      x: node.x(),
      y: node.y(),
      width: Math.max(20, node.width() * scaleX),
      height: Math.max(20, node.height() * scaleY),
      rotation: node.rotation(),
    });

    node.scaleX(1);
    node.scaleY(1);
  };

  const isTextOnly = element.type === 'text';

  // Calculate glow color and shadow
  const glowColor = element.glow ? (element.stroke || element.textColor || '#8b5cf6') : undefined;
  const shadowBlur = element.glow ? 20 : 0;
  const shadowOpacity = element.glow ? 0.8 : 0;

  return (
    <>
      <Group
        ref={shapeRef}
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        rotation={element.rotation || 0}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      >
        {/* Glow effect layer (behind main shape) */}
        {element.glow && !isTextOnly && (
          <Rect
            width={element.width}
            height={element.height}
            fill={glowColor}
            cornerRadius={(element.cornerRadius || 0) + 4}
            opacity={0.3}
            shadowColor={glowColor}
            shadowBlur={shadowBlur}
            shadowOpacity={shadowOpacity}
          />
        )}

        {/* Background rect (for borders and fill) */}
        {!isTextOnly && (
          <Rect
            width={element.width}
            height={element.height}
            fill={element.fill || 'transparent'}
            stroke={element.stroke || 'transparent'}
            strokeWidth={element.strokeWidth || 0}
            cornerRadius={element.cornerRadius || 0}
            opacity={element.opacity || 1}
          />
        )}

        {/* Text content */}
        {element.text && (
          <Text
            width={element.width}
            height={element.height}
            text={element.text}
            fontSize={element.fontSize || 24}
            fontFamily={element.fontFamily || 'Inter, sans-serif'}
            fill={element.textColor || '#ffffff'}
            align="center"
            verticalAlign="middle"
            opacity={element.opacity || 1}
            padding={10}
            shadowColor={element.glow ? element.textColor : undefined}
            shadowBlur={element.glow ? 15 : 0}
            shadowOpacity={element.glow ? 0.6 : 0}
          />
        )}

        {/* Placeholder label for non-text widgets */}
        {!element.text && element.type !== 'text' && (
          <Text
            width={element.width}
            height={element.height}
            text={element.type.replace(/\d/, ' $&').replace(/([A-Z])/g, ' $1').trim()}
            fontSize={14}
            fontFamily="Inter, sans-serif"
            fill="rgba(255,255,255,0.4)"
            align="center"
            verticalAlign="middle"
          />
        )}
      </Group>

      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20 || newBox.height < 20) {
              return oldBox;
            }
            return newBox;
          }}
          anchorSize={8}
          anchorStroke="#8b5cf6"
          anchorFill="#1a1a2e"
          borderStroke="#8b5cf6"
          borderDash={[4, 4]}
          keepRatio={false}
          enabledAnchors={[
            'top-left',
            'top-center',
            'top-right',
            'middle-left',
            'middle-right',
            'bottom-left',
            'bottom-center',
            'bottom-right',
          ]}
        />
      )}
    </>
  );
}
