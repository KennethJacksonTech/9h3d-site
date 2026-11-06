"use client";

import { useState } from "react";
import {
  hqResThumbnail,
  maxResThumbnail,
  type PlaylistVideo,
} from "@/lib/youtube";
import { embedUrl, swapFeatured } from "@/lib/video-deck";

export default function VideoDeck({ videos }: { videos: PlaylistVideo[] }) {
  const [order, setOrder] = useState(videos);
  const featured = order[0];
  const previous = order.slice(1);

  if (!featured) return null;

  return (
    <div>
      <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-4">
        Now Playing
      </p>
      <div className="relative w-full aspect-video bg-surface-inverse rounded-xl overflow-hidden">
        <iframe
          key={featured.videoId}
          src={embedUrl(featured.videoId)}
          title={featured.title}
          data-testid="now-playing-frame"
          data-video-id={featured.videoId}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      <h2
        data-testid="now-playing-title"
        className="font-heading text-[26px] md:text-[32px] font-bold text-fg-primary leading-snug mt-5"
      >
        {featured.title}
      </h2>
      <a
        href={featured.watchUrl}
        target="_blank"
        rel="noopener"
        className="inline-block mt-3 font-body text-[14px] font-semibold tracking-wide text-accent hover:text-accent-secondary"
      >
        Watch on YouTube
      </a>

      {previous.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-[28px] md:text-[36px] font-bold text-fg-primary mb-8">
            Previous Videos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {previous.map((video, index) => (
              <button
                key={video.videoId}
                type="button"
                data-testid="previous-video"
                data-video-id={video.videoId}
                onClick={() => {
                  setOrder((current) => swapFeatured(current, index));
                }}
                className="flex flex-col text-left group cursor-pointer bg-transparent border-0 p-0"
              >
                <div className="relative w-full aspect-video bg-border-subtle rounded-xl mb-4 overflow-hidden">
                  <img
                    src={maxResThumbnail(video.videoId)}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget;
                      const fallback = hqResThumbnail(video.videoId);
                      if (img.src !== fallback) img.src = fallback;
                    }}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-black/55 transition-colors group-hover:bg-accent">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <h3 className="font-heading text-[16px] font-semibold text-fg-primary leading-snug group-hover:text-accent transition-colors">
                  {video.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
