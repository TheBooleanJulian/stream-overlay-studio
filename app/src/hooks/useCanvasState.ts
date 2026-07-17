import { useState, useCallback } from 'react';
import { WIDGET_PRESETS, THEME_TEMPLATES } from '@/types/overlay';
import type { CanvasElement, ElementType, ThemeTemplate, ThemeStyle } from '@/types/overlay';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/types/overlay';

export function useCanvasState() {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<ThemeStyle | null>(null);

  const generateId = () => `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addElement = useCallback((type: ElementType, x: number, y: number, theme?: ThemeStyle) => {
    const preset = WIDGET_PRESETS.find((p) => p.type === type);
    if (!preset) return;

    // Apply theme colors if specified
    let themedProps = { ...preset.defaultProps };
    if (theme) {
      const themeTemplate = THEME_TEMPLATES.find((t) => t.style === theme);
      if (themeTemplate && themedProps.stroke) {
        themedProps.stroke = themeTemplate.accentColor;
      }
    }

    const newElement: CanvasElement = {
      id: generateId(),
      type,
      x: x - preset.defaultWidth / 2,
      y: y - preset.defaultHeight / 2,
      width: preset.defaultWidth,
      height: preset.defaultHeight,
      rotation: 0,
      theme,
      ...themedProps,
    };

    setElements((prev) => [...prev, newElement]);
    setSelectedId(newElement.id);
  }, []);

  const applyTemplate = useCallback((template: ThemeTemplate) => {
    const newElements: CanvasElement[] = template.elements.map((el, index) => {
      const preset = WIDGET_PRESETS.find((p) => p.type === el.type);
      return {
        id: generateId() + `-${index}`,
        type: el.type as ElementType,
        x: el.x || 100,
        y: el.y || 100,
        width: el.width || preset?.defaultWidth || 200,
        height: el.height || preset?.defaultHeight || 100,
        rotation: el.rotation || 0,
        theme: template.style,
        fill: el.fill || preset?.defaultProps.fill,
        stroke: el.stroke || template.accentColor,
        strokeWidth: el.strokeWidth || preset?.defaultProps.strokeWidth,
        cornerRadius: el.cornerRadius || preset?.defaultProps.cornerRadius,
        opacity: el.opacity || 1,
        text: el.text || preset?.defaultProps.text,
        fontSize: el.fontSize || preset?.defaultProps.fontSize,
        fontFamily: el.fontFamily || preset?.defaultProps.fontFamily,
        textColor: el.textColor || preset?.defaultProps.textColor,
        glow: el.glow || false,
      };
    });

    setElements(newElements);
    setActiveTheme(template.style);
    setSelectedId(null);
  }, []);

  const clearCanvas = useCallback(() => {
    setElements([]);
    setSelectedId(null);
    setActiveTheme(null);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  }, []);

  const deleteElement = useCallback((id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  }, [selectedId]);

  const selectElement = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedId(null);
  }, []);

  const moveElement = useCallback((id: string, direction: 'up' | 'down' | 'left' | 'right', amount: number = 10) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id !== id) return el;
        const updates: Partial<CanvasElement> = {};
        switch (direction) {
          case 'up':
            updates.y = Math.max(0, el.y - amount);
            break;
          case 'down':
            updates.y = Math.min(CANVAS_HEIGHT - el.height, el.y + amount);
            break;
          case 'left':
            updates.x = Math.max(0, el.x - amount);
            break;
          case 'right':
            updates.x = Math.min(CANVAS_WIDTH - el.width, el.x + amount);
            break;
        }
        return { ...el, ...updates };
      })
    );
  }, []);

  const bringToFront = useCallback((id: string) => {
    setElements((prev) => {
      const element = prev.find((el) => el.id === id);
      if (!element) return prev;
      const others = prev.filter((el) => el.id !== id);
      return [...others, element];
    });
  }, []);

  const sendToBack = useCallback((id: string) => {
    setElements((prev) => {
      const element = prev.find((el) => el.id === id);
      if (!element) return prev;
      const others = prev.filter((el) => el.id !== id);
      return [element, ...others];
    });
  }, []);

  const duplicateElement = useCallback((id: string) => {
    setElements((prev) => {
      const element = prev.find((el) => el.id === id);
      if (!element) return prev;
      
      const newElement: CanvasElement = {
        ...element,
        id: generateId(),
        x: element.x + 20,
        y: element.y + 20,
      };
      
      return [...prev, newElement];
    });
    setSelectedId(generateId());
  }, []);

  const selectedElement = elements.find((el) => el.id === selectedId) || null;

  return {
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
  };
}
