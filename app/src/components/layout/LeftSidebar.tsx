import { useState } from 'react';
import { WIDGET_PRESETS } from '@/types/overlay';
import type { ElementType, ThemeTemplate } from '@/types/overlay';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TemplatePanel } from '@/components/templates/TemplatePanel';
import {
  Video,
  MessageSquare,
  Type,
  Bell,
  List,
  Target,
  Share2,
  Star,
  Clock,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Video,
  MessageSquare,
  Type,
  Bell,
  List,
  Target,
  Share2,
  Star,
  Clock,
};

interface LeftSidebarProps {
  onDragStart: (type: ElementType) => void;
  onApplyTemplate: (template: ThemeTemplate) => void;
  onClearCanvas: () => void;
  elementCount: number;
}

export function LeftSidebar({ onDragStart, onApplyTemplate, onClearCanvas, elementCount }: LeftSidebarProps) {
  const [activeTab, setActiveTab] = useState('widgets');

  const basicWidgets = WIDGET_PRESETS.filter((w) => w.category === 'basic');
  const interactiveWidgets = WIDGET_PRESETS.filter((w) => w.category === 'interactive');
  const socialWidgets = WIDGET_PRESETS.filter((w) => w.category === 'social');

  const renderWidgetCard = (widget: typeof WIDGET_PRESETS[0]) => {
    const Icon = iconMap[widget.icon];
    return (
      <Card
        key={widget.type}
        draggable
        onDragStart={() => onDragStart(widget.type)}
        className="p-3 bg-zinc-800/50 border-zinc-700 cursor-grab active:cursor-grabbing hover:bg-zinc-800 hover:border-violet-500/50 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-700/50 rounded-lg flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
            {Icon && <Icon className="w-5 h-5 text-zinc-400 group-hover:text-violet-400" />}
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">{widget.name}</p>
            <p className="text-xs text-zinc-500">
              {widget.defaultWidth}×{widget.defaultHeight}
            </p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <aside className="w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <div className="p-3 border-b border-zinc-800">
          <TabsList className="w-full grid grid-cols-2 bg-zinc-800">
            <TabsTrigger value="widgets" className="data-[state=active]:bg-violet-600">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Widgets
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-violet-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Themes
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="widgets" className="flex-1 flex flex-col m-0 mt-0 data-[state=inactive]:hidden">
          <div className="p-3 pb-0">
            <p className="text-xs text-zinc-500 mb-3">
              Drag widgets to the canvas
            </p>
          </div>
          
          <ScrollArea className="flex-1 px-3 pb-3">
            <div className="space-y-4">
              {/* Basic Widgets */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Basic
                </h3>
                <div className="space-y-2">
                  {basicWidgets.map(renderWidgetCard)}
                </div>
              </div>

              {/* Interactive Widgets */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Interactive
                </h3>
                <div className="space-y-2">
                  {interactiveWidgets.map(renderWidgetCard)}
                </div>
              </div>

              {/* Social Widgets */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Social
                </h3>
                <div className="space-y-2">
                  {socialWidgets.map(renderWidgetCard)}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="templates" className="flex-1 flex flex-col m-0 mt-0 data-[state=inactive]:hidden">
          <TemplatePanel
            onApplyTemplate={onApplyTemplate}
            onClearCanvas={onClearCanvas}
            elementCount={elementCount}
          />
        </TabsContent>
      </Tabs>
    </aside>
  );
}
