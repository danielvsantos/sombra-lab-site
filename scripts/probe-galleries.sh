#!/bin/bash
# Probe all gallery files in public/assets/clients/* and output their aspect ratios as JSON
# Usage: bash scripts/probe-galleries.sh > src/data/gallery-meta.json

set -e

echo "{"
first_client=true

for client_dir in public/assets/clients/*/; do
  client=$(basename "$client_dir")
  [ "$first_client" = true ] && first_client=false || echo ","
  echo -n "  \"$client\": {"

  first_item=true
  for file in "$client_dir"/gallery-*.jpg "$client_dir"/gallery-*.mp4; do
    [ -f "$file" ] || continue
    # Skip poster files
    case "$file" in *-poster.jpg) continue ;; esac

    name=$(basename "$file")

    # Get dimensions
    case "$file" in
      *.jpg)
        dims=$(sips -g pixelWidth -g pixelHeight "$file" 2>/dev/null | awk '/pixelWidth/ {w=$2} /pixelHeight/ {h=$2} END {print w","h}')
        ;;
      *.mp4)
        dims=$(ffprobe -v quiet -show_entries stream=width,height -of csv=p=0 "$file" 2>/dev/null | head -1)
        ;;
    esac

    [ -z "$dims" ] && continue
    w=${dims%,*}
    h=${dims#*,}
    [ -z "$w" ] || [ -z "$h" ] && continue

    # Calculate aspect ratio
    ratio=$(echo "scale=4; $w / $h" | bc)
    if [ "$(echo "$ratio < 0.85" | bc)" = "1" ]; then
      aspect="vertical"
    elif [ "$(echo "$ratio > 1.15" | bc)" = "1" ]; then
      aspect="horizontal"
    else
      aspect="square"
    fi

    [ "$first_item" = true ] && first_item=false || echo -n ","
    echo -n $'\n'"    \"$name\": \"$aspect\""
  done
  echo $'\n'"  }"
done

echo "}"
