export type ElementType = 
  | 'webcam169' 
  | 'webcam43' 
  | 'chatbox' 
  | 'text'
  | 'alertbox'
  | 'eventlist'
  | 'goalbar'
  | 'sponsorbanner'
  | 'socialbar'
  | 'timer'
  | 'stinger';

export type ThemeStyle = 'techy' | 'racing' | 'egirl' | 'kawaii' | 'minimal' | 'retro' | 'cyberpunk';

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  // Style properties
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  opacity?: number;
  // Text properties
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  // Theme properties
  theme?: ThemeStyle;
  gradient?: string;
  glow?: boolean;
  animated?: boolean;
}

export interface WidgetPreset {
  type: ElementType;
  name: string;
  icon: string;
  category: 'basic' | 'interactive' | 'social' | 'theme';
  defaultWidth: number;
  defaultHeight: number;
  defaultProps: Partial<CanvasElement>;
}

export interface ThemeTemplate {
  id: string;
  name: string;
  style: ThemeStyle;
  description: string;
  previewColor: string;
  elements: Partial<CanvasElement>[];
  backgroundImage?: string;
  accentColor: string;
  secondaryColor: string;
}

export const WIDGET_PRESETS: WidgetPreset[] = [
  // Basic widgets
  {
    type: 'webcam169',
    name: 'Webcam 16:9',
    icon: 'Video',
    category: 'basic',
    defaultWidth: 320,
    defaultHeight: 180,
    defaultProps: {
      fill: 'transparent',
      stroke: '#8b5cf6',
      strokeWidth: 4,
      cornerRadius: 8,
      opacity: 1,
    },
  },
  {
    type: 'webcam43',
    name: 'Webcam 4:3',
    icon: 'Video',
    category: 'basic',
    defaultWidth: 240,
    defaultHeight: 180,
    defaultProps: {
      fill: 'transparent',
      stroke: '#8b5cf6',
      strokeWidth: 4,
      cornerRadius: 8,
      opacity: 1,
    },
  },
  {
    type: 'chatbox',
    name: 'Chatbox',
    icon: 'MessageSquare',
    category: 'basic',
    defaultWidth: 300,
    defaultHeight: 400,
    defaultProps: {
      fill: 'rgba(0, 0, 0, 0.6)',
      stroke: '#6366f1',
      strokeWidth: 2,
      cornerRadius: 12,
      opacity: 0.9,
    },
  },
  {
    type: 'text',
    name: 'Text Label',
    icon: 'Type',
    category: 'basic',
    defaultWidth: 200,
    defaultHeight: 40,
    defaultProps: {
      text: 'Recent Follower',
      fontSize: 24,
      fontFamily: 'Inter, sans-serif',
      textColor: '#ffffff',
      fill: 'transparent',
      stroke: 'transparent',
      strokeWidth: 0,
      opacity: 1,
    },
  },
  // Interactive widgets
  {
    type: 'alertbox',
    name: 'Alert Box',
    icon: 'Bell',
    category: 'interactive',
    defaultWidth: 500,
    defaultHeight: 150,
    defaultProps: {
      fill: 'rgba(139, 92, 246, 0.2)',
      stroke: '#8b5cf6',
      strokeWidth: 3,
      cornerRadius: 16,
      opacity: 1,
      text: 'New Follower!',
      fontSize: 32,
      textColor: '#ffffff',
      glow: true,
    },
  },
  {
    type: 'eventlist',
    name: 'Event List',
    icon: 'List',
    category: 'interactive',
    defaultWidth: 280,
    defaultHeight: 300,
    defaultProps: {
      fill: 'rgba(0, 0, 0, 0.5)',
      stroke: '#ec4899',
      strokeWidth: 2,
      cornerRadius: 12,
      opacity: 0.9,
    },
  },
  {
    type: 'goalbar',
    name: 'Goal Bar',
    icon: 'Target',
    category: 'interactive',
    defaultWidth: 400,
    defaultHeight: 60,
    defaultProps: {
      fill: 'rgba(34, 197, 94, 0.3)',
      stroke: '#22c55e',
      strokeWidth: 3,
      cornerRadius: 30,
      opacity: 1,
      text: 'Sub Goal: 45/100',
      fontSize: 20,
      textColor: '#ffffff',
    },
  },
  // Social widgets
  {
    type: 'socialbar',
    name: 'Social Bar',
    icon: 'Share2',
    category: 'social',
    defaultWidth: 350,
    defaultHeight: 50,
    defaultProps: {
      fill: 'rgba(0, 0, 0, 0.7)',
      stroke: '#06b6d4',
      strokeWidth: 2,
      cornerRadius: 25,
      opacity: 1,
      text: '@username',
      fontSize: 18,
      textColor: '#06b6d4',
    },
  },
  {
    type: 'sponsorbanner',
    name: 'Sponsor Banner',
    icon: 'Star',
    category: 'social',
    defaultWidth: 200,
    defaultHeight: 80,
    defaultProps: {
      fill: 'rgba(234, 179, 8, 0.2)',
      stroke: '#eab308',
      strokeWidth: 2,
      cornerRadius: 8,
      opacity: 1,
      text: 'Sponsor',
      fontSize: 16,
      textColor: '#eab308',
    },
  },
  // Utility widgets
  {
    type: 'timer',
    name: 'Timer',
    icon: 'Clock',
    category: 'interactive',
    defaultWidth: 150,
    defaultHeight: 60,
    defaultProps: {
      fill: 'rgba(239, 68, 68, 0.2)',
      stroke: '#ef4444',
      strokeWidth: 2,
      cornerRadius: 8,
      opacity: 1,
      text: '00:00:00',
      fontSize: 28,
      textColor: '#ef4444',
      fontFamily: 'monospace',
    },
  },
];

