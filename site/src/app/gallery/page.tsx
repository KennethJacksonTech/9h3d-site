"use client";

import { useEffect, useState } from "react";
import { fetchGalleryGroups, type GalleryGroup } from "@/lib/gonzo";

export default function Gallery() {
  const [groups, setGroups] = useState<GalleryGroup[] | null>(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState("All Works");

  useEffect(() => {
    fetchGalleryGroups()
      .then(setGroups)
      .catch(() => setError(true));
  }, []);

  const loading = groups === null && !error;
  const allPaintings = (groups ?? []).flatMap((g) => g.paintings);
  const filters = ["All Works", ...(groups ?? []).map((g) => g.title)];
  const filtered =
    active === "All Works"
      ? allPaintings
      : (groups ?? []).find((g) => g.title === active)?.paintings ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 text-center px-6 overflow-hidden">
        <img
          src="https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-work/8b4844cc-drowning-souls-hd.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F2EDE6]/[0.375]" />
        <div className="relative z-10">
          <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-6">
            The Gallery
          </p>
          <h1 className="font-heading text-[40px] md:text-[60px] font-bold text-fg-primary leading-tight mb-4">
            Karen&apos;s Paintings
          </h1>
          <p className="font-body text-[17px] text-fg-secondary">
            Explore two collections celebrating faith and the natural world.
          </p>
        </div>
      </section>

      {/* Filter Tabs + Grid */}
      <section className="bg-surface-primary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`font-body text-[13px] font-semibold tracking-[1px] px-5 py-2.5 rounded-full transition-colors ${
                  active === f
                    ? "bg-accent text-white"
                    : "border border-border-subtle text-fg-secondary hover:border-accent hover:text-accent"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Loading / empty states */}
          {loading && (
            <p className="text-center font-body text-[15px] text-fg-secondary">
              Loading the gallery&hellip;
            </p>
          )}
          {!loading && filtered.length === 0 && (
            <p className="text-center font-body text-[15px] text-fg-secondary">
              No paintings to show yet. Please check back soon.
            </p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((painting) => (
              <div key={painting.key} className="flex flex-col">
                <div className="w-full aspect-[3/4] bg-border-subtle rounded-xl mb-4 overflow-hidden">
                  <img
                    src={painting.imageUrl}
                    alt={painting.alt}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <h3 className="font-heading text-[17px] font-semibold text-fg-primary">
                  {painting.title}
                </h3>
                <p className="font-body text-[14px] text-fg-secondary mt-1">
                  {painting.collection} &middot; {painting.medium}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
