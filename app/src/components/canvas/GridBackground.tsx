import { Layer, Line } from 'react-konva';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/types/overlay';

interface GridBackgroundProps {
  gridSize?: number;
}

export function GridBackground({ gridSize = 40 }: GridBackgroundProps) {
  const lines = [];
  const strokeColor = 'rgba(255, 255, 255, 0.05)';
  const majorStrokeColor = 'rgba(255, 255, 255, 0.1)';

  // Vertical lines
  for (let i = 0; i <= CANVAS_WIDTH; i += gridSize) {
    const isMajor = i % (gridSize * 5) === 0;
    lines.push(
      <Line
        key={`v-${i}`}
        points={[i, 0, i, CANVAS_HEIGHT]}
        stroke={isMajor ? majorStrokeColor : strokeColor}
        strokeWidth={isMajor ? 1 : 0.5}
      />
    );
  }

  // Horizontal lines
  for (let i = 0; i <= CANVAS_HEIGHT; i += gridSize) {
    const isMajor = i % (gridSize * 5) === 0;
    lines.push(
      <Line
        key={`h-${i}`}
        points={[0, i, CANVAS_WIDTH, i]}
        stroke={isMajor ? majorStrokeColor : strokeColor}
        strokeWidth={isMajor ? 1 : 0.5}
      />
    );
  }

  return <Layer>{lines}</Layer>;
}
