"use client";

import { useRef, useImperativeHandle, forwardRef } from "react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import type MuxPlayerElement from "@mux/mux-player";

/**
 * Muted, looping, autoplaying Mux video — used for homepage bento,
 * work page covers, and client-page gallery backgrounds.
 * Exposes pause/play via ref for scroll-triggered behavior.
 */

export interface MuxBackgroundVideoRef {
  play: () => void;
  pause: () => void;
}

interface Props {
  playbackId: string;
  className?: string;
  objectFit?: "cover" | "contain";
}

const MuxBackgroundVideo = forwardRef<MuxBackgroundVideoRef, Props>(
  function MuxBackgroundVideo(
    { playbackId, className, objectFit = "cover" },
    ref,
  ) {
    const playerRef = useRef<MuxPlayerElement | null>(null);

    useImperativeHandle(ref, () => ({
      play: () => {
        playerRef.current?.play().catch(() => {});
      },
      pause: () => {
        playerRef.current?.pause();
      },
    }));

    // Autoplay on mount so videos in the initial viewport start immediately.
    // Parent scroll observers can still pause out-of-view items afterwards.
    return (
      <MuxPlayer
        ref={playerRef}
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        thumbnailTime={0}
        style={{
          width: "100%",
          height: "100%",
          // Hide all player UI for background playback.
          // These are custom CSS properties consumed by mux-player.
          "--controls": "none",
          "--media-object-fit": objectFit,
        }}
        className={className}
      />
    );
  },
);

export default MuxBackgroundVideo;
