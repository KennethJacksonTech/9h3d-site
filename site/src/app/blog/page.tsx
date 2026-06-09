"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchPosts, type BlogPost } from "@/lib/gonzo";

/** Decorative fallback when a post has no featured image set in Gonzo. */
const FALLBACK_IMAGE =
  "https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-work/c7ee32dc-rebuilding-the-temple.jpg";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setError(true));
  }, []);

  const loading = posts === null && !error;
  const featured = posts?.[0] ?? null;
  const recent = posts?.slice(1) ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 text-center px-6 overflow-hidden">
        <img
          src="https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-work/c7ee32dc-rebuilding-the-temple.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F2EDE6]/[0.375]" />
        <div className="relative z-10">
          <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-6">
            The Blog
          </p>
          <h1 className="font-heading text-[40px] md:text-[60px] font-bold text-fg-primary leading-tight mb-4">
            Stories of Art &amp; Faith
          </h1>
          <p className="font-body text-[17px] text-fg-secondary">
            Reflections, lessons, and behind-the-scenes from the studio.
          </p>
        </div>
      </section>

      {/* Loading / empty states */}
      {loading && (
        <section className="bg-surface-primary py-20 md:py-24 px-6">
          <p className="text-center font-body text-[15px] text-fg-secondary">
            Loading posts&hellip;
          </p>
        </section>
      )}
      {!loading && !featured && (
        <section className="bg-surface-primary py-20 md:py-24 px-6">
          <p className="text-center font-body text-[15px] text-fg-secondary">
            New teachings are on the way. Please check back soon.
          </p>
        </section>
      )}

      {/* Featured Post */}
      {featured && (
        <section className="bg-surface-primary py-20 md:py-24 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-1/2 aspect-[4/3] bg-border-subtle rounded-xl overflow-hidden">
              <img
                src={featured.featured_image_url || FALLBACK_IMAGE}
                alt={featured.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="w-full md:w-1/2">
              <span className="inline-block font-body text-[11px] font-semibold tracking-[2px] uppercase bg-accent text-white px-3 py-1 rounded mb-4">
                Featured
              </span>
              <h2 className="font-heading text-[28px] md:text-[32px] font-bold text-fg-primary mb-3">
                {featured.title}
              </h2>
              <p className="font-body text-[16px] text-fg-secondary leading-[1.7] mb-4">
                {featured.excerpt}
              </p>
              <p className="font-body text-[13px] text-fg-secondary mb-6">
                {formatDate(featured.published_at)}
              </p>
              <Link
                href={`/blog/post/?slug=${featured.slug}`}
                className="font-body text-[14px] font-semibold text-accent hover:text-accent-secondary transition-colors"
              >
                Read More &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      {recent.length > 0 && (
        <section className="bg-surface-secondary py-20 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-[36px] font-bold text-fg-primary mb-12 text-center">
              Recent Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recent.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/post/?slug=${post.slug}`}
                  className="bg-surface-primary rounded-xl overflow-hidden block transition-shadow hover:shadow-md"
                >
                  <div className="w-full aspect-[4/3] bg-border-subtle overflow-hidden">
                    <img
                      src={post.featured_image_url || FALLBACK_IMAGE}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-body text-[13px] text-fg-secondary mb-2">
                      {formatDate(post.published_at)}
                    </p>
                    <h3 className="font-heading text-[18px] font-semibold text-fg-primary mb-2">
                      {post.title}
                    </h3>
                    <p className="font-body text-[15px] text-fg-secondary leading-[1.7]">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
