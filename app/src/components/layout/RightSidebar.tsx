import type { CanvasElement } from '@/types/overlay';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Copy,
  Trash2,
  Layers,
  FlipVertical,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface RightSidebarProps {
  selectedElement: CanvasElement | null;
  onUpdate: (id: string, updates: Partial<CanvasElement>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down' | 'left' | 'right', amount?: number) => void;
  onBringToFront: (id: string) => void;
  onSendToBack: (id: string) => void;
}

export function RightSidebar({ 
  selectedElement, 
  onUpdate, 
  onDelete, 
  onDuplicate,
  onMove,
  onBringToFront,
  onSendToBack,
}: RightSidebarProps) {
  if (!selectedElement) {
    return (
      <aside className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            Properties
          </h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 text-zinc-600" />
          </div>
          <p className="text-sm text-zinc-500">
            Select an element on the canvas to edit its properties
          </p>
          <p className="text-xs text-zinc-600 mt-2">
            Click any widget to select it
          </p>
        </div>
      </aside>
    );
  }

  const handleUpdate = (updates: Partial<CanvasElement>) => {
    onUpdate(selectedElement.id, updates);
  };

  const handleDelete = () => {
    onDelete(selectedElement.id);
    toast.info('Element deleted');
  };

  const handleDuplicate = () => {
    onDuplicate(selectedElement.id);
    toast.success('Element duplicated');
  };

  const isTextOnly = selectedElement.type === 'text';
  const hasFill = selectedElement.fill !== undefined && !isTextOnly;
  const hasStroke = selectedElement.stroke !== undefined;
  const hasText = selectedElement.text !== undefined;

  return (
    <aside className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col shrink-0 overflow-hidden">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            Properties
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5 capitalize">
            {selectedElement.type.replace(/\d/, ' $&').replace(/([A-Z])/g, ' $1').trim()}
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDuplicate}
            className="h-8 w-8 text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10"
            title="Duplicate"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Quick Actions */}
        <Card className="p-3 bg-zinc-800/50 border-zinc-700">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase mb-3">Quick Actions</h3>
          
          {/* Nudge Controls */}
          <div className="grid grid-cols-3 gap-1 mb-3">
            <div />
            <Button
              variant="outline"
              size="icon"
              onClick={() => onMove(selectedElement.id, 'up')}
              className="h-8 border-zinc-700 hover:bg-zinc-700"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <div />
            <Button
              variant="outline"
              size="icon"
              onClick={() => onMove(selectedElement.id, 'left')}
              className="h-8 border-zinc-700 hover:bg-zinc-700"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onMove(selectedElement.id, 'down')}
              className="h-8 border-zinc-700 hover:bg-zinc-700"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onMove(selectedElement.id, 'right')}
              className="h-8 border-zinc-700 hover:bg-zinc-700"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Layer Controls */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBringToFront(selectedElement.id)}
              className="flex-1 border-zinc-700 text-xs"
            >
              <FlipVertical className="w-3 h-3 mr-1" />
              To Front
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSendToBack(selectedElement.id)}
              className="flex-1 border-zinc-700 text-xs"
            >
              <FlipVertical className="w-3 h-3 mr-1 rotate-180" />
              To Back
            </Button>
          </div>
        </Card>

        {/* Position & Size */}
        <Card className="p-4 bg-zinc-800/50 border-zinc-700 space-y-4">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase">Position & Size</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-500">X Position</Label>
              <Input
                type="number"
                value={Math.round(selectedElement.x)}
                onChange={(e) => handleUpdate({ x: Number(e.target.value) })}
                className="h-8 bg-zinc-900 border-zinc-700 text-zinc-200 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-500">Y Position</Label>
              <Input
                type="number"
                value={Math.round(selectedElement.y)}
                onChange={(e) => handleUpdate({ y: Number(e.target.value) })}
                className="h-8 bg-zinc-900 border-zinc-700 text-zinc-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-500">Width</Label>
              <Input
                type="number"
                value={Math.round(selectedElement.width)}
                onChange={(e) => handleUpdate({ width: Number(e.target.value) })}
                className="h-8 bg-zinc-900 border-zinc-700 text-zinc-200 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-500">Height</Label>
              <Input
                type="number"
                value={Math.round(selectedElement.height)}
                onChange={(e) => handleUpdate({ height: Number(e.target.value) })}
                className="h-8 bg-zinc-900 border-zinc-700 text-zinc-200 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-500">Rotation</Label>
            <div className="flex items-center gap-3">
              <Slider
                value={[selectedElement.rotation || 0]}
                onValueChange={([value]) => handleUpdate({ rotation: value })}
                min={-180}
                max={180}
                step={5}
                className="flex-1"
              />
              <span className="text-xs text-zinc-400 w-12 text-right">
                {selectedElement.rotation || 0}°
              </span>
            </div>
          </div>
        </Card>

        <Separator className="bg-zinc-800" />

        {/* Appearance */}
        <Card className="p-4 bg-zinc-800/50 border-zinc-700 space-y-4">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase">Appearance</h3>

          {/* Border Color */}
          {hasStroke && (
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-500">Border Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={selectedElement.stroke || '#000000'}
                  onChange={(e) => handleUpdate({ stroke: e.target.value })}
                  className="h-8 w-12 p-1 bg-zinc-900 border-zinc-700"
                />
                <Input
                  type="text"
                  value={selectedElement.stroke || ''}
                  onChange={(e) => handleUpdate({ stroke: e.target.value })}
                  className="h-8 flex-1 bg-zinc-900 border-zinc-700 text-zinc-200 text-sm"
                  placeholder="#8b5cf6"
                />
              </div>
            </div>
          )}

          {/* Fill Color */}
          {hasFill && (
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-500">Fill Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={selectedElement.fill?.startsWith('#') ? selectedElement.fill : '#000000'}
                  onChange={(e) => handleUpdate({ fill: e.target.value })}
                  className="h-8 w-12 p-1 bg-zinc-900 border-zinc-700"
                />
                <Input
                  type="text"
                  value={selectedElement.fill || ''}
                  onChange={(e) => handleUpdate({ fill: e.target.value })}
                  className="h-8 flex-1 bg-zinc-900 border-zinc-700 text-zinc-200 text-sm"
                  placeholder="transparent or rgba(0,0,0,0.5)"
                />
              </div>
            </div>
          )}

          {/* Text Color */}
          {hasText && (
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-500">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={selectedElement.textColor || '#ffffff'}
                  onChange={(e) => handleUpdate({ textColor: e.target.value })}
                  className="h-8 w-12 p-1 bg-zinc-900 border-zinc-700"
                />
                <Input
                  type="text"
                  value={selectedElement.textColor || ''}
                  onChange={(e) => handleUpdate({ textColor: e.target.value })}
                  className="h-8 flex-1 bg-zinc-900 border-zinc-700 text-zinc-200 text-sm"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          )}

          {/* Border Thickness */}
          {selectedElement.strokeWidth !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-xs text-zinc-500">Border Thickness</Label>
                <span className="text-xs text-zinc-400">{selectedElement.strokeWidth}px</span>
              </div>
              <Slider
                value={[selectedElement.strokeWidth || 0]}
                onValueChange={([value]) => handleUpdate({ strokeWidth: value })}
                min={0}
                max={20}
                step={1}
                className="w-full"
              />
            </div>
          )}

          {/* Border Radius */}
          {selectedElement.cornerRadius !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-xs text-zinc-500">Border Radius</Label>
                <span className="text-xs text-zinc-400">{selectedElement.cornerRadius}px</span>
              </div>
              <Slider
                value={[selectedElement.cornerRadius || 0]}
                onValueChange={([value]) => handleUpdate({ cornerRadius: value })}
                min={0}
                max={50}
                step={1}
                className="w-full"
              />
            </div>
          )}

          {/* Opacity */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs text-zinc-500">Opacity</Label>
              <span className="text-xs text-zinc-400">
                {Math.round((selectedElement.opacity || 1) * 100)}%
              </span>
            </div>
            <Slider
              value={[Math.round((selectedElement.opacity || 1) * 100)]}
              onValueChange={([value]) => handleUpdate({ opacity: value / 100 })}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          {/* Glow Effect */}
          <div className="flex items-center justify-between pt-2">
            <Label className="text-xs text-zinc-500 flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Glow Effect
            </Label>
            <Switch
              checked={selectedElement.glow || false}
              onCheckedChange={(checked) => handleUpdate({ glow: checked })}
            />
          </div>
        </Card>

        {/* Text Content */}
        {hasText && (
          <>
            <Separator className="bg-zinc-800" />
            <Card className="p-4 bg-zinc-800/50 border-zinc-700 space-y-4">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase">Text Content</h3>
              
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-500">Text</Label>
                <Input
                  type="text"
                  value={selectedElement.text || ''}
                  onChange={(e) => handleUpdate({ text: e.target.value })}
                  className="h-8 bg-zinc-900 border-zinc-700 text-zinc-200 text-sm"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-zinc-500">Font Size</Label>
                  <span className="text-xs text-zinc-400">{selectedElement.fontSize}px</span>
                </div>
                <Slider
                  value={[selectedElement.fontSize || 24]}
                  onValueChange={([value]) => handleUpdate({ fontSize: value })}
                  min={12}
                  max={72}
                  step={2}
                  className="w-full"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-500">Font Family</Label>
                <Input
                  type="text"
                  value={selectedElement.fontFamily || ''}
                  onChange={(e) => handleUpdate({ fontFamily: e.target.value })}
                  className="h-8 bg-zinc-900 border-zinc-700 text-zinc-200 text-sm"
                  placeholder="Inter, sans-serif"
                />
              </div>
            </Card>
          </>
        )}
      </div>
    </aside>
  );
}
