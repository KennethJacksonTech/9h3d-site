export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface-secondary py-24 md:py-32 text-center px-6">
        <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-6">
          Get in Touch
        </p>
        <h1 className="font-heading text-[40px] md:text-[60px] font-bold text-fg-primary leading-tight mb-4">
          Contact Us
        </h1>
        <p className="font-body text-[17px] text-fg-secondary">
          We&apos;d love to hear from you. Reach out anytime.
        </p>
      </section>

      {/* Contact Body */}
      <section className="bg-surface-primary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Form */}
          <div className="w-full md:w-3/5">
            <h2 className="font-heading text-[28px] font-bold text-fg-primary mb-8">
              Send a Message
            </h2>
            {/* TODO: Integrate Formspree or Netlify Forms for backend submission */}
            <form action="#" className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-surface-primary font-body text-[15px] text-fg-primary placeholder:text-fg-secondary/50 focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-surface-primary font-body text-[15px] text-fg-primary placeholder:text-fg-secondary/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-surface-primary font-body text-[15px] text-fg-primary placeholder:text-fg-secondary/50 focus:outline-none focus:border-accent transition-colors"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-surface-primary font-body text-[15px] text-fg-primary placeholder:text-fg-secondary/50 focus:outline-none focus:border-accent transition-colors resize-none"
              />
              <button
                type="submit"
                className="self-start bg-accent text-white font-body text-[14px] font-semibold tracking-[1px] px-6 py-3 rounded-lg hover:bg-accent-secondary transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-2/5">
            <h2 className="font-heading text-[28px] font-bold text-fg-primary mb-8">
              Contact Information
            </h2>
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-body text-[13px] font-semibold tracking-[2px] uppercase text-accent mb-1">
                  Location
                </p>
                <p className="font-body text-[16px] text-fg-secondary">
                  Amarillo, Texas
                </p>
              </div>
              <div>
                <p className="font-body text-[13px] font-semibold tracking-[2px] uppercase text-accent mb-1">
                  Email
                </p>
                <p className="font-body text-[16px] text-fg-secondary">
                  info@9h3d.com
                </p>
              </div>
              <div>
                <p className="font-body text-[13px] font-semibold tracking-[2px] uppercase text-accent mb-1">
                  YouTube
                </p>
                <p className="font-body text-[16px] text-fg-secondary">
                  The Karen Wolfram Project
                </p>
              </div>
              <div>
                <p className="font-body text-[13px] font-semibold tracking-[2px] uppercase text-accent mb-1">
                  Ministry
                </p>
                <p className="font-body text-[16px] text-fg-secondary">
                  9th Hour 3rd Day Ministries
                  <br />
                  Amarillo, TX
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
