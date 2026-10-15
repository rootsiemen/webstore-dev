import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Get Your Website Built",
  description:
    "Tell me about your project and get a free quote. Message on WhatsApp or use the contact form — I reply within 24 hours, usually much faster.",
  alternates: { canonical: "https://www.tarm.tech/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
