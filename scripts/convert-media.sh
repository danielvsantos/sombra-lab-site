#!/bin/bash
# Converts .mov files in raw/ to optimized .mp4 files in public/assets/
# Also generates poster images (first frame as .jpg)
# Usage: npm run convert-media

set -e

RAW_DIR="raw"
OUT_DIR="public/assets"

if ! command -v ffmpeg &> /dev/null; then
  echo "FFmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi

if [ ! -d "$RAW_DIR" ]; then
  echo "No raw/ directory found. Create it and add .mov files."
  exit 1
fi

mkdir -p "$OUT_DIR"

find "$RAW_DIR" -name "*.mov" -o -name "*.MOV" | while read -r file; do
  filename=$(basename "$file" | sed 's/\.[^.]*$//')
  # Preserve subdirectory structure
  reldir=$(dirname "$file" | sed "s|^$RAW_DIR||" | sed 's|^/||')

  if [ -n "$reldir" ]; then
    mkdir -p "$OUT_DIR/$reldir"
    outpath="$OUT_DIR/$reldir/$filename"
  else
    outpath="$OUT_DIR/$filename"
  fi

  # Convert to MP4 (H.264, CRF 23, good quality/size balance)
  if [ ! -f "${outpath}.mp4" ]; then
    echo "Converting: $file -> ${outpath}.mp4"
    ffmpeg -i "$file" \
      -c:v libx264 \
      -preset slow \
      -crf 23 \
      -pix_fmt yuv420p \
      -movflags +faststart \
      -an \
      -y \
      "${outpath}.mp4"
  else
    echo "Skipping (exists): ${outpath}.mp4"
  fi

  # Generate poster image (first frame)
  if [ ! -f "${outpath}-poster.jpg" ]; then
    echo "Generating poster: ${outpath}-poster.jpg"
    ffmpeg -i "$file" \
      -vframes 1 \
      -q:v 2 \
      -y \
      "${outpath}-poster.jpg"
  else
    echo "Skipping (exists): ${outpath}-poster.jpg"
  fi
done

echo ""
echo "Done! Check file sizes:"
find "$OUT_DIR" -name "*.mp4" -exec ls -lh {} \;
echo ""
echo "Tip: For hero videos > 5MB, re-run with higher CRF:"
echo "  ffmpeg -i input.mov -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart -an output.mp4"
