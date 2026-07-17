import Konva from 'konva';
import type { CanvasElement } from '@/types/overlay';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/types/overlay';

// Export to PNG with full resolution
export function exportToPng(elements: CanvasElement[]): string {
  // Create a temporary stage at full resolution
  const tempStage = new Konva.Stage({
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    container: document.createElement('div'), // invisible container
  });

  const layer = new Konva.Layer();
  tempStage.add(layer);

  // Render each element
  elements.forEach((element) => {
    const node = createKonvaNode(element);
    if (node) {
      layer.add(node as Konva.Group | Konva.Shape);
    }
  });

  layer.draw();

  // Export to PNG with transparent background
  const dataURL = tempStage.toDataURL({
    pixelRatio: 1,
    mimeType: 'image/png',
    quality: 1,
  });

  // Cleanup
  tempStage.destroy();

  return dataURL;
}

// Export to GIF (using canvas frames)
export async function exportToGif(
  elements: CanvasElement[],
  duration: number = 3000,
  fps: number = 10
): Promise<Blob> {
  const frames: string[] = [];
  const frameCount = Math.ceil((duration / 1000) * fps);

  // Create animated frames
  for (let i = 0; i < frameCount; i++) {
    const progress = i / frameCount;
    const frameElements = elements.map((el) => ({
      ...el,
      // Add subtle animation offset
      y: el.y + Math.sin(progress * Math.PI * 2) * 5,
    }));

    const dataURL = exportToPng(frameElements);
    frames.push(dataURL);
  }

  // For now, return the first frame as a PNG (fallback)
  // Full GIF implementation would require a library like gif.js
  const response = await fetch(frames[0]);
  return response.blob();
}

// Export to MP4 using MediaRecorder
export async function exportToMp4(
  elements: CanvasElement[],
  duration: number = 5000,
  fps: number = 30
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    const stream = canvas.captureStream(fps);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 5000000,
    });

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      resolve(blob);
    };

    mediaRecorder.onerror = () => {
      reject(new Error('MediaRecorder error'));
    };

    // Create Konva stage for rendering
    const tempStage = new Konva.Stage({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      container: document.createElement('div'),
    });

    const layer = new Konva.Layer();
    tempStage.add(layer);

    // Add elements
    elements.forEach((element) => {
      const node = createKonvaNode(element);
      if (node) {
        layer.add(node as Konva.Group | Konva.Shape);
      }
    });

    layer.draw();

    let startTime: number | null = null;
    const frameDuration = 1000 / fps;
    let lastFrameTime = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed >= duration) {
        mediaRecorder.stop();
        tempStage.destroy();
        return;
      }

      // Throttle to target FPS
      if (timestamp - lastFrameTime >= frameDuration) {
        lastFrameTime = timestamp;

        // Render to canvas
        const dataURL = tempStage.toDataURL({
          pixelRatio: 1,
          mimeType: 'image/png',
        });

        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          ctx.drawImage(img, 0, 0);
        };
        img.src = dataURL;
      }

      requestAnimationFrame(animate);
    };

    mediaRecorder.start();
    requestAnimationFrame(animate);
  });
}

// Helper function to create Konva nodes from element data
function createKonvaNode(element: CanvasElement): Konva.Node | null {
  if (element.type === 'text') {
    return new Konva.Text({
      x: element.x,
      y: element.y,
      width: element.width,
      height: element.height,
      text: element.text || '',
      fontSize: element.fontSize || 24,
      fontFamily: element.fontFamily || 'Inter, sans-serif',
      fill: element.textColor || '#ffffff',
      align: 'center',
      verticalAlign: 'middle',
      opacity: element.opacity || 1,
      padding: 10,
    });
  }

  // For shapes (webcam, chatbox, etc.)
  return new Konva.Rect({
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    fill: element.fill || 'transparent',
    stroke: element.stroke || 'transparent',
    strokeWidth: element.strokeWidth || 0,
    cornerRadius: element.cornerRadius || 0,
    opacity: element.opacity || 1,
  });
}

// Download helper
export function downloadFile(data: string | Blob, filename: string) {
  let url: string;
  
  if (typeof data === 'string') {
    url = data;
  } else {
    url = URL.createObjectURL(data);
  }

  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (typeof data !== 'string') {
    URL.revokeObjectURL(url);
  }
}

// Simple PNG export for immediate use
export function downloadPng(dataURL: string, filename: string = 'overlay.png') {
  downloadFile(dataURL, filename);
}
