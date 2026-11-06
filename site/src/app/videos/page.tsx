"use client";

import { useEffect, useState } from "react";
import VideoDeck from "@/components/VideoDeck";
import { KAREN_WOLFRAM_RECENT, takeDeck } from "@/lib/video-deck";
import { fetchPlaylistVideos, type PlaylistVideo } from "@/lib/youtube";

export default function Videos() {
  const [videos, setVideos] = useState<PlaylistVideo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPlaylistVideos()
      .then((list) => setVideos(takeDeck(list)))
      .catch(() => {
        const fallback = takeDeck(KAREN_WOLFRAM_RECENT);
        if (fallback.length > 0) setVideos(fallback);
        else setError(true);
      });
  }, []);

  const loading = videos === null && !error;

  return (
    <>
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

      <section className="bg-surface-primary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {loading && (
            <div>
              <div className="w-full aspect-video bg-border-subtle rounded-xl animate-pulse" />
              <div className="h-6 w-2/3 bg-border-subtle rounded mt-5 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="w-full aspect-video bg-border-subtle rounded-xl mb-4 animate-pulse" />
                    <div className="h-4 w-3/4 bg-border-subtle rounded animate-pulse" />
                  </div>
                ))}
              </div>
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
            <VideoDeck key={videos.map((video) => video.videoId).join("|")} videos={videos} />
          )}
        </div>
      </section>
    </>
  );
}
