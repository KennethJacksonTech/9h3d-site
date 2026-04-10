import Link from "next/link";

const recentPosts = [
  {
    title: "The Palette of Prayer",
    date: "February 28, 2026",
    excerpt:
      "How the colors we choose reflect the emotions of our spiritual journey — and what Karen's latest painting reveals about devotion.",
    image: "https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-work/89d529d5-weeping-woman.jpg",
    imageAlt: "Weeping Woman — oil painting by Karen Wolfram",
  },
  {
    title: "Teaching Art, Teaching Faith",
    date: "February 10, 2026",
    excerpt:
      "A look inside Karen's art education philosophy and how she integrates ministry into every lesson.",
    image: "https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-creation/9c58a8bb-in-the-kitchen.jpg",
    imageAlt: "In The Kitchen — oil painting by Karen Wolfram",
  },
  {
    title: "New Episode: Painting Sunsets",
    date: "January 22, 2026",
    excerpt:
      "The latest episode of The Karen Wolfram Project explores the beauty of West Texas sunsets and the techniques behind capturing God's light.",
    image: "https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-creation/3c6c95fe-the-last-outcrop.jpg",
    imageAlt: "The Last Outcrop — oil painting by Karen Wolfram",
  },
];

export default function Blog() {
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

      {/* Featured Post */}
      <section className="bg-surface-primary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-1/2 aspect-[4/3] bg-border-subtle rounded-xl overflow-hidden">
            <img
              src="https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-work/2827f54c-the-dove.jpg"
              alt="The Dove — oil painting by Karen Wolfram"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            <span className="inline-block font-body text-[11px] font-semibold tracking-[2px] uppercase bg-accent text-white px-3 py-1 rounded mb-4">
              Featured
            </span>
            <h2 className="font-heading text-[28px] md:text-[32px] font-bold text-fg-primary mb-3">
              Finding God in the Brushstrokes
            </h2>
            <p className="font-body text-[16px] text-fg-secondary leading-[1.7] mb-4">
              Every painting begins with a prayer. In this post, Karen shares
              how her creative process is inseparable from her faith — and why
              the act of painting is itself a form of ministry.
            </p>
            <p className="font-body text-[13px] text-fg-secondary mb-6">
              March 15, 2026
            </p>
            <Link
              href="#"
              className="font-body text-[14px] font-semibold text-accent hover:text-accent-secondary transition-colors"
            >
              Read More &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="bg-surface-secondary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-[36px] font-bold text-fg-primary mb-12 text-center">
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <div
                key={post.title}
                className="bg-surface-primary rounded-xl overflow-hidden"
              >
                <div className="w-full aspect-[4/3] bg-border-subtle overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="font-body text-[13px] text-fg-secondary mb-2">
                    {post.date}
                  </p>
                  <h3 className="font-heading text-[18px] font-semibold text-fg-primary mb-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-[15px] text-fg-secondary leading-[1.7]">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
