# Asset Management Guide

## Naming Convention

All raw assets go in the `raw/` folder. The conversion script (`npm run convert-media`) processes them into `public/assets/`.

### Work Page Covers
Place one file per client in `raw/work/`:
```
raw/work/{client-slug}.mov    → Video cover (converted to MP4)
raw/work/{client-slug}.jpg    → Image cover (resized)
```
Examples: `raw/work/abac.mov`, `raw/work/angle.jpg`

### Homepage Bento Videos
```
raw/homepage/reel-1.mov
raw/homepage/reel-2.mov
raw/homepage/reel-3.mov
```

### Client Page Assets
Each client gets a folder in `raw/clients/`:
```
raw/clients/{client-slug}/
  hero.jpg (or hero.mov)       → Hero image/video at top of client page
  gallery-1.jpg                → Gallery items (numbered sequentially)
  gallery-2.mov
  gallery-3.jpg
  ...
```

### Client Info (for auto-generation - future)
```
raw/clients/{client-slug}/info.txt
```
Format:
```
title: Brava Sushi
category: gastronomy
services: Audiovisual Production, Social Media Management
brief: Your brief text here...
instagram: @bravasushi
featured: true
```

## Client Slugs
Use lowercase, hyphenated names:
- abac, atempo, angle, brava-sushi, buriti, pinga, manta, nooda-organics, pov-beauty, paka

## Supported Formats
- **Images:** .jpg, .png (auto-resized to max 1600px, optimized quality)
- **Videos:** .mov, .mp4 (converted to H.264 MP4, max 1080p, muted for web)

## Running Conversion
```bash
npm run convert-media
```
Requires FFmpeg: `brew install ffmpeg`

## After Conversion
- Images appear in `public/assets/clients/{slug}/`
- Videos appear as `.mp4` with matching `-poster.jpg` files
- Update `src/data/projects.ts` to reference the new files
