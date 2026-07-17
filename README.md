<div align="center">

# ai-benchmark

**A drag-and-drop stream overlay designer for OBS, built as an AI coding benchmark project.**

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-00D4C8.svg)

</div>

---

## What it does

A canvas-based editor for designing Twitch/OBS stream overlays: webcam frames, chat boxes, alert
boxes, goal bars, timers, and social/sponsor banners, arranged freely on a 1920x1080 canvas. Comes
with pre-built theme templates (Techy, Racing, E-Girl, Kawaii, Cyberpunk, Retro, Minimal) and
exports the finished layout as a PNG, animated GIF, or MP4 loop for use as a broadcast overlay.

## Features

- Drag-and-drop canvas built on Konva, with move/resize/rotate, layering (bring to front / send to
  back), duplication, and arrow-key nudging
- 11 widget types: webcam frames (16:9 / 4:3), chat box, text label, alert box, event list, goal
  bar, sponsor banner, social bar, timer, stinger
- One-click theme templates that lay out a full overlay in a chosen visual style
- Per-element style controls (fill, stroke, corner radius, opacity, glow, fonts) via the right
  sidebar
- Export to PNG / GIF / MP4
- Keyboard shortcuts (delete, duplicate, deselect, nudge)

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Canvas rendering | Konva / react-konva |
| UI components | shadcn/ui (Radix primitives) + Tailwind CSS |
| Forms/validation | react-hook-form + zod |

## Quick Start

```bash
git clone https://github.com/TheBooleanJulian/ai-benchmark
cd ai-benchmark/app
npm install
npm run dev
```

Other scripts (run from `app/`): `npm run build`, `npm run lint`, `npm run preview`.

## Project Structure

```
ai-benchmark/
|-- LICENSE
`-- app/
    `-- src/
        |-- components/
        |   |-- canvas/      Canvas workspace and element rendering
        |   |-- export/      Export dialog (PNG/GIF/MP4)
        |   |-- layout/      Header, left/right sidebars
        |   |-- templates/   Theme template picker
        |   `-- ui/          shadcn/ui component library
        |-- hooks/           Canvas state management
        |-- types/           Element/widget/theme type definitions
        `-- utils/           Export logic
```

## Status / Roadmap

- [x] Canvas editor with widget placement, styling, and layering
- [x] Theme templates
- [x] PNG/GIF/MP4 export
- [ ] Widget presets beyond the current 11 types

---

<div align="center">
<sub>Built by <a href="https://github.com/TheBooleanJulian">@TheBooleanJulian</a></sub>
</div>