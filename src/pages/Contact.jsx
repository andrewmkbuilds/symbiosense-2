import { useState } from "react";
import { Mail, Send, Leaf } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`SYMBIOTIX website message from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
    window.location.href = `mailto:teamsymbiotix@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <PageHero
        label="Contact"
        title="Contact SYMBIOTIX"
        subtitle="Reach the team about our Innovation Project, robot game, or FIRST LEGO League season."
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-6 text-3d">Contact SYMBIOTIX</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl glass p-6 depth-shadow-sm">
              <h2 className="font-heading text-lg font-bold text-primary mb-3">Reach us directly</h2>
              <a href="mailto:teamsymbiotix@gmail.com" className="flex items-center gap-2.5 text-sm font-semibold text-primary hover:text-brand-teal transition-colors mb-4">
                <Mail className="h-4 w-4 text-brand-teal" /> teamsymbiotix@gmail.com
              </a>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Interested in our SYMBIOSENSE innovation project, our robotics journey, or supporting our team? We'd love to hear from you. We aim to reply within a few days during the season.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Leaf className="h-4 w-4 text-brand-teal" /> FIRST LEGO League Challenge · 2026–2027
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl glass p-6 depth-shadow-sm space-y-3">
              <h2 className="font-heading text-lg font-bold text-primary">Send a message</h2>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                rows={4}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
              />
              <Button type="submit" className="w-full btn-3d btn-glow">
                <Send className="h-4 w-4 mr-1.5" /> Send message
              </Button>
              <p className="text-[11px] text-muted-foreground">Opens your email app with the message pre-filled.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}