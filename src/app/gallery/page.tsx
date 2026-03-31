"use client";

import { useState } from "react";

type Collection = "All Works" | "God's Work" | "God's Creation";

const paintings = [
  { title: "The Good Shepherd", collection: "God's Work" as const, medium: "Oil on Canvas" },
  { title: "Mountain Majesty", collection: "God's Creation" as const, medium: "Oil on Canvas" },
  { title: "Path of Light", collection: "God's Work" as const, medium: "Oil on Canvas" },
  { title: "Texas Wildflowers", collection: "God's Creation" as const, medium: "Oil on Canvas" },
  { title: "The Last Supper", collection: "God's Work" as const, medium: "Oil on Canvas" },
  { title: "Palo Duro Canyon", collection: "God's Creation" as const, medium: "Oil on Canvas" },
];

const filters: Collection[] = ["All Works", "God's Work", "God's Creation"];

export default function Gallery() {
  const [active, setActive] = useState<Collection>("All Works");

  const filtered =
    active === "All Works"
      ? paintings
      : paintings.filter((p) => p.collection === active);

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-secondary py-24 md:py-32 text-center px-6">
        <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-6">
          The Gallery
        </p>
        <h1 className="font-heading text-[40px] md:text-[60px] font-bold text-fg-primary leading-tight mb-4">
          Karen&apos;s Paintings
        </h1>
        <p className="font-body text-[17px] text-fg-secondary">
          Explore two collections celebrating faith and the natural world.
        </p>
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

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((painting) => (
              <div key={painting.title} className="flex flex-col">
                <div className="w-full aspect-[3/4] bg-border-subtle rounded-xl mb-4" />
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
