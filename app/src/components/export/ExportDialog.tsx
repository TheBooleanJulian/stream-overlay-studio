import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { exportToPng, exportToGif, exportToMp4, downloadFile } from '@/utils/export';
import { EXPORT_FORMATS, type ExportFormat } from '@/types/overlay';
import type { CanvasElement } from '@/types/overlay';
import { toast } from 'sonner';
import { Loader2, Image, Film, Video, Download } from 'lucide-react';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  elements: CanvasElement[];
}

export function ExportDialog({ isOpen, onClose, elements }: ExportDialogProps) {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [isExporting, setIsExporting] = useState(false);
  const [duration, setDuration] = useState(3);
  const [fps, setFps] = useState(10);

  const handleExport = async () => {
    if (elements.length === 0) {
      toast.error('Add some elements before exporting!');
      return;
    }

    setIsExporting(true);

    try {
      switch (format) {
        case 'png': {
          const dataURL = exportToPng(elements);
          downloadFile(dataURL, `overlay-${Date.now()}.png`);
          toast.success('PNG exported successfully!');
          break;
        }
        case 'gif': {
          toast.info('Generating GIF... This may take a moment.');
          const gifBlob = await exportToGif(elements, duration * 1000, fps);
          downloadFile(gifBlob, `overlay-${Date.now()}.gif`);
          toast.success('GIF exported successfully!');
          break;
        }
        case 'mp4': {
          toast.info('Recording video... This may take a moment.');
          const mp4Blob = await exportToMp4(elements, duration * 1000, fps);
          downloadFile(mp4Blob, `overlay-${Date.now()}.webm`);
          toast.success('Video exported successfully!');
          break;
        }
      }
      onClose();
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatIcon = (formatId: ExportFormat) => {
    switch (formatId) {
      case 'png':
        return <Image className="w-5 h-5" />;
      case 'gif':
        return <Film className="w-5 h-5" />;
      case 'mp4':
        return <Video className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Export Overlay</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Choose your export format and settings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-zinc-300">Export Format</Label>
            <RadioGroup
              value={format}
              onValueChange={(value) => setFormat(value as ExportFormat)}
              className="grid grid-cols-1 gap-2"
            >
              {EXPORT_FORMATS.map((fmt) => (
                <div key={fmt.id}>
                  <RadioGroupItem
                    value={fmt.id}
                    id={fmt.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={fmt.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-zinc-700 bg-zinc-800/50 cursor-pointer transition-all hover:bg-zinc-800 peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:bg-violet-500/10"
                  >
                    <div className="text-zinc-400 peer-data-[state=checked]:text-violet-400">
                      {getFormatIcon(fmt.id)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-200">{fmt.name}</p>
                      <p className="text-xs text-zinc-500">{fmt.description}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Animation Settings (for GIF/MP4) */}
          {format !== 'png' && (
            <div className="space-y-4 pt-2 border-t border-zinc-800">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm text-zinc-400">Duration</Label>
                  <span className="text-sm text-zinc-300">{duration}s</span>
                </div>
                <Slider
                  value={[duration]}
                  onValueChange={([value]) => setDuration(value)}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm text-zinc-400">Frame Rate (FPS)</Label>
                  <span className="text-sm text-zinc-300">{fps} fps</span>
                </div>
                <Slider
                  value={[fps]}
                  onValueChange={([value]) => setFps(value)}
                  min={5}
                  max={30}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting || elements.length === 0}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white gap-2"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export {format.toUpperCase()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
