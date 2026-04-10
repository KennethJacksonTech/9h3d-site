import Link from "next/link";

const collections = [
  {
    title: "God's Work",
    description:
      "Religious paintings exploring biblical themes, scripture, and the spiritual journey. Each piece reflects Karen's deep faith and invites viewers into moments of reverence and reflection.",
  },
  {
    title: "God's Creation",
    description:
      "Landscapes, nature scenes, and the beauty of the natural world as seen through the eyes of faith. From Texas wildflowers to canyon sunsets, these works celebrate the Creator's handiwork.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 text-center px-6 overflow-hidden">
        <img
          src="https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-creation/7c3597fe-garden-walk.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F2EDE6]/[0.375]" />
        <div className="relative z-10">
          <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-6">
            About the Artist
          </p>
          <h1 className="font-heading text-[40px] md:text-[60px] font-bold text-fg-primary leading-tight mb-4">
            Karen Wolfram
          </h1>
          <p className="font-body text-[17px] text-fg-secondary">
            Artist &middot; Teacher &middot; Minister
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bg-surface-primary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-[400px] shrink-0 aspect-[5/6] bg-border-subtle rounded-xl overflow-hidden">
            <img
              src="https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-work/5aa592fa-planting-and-pruning.jpg"
              alt="Planting and Pruning — oil painting by Karen Wolfram"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <h2 className="font-heading text-[36px] font-bold text-fg-primary mb-6">
              A Life Devoted to Art &amp; Faith
            </h2>
            <p className="font-body text-[17px] text-fg-secondary leading-[1.7] mb-6">
              Karen Wolfram is an accomplished artist and art educator based in
              Amarillo, Texas, with decades of experience glorifying God through
              the visual arts. Her oil paintings span two collections — God&apos;s
              Work and God&apos;s Creation — each a reflection of her deep spiritual
              conviction and artistic mastery.
            </p>
            <p className="font-body text-[17px] text-fg-secondary leading-[1.7]">
              Karen holds a BS in Art Education from West Texas A&amp;M University
              and an MA in Humanities from California State University Dominguez
              Hills. She has studied under renowned artists and brings both
              formal training and a lifetime of devotion to every canvas she
              touches.
            </p>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="bg-surface-secondary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col) => (
            <div
              key={col.title}
              className="bg-surface-primary rounded-xl p-8 flex flex-col"
            >
              <h3 className="font-heading text-[24px] font-bold text-fg-primary mb-4">
                {col.title}
              </h3>
              <p className="font-body text-[16px] text-fg-secondary leading-[1.7] mb-6 flex-1">
                {col.description}
              </p>
              <Link
                href="/gallery"
                className="font-body text-[14px] font-semibold text-accent hover:text-accent-secondary transition-colors"
              >
                View Collection &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-surface-inverse py-20 md:py-24 px-6 text-center">
        <h2 className="font-heading text-[36px] md:text-[42px] font-bold text-fg-inverse mb-4">
          Commission a Painting
        </h2>
        <p className="font-body text-[17px] text-border-subtle max-w-xl mx-auto leading-[1.7] mb-10">
          Have a vision for a custom piece? Karen accepts commissions for
          religious works, landscapes, and portraits.
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