// Theme templates with pre-designed layouts
export const THEME_TEMPLATES: ThemeTemplate[] = [
  {
    id: 'techy-dark',
    name: 'Techy Dark',
    style: 'techy',
    description: 'Sleek cyber aesthetic with neon accents',
    previewColor: 'from-cyan-500 to-blue-600',
    accentColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    elements: [
      {
        type: 'webcam169',
        x: 50,
        y: 50,
        width: 400,
        height: 225,
        stroke: '#06b6d4',
        strokeWidth: 3,
        cornerRadius: 4,
        glow: true,
      },
      {
        type: 'chatbox',
        x: 50,
        y: 300,
        width: 350,
        height: 450,
        fill: 'rgba(6, 182, 212, 0.1)',
        stroke: '#06b6d4',
        strokeWidth: 2,
        cornerRadius: 8,
      },
      {
        type: 'alertbox',
        x: 710,
        y: 50,
        width: 500,
        height: 120,
        fill: 'rgba(6, 182, 212, 0.15)',
        stroke: '#06b6d4',
        strokeWidth: 2,
        text: 'New Follower!',
        textColor: '#06b6d4',
      },
      {
        type: 'socialbar',
        x: 710,
        y: 980,
        width: 500,
        height: 50,
        fill: 'rgba(6, 182, 212, 0.1)',
        stroke: '#06b6d4',
        text: 'twitch.tv/username',
        textColor: '#06b6d4',
      },
    ],
  },
  {
    id: 'racing-speed',
    name: 'Racing Speed',
    style: 'racing',
    description: 'High-octane racing theme with checkered patterns',
    previewColor: 'from-red-600 to-yellow-500',
    accentColor: '#ef4444',
    secondaryColor: '#eab308',
    elements: [
      {
        type: 'webcam169',
        x: 1470,
        y: 50,
        width: 400,
        height: 225,
        stroke: '#ef4444',
        strokeWidth: 4,
        cornerRadius: 0,
      },
      {
        type: 'chatbox',
        x: 1470,
        y: 300,
        width: 400,
        height: 450,
        fill: 'rgba(0, 0, 0, 0.8)',
        stroke: '#ef4444',
        strokeWidth: 3,
        cornerRadius: 0,
      },
      {
        type: 'goalbar',
        x: 50,
        y: 980,
        width: 600,
        height: 70,
        fill: 'rgba(239, 68, 68, 0.3)',
        stroke: '#ef4444',
        strokeWidth: 3,
        text: 'LAP: 12/50',
        textColor: '#ffffff',
      },
      {
        type: 'timer',
        x: 50,
        y: 50,
        width: 200,
        height: 70,
        fill: 'rgba(0, 0, 0, 0.8)',
        stroke: '#eab308',
        strokeWidth: 3,
        text: '01:23:45',
        textColor: '#eab308',
      },
    ],
  },
  {
    id: 'egirl-pastel',
    name: 'E-Girl Pastel',
    style: 'egirl',
    description: 'Soft pastel aesthetic with hearts and sparkles',
    previewColor: 'from-pink-400 to-purple-400',
    accentColor: '#ec4899',
    secondaryColor: '#a855f7',
    elements: [
      {
        type: 'webcam169',
        x: 50,
        y: 50,
        width: 380,
        height: 214,
        stroke: '#ec4899',
        strokeWidth: 4,
        cornerRadius: 20,
      },
      {
        type: 'chatbox',
        x: 50,
        y: 280,
        width: 320,
        height: 400,
        fill: 'rgba(236, 72, 153, 0.15)',
        stroke: '#ec4899',
        strokeWidth: 3,
        cornerRadius: 20,
      },
      {
        type: 'eventlist',
        x: 1570,
        y: 50,
        width: 300,
        height: 350,
        fill: 'rgba(168, 85, 247, 0.15)',
        stroke: '#a855f7',
        strokeWidth: 3,
        cornerRadius: 16,
      },
      {
        type: 'alertbox',
        x: 710,
        y: 850,
        width: 500,
        height: 130,
        fill: 'rgba(236, 72, 153, 0.2)',
        stroke: '#ec4899',
        strokeWidth: 3,
        text: '💕 New Follower! 💕',
        textColor: '#ec4899',
      },
    ],
  },
  {
    id: 'kawaii-cute',
    name: 'Kawaii Cute',
    style: 'kawaii',
    description: 'Adorable kawaii theme with rounded corners',
    previewColor: 'from-yellow-300 to-pink-400',
    accentColor: '#fbbf24',
    secondaryColor: '#f472b6',
    elements: [
      {
        type: 'webcam43',
        x: 50,
        y: 50,
        width: 280,
        height: 210,
        stroke: '#fbbf24',
        strokeWidth: 5,
        cornerRadius: 30,
      },
      {
        type: 'chatbox',
        x: 50,
        y: 280,
        width: 300,
        height: 380,
        fill: 'rgba(251, 191, 36, 0.2)',
        stroke: '#fbbf24',
        strokeWidth: 4,
        cornerRadius: 25,
      },
      {
        type: 'goalbar',
        x: 710,
        y: 50,
        width: 500,
        height: 60,
        fill: 'rgba(244, 114, 182, 0.25)',
        stroke: '#f472b6',
        strokeWidth: 4,
        cornerRadius: 30,
        text: '🌟 Sub Goal: 25/50 🌟',
        textColor: '#f472b6',
      },
      {
        type: 'text',
        x: 710,
        y: 980,
        width: 500,
        height: 50,
        text: '✨ Thanks for watching! ✨',
        fontSize: 28,
        textColor: '#fbbf24',
      },
    ],
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    style: 'cyberpunk',
    description: 'Neon-drenched cyberpunk aesthetic',
    previewColor: 'from-fuchsia-500 to-cyan-400',
    accentColor: '#d946ef',
    secondaryColor: '#22d3ee',
    elements: [
      {
        type: 'webcam169',
        x: 1470,
        y: 50,
        width: 400,
        height: 225,
        stroke: '#d946ef',
        strokeWidth: 3,
        cornerRadius: 0,
        glow: true,
      },
      {
        type: 'chatbox',
        x: 1470,
        y: 300,
        width: 400,
        height: 450,
        fill: 'rgba(217, 70, 239, 0.1)',
        stroke: '#22d3ee',
        strokeWidth: 2,
        cornerRadius: 0,
      },
      {
        type: 'alertbox',
        x: 710,
        y: 50,
        width: 500,
        height: 120,
        fill: 'rgba(217, 70, 239, 0.15)',
        stroke: '#d946ef',
        strokeWidth: 2,
        text: 'SYSTEM ALERT',
        textColor: '#22d3ee',
        fontFamily: 'monospace',
      },
      {
        type: 'socialbar',
        x: 50,
        y: 980,
        width: 400,
        height: 50,
        fill: 'rgba(34, 211, 238, 0.1)',
        stroke: '#22d3ee',
        text: 'NETRUNNER_2077',
        textColor: '#22d3ee',
        fontFamily: 'monospace',
      },
    ],
  },
  {
    id: 'retro-arcade',
    name: 'Retro Arcade',
    style: 'retro',
    description: '8-bit retro gaming aesthetic',
    previewColor: 'from-green-400 to-purple-600',
    accentColor: '#4ade80',
    secondaryColor: '#9333ea',
    elements: [
      {
        type: 'webcam43',
        x: 50,
        y: 50,
        width: 240,
        height: 180,
        stroke: '#4ade80',
        strokeWidth: 4,
        cornerRadius: 0,
      },
      {
        type: 'chatbox',
        x: 50,
        y: 250,
        width: 280,
        height: 400,
        fill: 'rgba(0, 0, 0, 0.9)',
        stroke: '#4ade80',
        strokeWidth: 4,
        cornerRadius: 0,
      },
      {
        type: 'goalbar',
        x: 710,
        y: 980,
        width: 500,
        height: 60,
        fill: 'rgba(147, 51, 234, 0.3)',
        stroke: '#9333ea',
        strokeWidth: 4,
        cornerRadius: 0,
        text: 'HIGH SCORE: 99999',
        textColor: '#4ade80',
        fontFamily: 'monospace',
      },
      {
        type: 'timer',
        x: 1620,
        y: 980,
        width: 250,
        height: 60,
        fill: 'rgba(0, 0, 0, 0.9)',
        stroke: '#4ade80',
        strokeWidth: 4,
        text: 'CREDITS: 99',
        textColor: '#4ade80',
        fontFamily: 'monospace',
      },
    ],
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    style: 'minimal',
    description: 'Clean and minimal design for professional streams',
    previewColor: 'from-gray-200 to-gray-400',
    accentColor: '#e5e7eb',
    secondaryColor: '#9ca3af',
    elements: [
      {
        type: 'webcam169',
        x: 50,
        y: 50,
        width: 360,
        height: 202,
        stroke: '#e5e7eb',
        strokeWidth: 2,
        cornerRadius: 8,
      },
      {
        type: 'chatbox',
        x: 50,
        y: 270,
        width: 300,
        height: 380,
        fill: 'rgba(255, 255, 255, 0.05)',
        stroke: '#9ca3af',
        strokeWidth: 1,
        cornerRadius: 8,
      },
      {
        type: 'socialbar',
        x: 710,
        y: 980,
        width: 500,
        height: 45,
        fill: 'transparent',
        stroke: '#e5e7eb',
        strokeWidth: 1,
        text: 'username',
        textColor: '#e5e7eb',
      },
    ],
  },
];

export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 1080;

export const EXPORT_FORMATS = [
  { id: 'png', name: 'PNG Image', extension: 'png', description: 'Static overlay for OBS' },
  { id: 'gif', name: 'GIF Animation', extension: 'gif', description: 'Animated overlay (3s loop)' },
  { id: 'mp4', name: 'MP4 Video', extension: 'mp4', description: 'Video background (5s loop)' },
] as const;

export type ExportFormat = typeof EXPORT_FORMATS[number]['id'];
