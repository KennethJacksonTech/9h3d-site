import Link from "next/link";
import { featuredPaintings } from "@/data/paintings";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 text-center px-6 overflow-hidden">
        <img
          src="https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-creation/a72fdbe5-a-shaded-pond.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F2EDE6]/50" />
        <div className="relative z-10">
          <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-6">
            A Ministry of Art &amp; Faith
          </p>
          <h1 className="font-heading text-[40px] md:text-[60px] font-bold text-fg-primary leading-tight mb-6">
            9th Hour 3rd Day Ministries
          </h1>
          <p className="font-body text-[17px] text-fg-secondary max-w-xl mx-auto leading-relaxed mb-10">
            Sharing God&apos;s love through the beauty of art. Paintings,
            teachings, and a creative ministry rooted in faith.
          </p>
          <Link
            href="/gallery"
            className="inline-block bg-accent text-white font-body text-[14px] font-semibold tracking-[1px] px-6 py-3 rounded-lg hover:bg-accent-secondary transition-colors"
          >
            Explore the Gallery
          </Link>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-surface-primary py-20 md:py-24 px-6 text-center">
        <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-4">
          Our Mission
        </p>
        <h2 className="font-heading text-[36px] md:text-[42px] font-bold text-fg-primary mb-6">
          Art as Ministry
        </h2>
        <p className="font-body text-[17px] text-fg-secondary max-w-2xl mx-auto leading-[1.7] mb-10">
          Karen Wolfram uses her God-given talent to glorify the Creator through
          oil paintings, art education, and a ministry that reaches hearts
          through beauty. Each brushstroke is an act of worship — each painting a
          testament to faith.
        </p>
        <div className="w-16 h-0.5 bg-accent-secondary mx-auto" />
      </section>

      {/* Gallery Preview */}
      <section className="bg-surface-secondary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-4">
            Featured Works
          </p>
          <h2 className="font-heading text-[36px] md:text-[42px] font-bold text-fg-primary mb-12">
            From the Studio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPaintings.map((painting) => (
              <div key={painting.slug} className="flex flex-col items-center">
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
                  {painting.collection}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Karen Wolfram Project */}
      <section className="bg-surface-primary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 aspect-video bg-border-subtle rounded-xl overflow-hidden">
            <img
              src="https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-creation/95328657-natural-terrace.jpg"
              alt="Natural Terrace — oil painting by Karen Wolfram"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-4">
              The Karen Wolfram Project
            </p>
            <h2 className="font-heading text-[36px] font-bold text-fg-primary mb-4">
              Art Lessons &amp; Faith Stories
            </h2>
            <p className="font-body text-[17px] text-fg-secondary leading-[1.7] mb-8">
              Join Karen for 56+ episodes of painting tutorials, art history,
              and stories of faith on YouTube. From technique to testimony, each
              episode invites you into the studio.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-accent text-white font-body text-[14px] font-semibold tracking-[1px] px-6 py-3 rounded-lg hover:bg-accent-secondary transition-colors"
            >
              Watch Episodes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-surface-inverse py-20 md:py-24 px-6 text-center">
        <h2 className="font-heading text-[36px] md:text-[42px] font-bold text-fg-inverse mb-4">
          Called to Create
        </h2>
        <p className="font-body text-[17px] text-border-subtle max-w-xl mx-auto leading-[1.7] mb-10">
          Interested in commissioning a painting or attending a workshop? Karen
          would love to hear from you.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-accent-secondary text-fg-primary font-body text-[14px] font-semibold tracking-[1px] px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </Link>
      </section>
    </>
  );
}
