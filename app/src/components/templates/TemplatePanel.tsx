import { useState } from 'react';
import { THEME_TEMPLATES } from '@/types/overlay';
import type { ThemeTemplate } from '@/types/overlay';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Check, Layers, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface TemplatePanelProps {
  onApplyTemplate: (template: ThemeTemplate) => void;
  onClearCanvas: () => void;
  elementCount: number;
}

type TemplateCategory = 'all' | 'techy' | 'racing' | 'egirl' | 'kawaii' | 'cyberpunk' | 'retro' | 'minimal';

export function TemplatePanel({ onApplyTemplate, onClearCanvas, elementCount }: TemplatePanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');
  const [appliedTemplateId, setAppliedTemplateId] = useState<string | null>(null);

  const categories: { id: TemplateCategory; name: string; color: string }[] = [
    { id: 'all', name: 'All', color: 'bg-zinc-600' },
    { id: 'techy', name: 'Techy', color: 'bg-cyan-600' },
    { id: 'racing', name: 'Racing', color: 'bg-red-600' },
    { id: 'egirl', name: 'E-Girl', color: 'bg-pink-600' },
    { id: 'kawaii', name: 'Kawaii', color: 'bg-yellow-500' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: 'bg-fuchsia-600' },
    { id: 'retro', name: 'Retro', color: 'bg-green-600' },
    { id: 'minimal', name: 'Minimal', color: 'bg-gray-500' },
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? THEME_TEMPLATES
    : THEME_TEMPLATES.filter((t) => t.style === selectedCategory);

  const handleApplyTemplate = (template: ThemeTemplate) => {
    onApplyTemplate(template);
    setAppliedTemplateId(template.id);
    toast.success(`Applied "${template.name}" template!`);
  };

  const handleClearCanvas = () => {
    onClearCanvas();
    setAppliedTemplateId(null);
    toast.info('Canvas cleared');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Category Filter */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          Theme Styles
        </h3>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? `${cat.color} text-white`
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Templates Grid */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`relative overflow-hidden border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-all group cursor-pointer ${
                appliedTemplateId === template.id ? 'ring-2 ring-violet-500' : ''
              }`}
              onClick={() => handleApplyTemplate(template)}
            >
              {/* Preview Gradient */}
              <div className={`h-20 bg-gradient-to-br ${template.previewColor} opacity-80`} />
              
              {/* Content */}
              <div className="p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-200">{template.name}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{template.description}</p>
                  </div>
                  {appliedTemplateId === template.id && (
                    <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30">
                      <Check className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-500">
                    {template.elements.length} elements
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="text-xs border-zinc-700 capitalize"
                    style={{ color: template.accentColor, borderColor: template.accentColor + '40' }}
                  >
                    {template.style}
                  </Badge>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="sm" className="bg-violet-600 hover:bg-violet-500">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Canvas Actions */}
      <div className="p-4 border-t border-zinc-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3" />
            {elementCount} element{elementCount !== 1 ? 's' : ''}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearCanvas}
          disabled={elementCount === 0}
          className="w-full border-zinc-700 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Canvas
        </Button>
      </div>
    </div>
  );
}
