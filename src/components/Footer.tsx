import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-inverse px-6 py-10 md:px-20 text-center">
      <div className="flex flex-col items-center gap-4">
        <p className="font-heading text-[20px] font-semibold text-fg-inverse">
          9th Hour 3rd Day Ministries
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[13px] text-border-subtle hover:text-fg-inverse transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="font-body text-[12px] text-fg-secondary">
          &copy; 2026 9th Hour 3rd Day Ministries. All rights reserved.
        </p>

        <p className="font-body text-[11px] text-fg-secondary">
          Designed by KennethJackson.Tech
        </p>
      </div>
    </footer>
  );
}
