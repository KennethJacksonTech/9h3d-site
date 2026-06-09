"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchPost, type BlogPost } from "@/lib/gonzo";

/**
 * Blog post detail. A single STATIC shell (`/blog/post/`) that reads `?slug=`
 * and fetches the post client-side. This keeps detail pages working on the
 * static export (`output: "export"`) with no rebuild per post — consistent with
 * the live gallery/index. (Pretty `/blog/<slug>` URLs would need build-time
 * generateStaticParams, i.e. a rebuild for every new post; deferred to the
 * Gonzo->Vercel deploy-hook task, which would also improve per-post SEO.)
 */
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

function PostView() {
  const slug = useSearchParams().get("slug");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">(
    "loading",
  );

  useEffect(() => {
    if (!slug) {
      setStatus("missing");
      return;
    }
    fetchPost(slug)
      .then((p) => {
        setPost(p);
        setStatus(p ? "ready" : "missing");
      })
      .catch(() => setStatus("missing"));
  }, [slug]);

  return (
    <article className="bg-surface-primary py-16 md:py-24 px-6 min-h-[60vh]">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-block font-body text-[14px] font-semibold text-accent hover:text-accent-secondary transition-colors mb-8"
        >
          &larr; Back to the Blog
        </Link>

        {status === "loading" && (
          <p className="font-body text-[15px] text-fg-secondary">
            Loading&hellip;
          </p>
        )}

        {status === "missing" && (
          <p className="font-body text-[15px] text-fg-secondary">
            That post could not be found. It may have been moved or unpublished.
          </p>
        )}

        {status === "ready" && post && (
          <>
            {post.category && (
              <span className="inline-block font-body text-[11px] font-semibold tracking-[2px] uppercase bg-accent text-white px-3 py-1 rounded mb-4">
                {post.category.name}
              </span>
            )}

            <h1 className="font-heading text-[34px] md:text-[44px] font-bold text-fg-primary leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 font-body text-[14px] text-fg-secondary mb-10">
              {post.author && <span>{post.author}</span>}
              {post.author && <span aria-hidden="true">&middot;</span>}
              <span>{formatDate(post.published_at)}</span>
              {post.reading_time > 0 && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.reading_time} min read</span>
                </>
              )}
            </div>

            {post.featured_image_url && (
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full rounded-xl mb-10 object-cover max-h-[460px]"
              />
            )}

            {post.content_html && (
              <div
                className="font-body text-[17px] text-fg-secondary leading-[1.8] [&_h2]:font-heading [&_h2]:text-fg-primary [&_h2]:text-[26px] [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-heading [&_h3]:text-fg-primary [&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-5 [&_a]:text-accent [&_a]:underline hover:[&_a]:text-accent-secondary [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-accent-secondary [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-fg-primary [&_blockquote]:my-6 [&_img]:rounded-xl [&_img]:my-6"
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border-subtle">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[13px] text-fg-secondary bg-surface-secondary px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}

export default function BlogPostPage() {
  // useSearchParams requires a Suspense boundary under static export.
  return (
    <Suspense fallback={null}>
      <PostView />
    </Suspense>
  );
}
