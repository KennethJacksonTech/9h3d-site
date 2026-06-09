"use client";

import { useEffect, useState } from "react";
import {
  fetchPlaylistVideos,
  hqResThumbnail,
  maxResThumbnail,
  type PlaylistVideo,
} from "@/lib/youtube";

export default function Videos() {
  const [videos, setVideos] = useState<PlaylistVideo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPlaylistVideos()
      .then(setVideos)
      .catch(() => setError(true));
  }, []);

  const loading = videos === null && !error;

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 text-center px-6 overflow-hidden">
        <img
          src="https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-creation/95328657-natural-terrace.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F2EDE6]/[0.375]" />
        <div className="relative z-10">
          <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-6">
            Watch &amp; Learn
          </p>
          <h1 className="font-heading text-[40px] md:text-[60px] font-bold text-fg-primary leading-tight mb-4">
            Video Teachings
          </h1>
          <p className="font-body text-[17px] text-fg-secondary max-w-xl mx-auto leading-relaxed">
            Episodes from The Karen Wolfram Project — painting tutorials, art
            history, and stories of faith from the studio.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-surface-primary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col">
                  <div className="w-full aspect-video bg-border-subtle rounded-xl mb-4 animate-pulse" />
                  <div className="h-4 w-3/4 bg-border-subtle rounded animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="text-center font-body text-[15px] text-fg-secondary">
              The video library is unavailable right now. Please visit our{" "}
              <a
                href="https://www.youtube.com/channel/UCK4dTWHI7g4DzTqNLK_fPcA"
                target="_blank"
                rel="noopener"
                className="text-accent underline hover:text-accent-secondary"
              >
                YouTube channel
              </a>{" "}
              to watch.
            </p>
          )}

          {!loading && !error && videos && videos.length === 0 && (
            <p className="text-center font-body text-[15px] text-fg-secondary">
              New teaching videos are on the way. Please check back soon.
            </p>
          )}

          {!loading && !error && videos && videos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <a
                  key={video.videoId}
                  href={video.watchUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col group"
                >
                  <div className="relative w-full aspect-video bg-border-subtle rounded-xl mb-4 overflow-hidden">
                    <img
                      src={maxResThumbnail(video.videoId)}
                      alt={video.title}
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        const fallback = hqResThumbnail(video.videoId);
                        if (img.src !== fallback) img.src = fallback;
                      }}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Play badge */}
                    <span className="absolute inset-0 flex items-center justify-center">
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
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
