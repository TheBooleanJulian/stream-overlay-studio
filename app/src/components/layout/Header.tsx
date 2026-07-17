import { Button } from '@/components/ui/button';
import { Download, Layers, Wand2 } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
  elementCount: number;
}

export function Header({ onExport, elementCount }: HeaderProps) {
  return (
    <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
          <Layers className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">StreamOverlay Studio</h1>
          <p className="text-xs text-zinc-500">Create stunning stream overlays</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Stats */}
        <div className="hidden sm:flex items-center gap-4 text-xs text-zinc-500 mr-4">
          <span className="flex items-center gap-1">
            <Wand2 className="w-3 h-3" />
            {elementCount} element{elementCount !== 1 ? 's' : ''}
          </span>
        </div>

        <Button
          onClick={onExport}
          disabled={elementCount === 0}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Export Overlay
        </Button>
      </div>
    </header>
  );
}
