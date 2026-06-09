"use client";

import { useEffect, useState } from "react";
import { fetchGalleryGroups, type GalleryPainting } from "@/lib/gonzo";

/**
 * Homepage "Featured Works" grid. Pulls live from Gonzo (same source as the
 * gallery page) and round-robins one painting per collection so the feature
 * stays varied — and never shows a painting Karen has removed.
 */
export default function FeaturedPaintings() {
  const [featured, setFeatured] = useState<GalleryPainting[]>([]);

  useEffect(() => {
    fetchGalleryGroups()
      .then((groups) => {
        const lists = groups.map((g) => [...g.paintings]);
        const picks: GalleryPainting[] = [];
        let i = 0;
        while (picks.length < 3 && lists.some((l) => l.length)) {
          const list = lists[i % lists.length];
          const next = list.shift();
          if (next) picks.push(next);
          i++;
        }
        setFeatured(picks);
      })
      .catch(() => setFeatured([]));
  }, []);

  // Render skeleton placeholders until paintings arrive (keeps layout stable).
  const cells: (GalleryPainting | null)[] =
    featured.length > 0 ? featured : [null, null, null];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {cells.map((painting, idx) => (
        <div
          key={painting?.key ?? `placeholder-${idx}`}
          className="flex flex-col items-center"
        >
          <div className="w-full aspect-[3/4] bg-border-subtle rounded-xl mb-4 overflow-hidden">
            {painting && (
              <img
                src={painting.imageUrl}
                alt={painting.alt}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
                style={{
                  objectPosition: `${painting.focalX}% ${painting.focalY}%`,
                }}
              />
            )}
          </div>
          <h3 className="font-heading text-[17px] font-semibold text-fg-primary">
            {painting?.title ?? " "}
          </h3>
          <p className="font-body text-[14px] text-fg-secondary mt-1">
            {painting?.collection ?? " "}
          </p>
        </div>
      ))}
    </div>
  );
}
