import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 text-center px-6 overflow-hidden">
        <img
          src="https://vsenrznfzpmszljettmn.supabase.co/storage/v1/object/public/media/2f23b09f-27b7-47bf-845e-ac452357329c/paintings/gods-creation/6d1937cf-caprock-canyon.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F2EDE6]/50" />
        <div className="relative z-10">
          <p className="font-body text-[13px] font-semibold tracking-[3px] uppercase text-accent mb-6">
            Get in Touch
          </p>
          <h1 className="font-heading text-[40px] md:text-[60px] font-bold text-fg-primary leading-tight mb-4">
            Contact Us
          </h1>
          <p className="font-body text-[17px] text-fg-secondary">
            We&apos;d love to hear from you. Reach out anytime.
          </p>
        </div>
      </section>

      {/* Contact Body */}
      <section className="bg-surface-primary py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Form */}
          <div className="w-full md:w-3/5">
            <h2 className="font-heading text-[28px] font-bold text-fg-primary mb-8">
              Send a Message
            </h2>
            <ContactForm />
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
