export type Collection = "God's Work" | "God's Creation";

export interface Painting {
  title: string;
  slug: string;
  collection: Collection;
  medium: string;
  imageUrl: string;
  alt: string;
}

const GONZO_CDN = "https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings";

export const paintings: Painting[] = [
  // === God's Work (16) ===
  { title: "Caverns of the Mind", slug: "caverns-of-the-mind", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/1122cfe1-caverns-of-the-mind-suggestions.jpg`, alt: "Caverns of the Mind by Karen Wolfram" },
  { title: "Contemplating", slug: "contemplating", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/bde24e63-contemplating.jpg`, alt: "Contemplating by Karen Wolfram" },
  { title: "Drowning Souls", slug: "drowning-souls", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/8b4844cc-drowning-souls-hd.jpg`, alt: "Drowning Souls by Karen Wolfram" },
  { title: "Faith Rising", slug: "faith-rising", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/b84ad09c-faith-rising.jpg`, alt: "Faith Rising by Karen Wolfram" },
  { title: "Intercessory Prayer", slug: "intercessory-prayer", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/684edf65-intecessary-prayer.jpg`, alt: "Intercessory Prayer by Karen Wolfram" },
  { title: "Persecution", slug: "persecution", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/8330b832-persecution.jpg`, alt: "Persecution by Karen Wolfram" },
  { title: "Planting and Pruning", slug: "planting-and-pruning", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/5aa592fa-planting-and-pruning.jpg`, alt: "Planting and Pruning by Karen Wolfram" },
  { title: "Rebuilding The Temple", slug: "rebuilding-the-temple", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/c7ee32dc-rebuilding-the-temple.jpg`, alt: "Rebuilding The Temple by Karen Wolfram" },
  { title: "So Many Lessons", slug: "so-many-lessons", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/9fb90faa-so-many-lessons.jpg`, alt: "So Many Lessons by Karen Wolfram" },
  { title: "Take Up Your Cross", slug: "take-up-your-cross", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/d3b96a7b-take-up-your-cross.jpg`, alt: "Take Up Your Cross by Karen Wolfram" },
  { title: "The Bible", slug: "the-bible", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/f79f85ee-the-bible.jpg`, alt: "The Bible by Karen Wolfram" },
  { title: "The Bridge", slug: "the-bridge", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/8388f113-the-bridge.jpg`, alt: "The Bridge by Karen Wolfram" },
  { title: "The Dove", slug: "the-dove", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/2827f54c-the-dove.jpg`, alt: "The Dove by Karen Wolfram" },
  { title: "The Unexpected", slug: "the-unexpected", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/99e46142-the-unexpected.jpg`, alt: "The Unexpected by Karen Wolfram" },
  { title: "They Did Not Listen", slug: "they-did-not-listen", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/628549ea-they-did-not-listen.jpg`, alt: "They Did Not Listen by Karen Wolfram" },
  { title: "Weeping Woman", slug: "weeping-woman", collection: "God's Work", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-work/89d529d5-weeping-woman.jpg`, alt: "Weeping Woman by Karen Wolfram" },

  // === God's Creation (16) ===
  { title: "A Distant Look", slug: "a-distant-look", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/87edfefa-a-distant-look.jpg`, alt: "A Distant Look by Karen Wolfram" },
  { title: "A Flowing Creek", slug: "a-flowing-creek", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/94be6af0-a-flowing-creek.jpg`, alt: "A Flowing Creek by Karen Wolfram" },
  { title: "A Hidden Morsel", slug: "a-hidden-morsel", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/65c1819e-a-hidden-morsel.jpg`, alt: "A Hidden Morsel by Karen Wolfram" },
  { title: "A Shaded Pond", slug: "a-shaded-pond", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/a72fdbe5-a-shaded-pond.jpg`, alt: "A Shaded Pond by Karen Wolfram" },
  { title: "Caprock Canyon", slug: "caprock-canyon", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/6d1937cf-caprock-canyon.jpg`, alt: "Caprock Canyon by Karen Wolfram" },
  { title: "Garden Walk", slug: "garden-walk", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/7c3597fe-garden-walk.jpg`, alt: "Garden Walk by Karen Wolfram" },
  { title: "Gigantis Hibiscus", slug: "gigantis-hibiscus", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/90960435-giagantis-hibiscus.jpg`, alt: "Gigantis Hibiscus by Karen Wolfram" },
  { title: "Giant White Hibiscus", slug: "giant-white-hibiscus", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/5f01e545-giant-white-hibiscus.jpg`, alt: "Giant White Hibiscus by Karen Wolfram" },
  { title: "Green Meadow", slug: "green-meadow", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/aa3bddad-green-meadow.jpg`, alt: "Green Meadow by Karen Wolfram" },
  { title: "In The Kitchen", slug: "in-the-kitchen", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/9c58a8bb-in-the-kitchen.jpg`, alt: "In The Kitchen by Karen Wolfram" },
  { title: "Lost In The View", slug: "lost-in-the-view", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/6bb45472-lost-in-the-view.jpg`, alt: "Lost In The View by Karen Wolfram" },
  { title: "Natural Terrace", slug: "natural-terrace", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/95328657-natural-terrace.jpg`, alt: "Natural Terrace by Karen Wolfram" },
  { title: "Purple Delight", slug: "purple-delight", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/1d1bc2e8-purple-delight.jpg`, alt: "Purple Delight by Karen Wolfram" },
  { title: "Sorenson's Peak", slug: "sorensons-peak", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/371cc2d4-sorenson-peek.jpg`, alt: "Sorenson's Peak by Karen Wolfram" },
  { title: "The Last Outcrop", slug: "the-last-outcrop", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/3c6c95fe-the-last-outcrop.jpg`, alt: "The Last Outcrop by Karen Wolfram" },
  { title: "The Runoff", slug: "the-runoff", collection: "God's Creation", medium: "Oil on Canvas", imageUrl: `${GONZO_CDN}/gods-creation/b492c352-the-runoff.jpg`, alt: "The Runoff by Karen Wolfram" },
];

export const featuredPaintings = paintings.filter(p =>
  ["the-dove", "garden-walk", "faith-rising"].includes(p.slug)
);
