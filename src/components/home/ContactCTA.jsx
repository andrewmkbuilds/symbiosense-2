import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactCTA() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-secondary/40 border-y border-border/60">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">Contact</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight text-balance text-3d">
          Let's Connect!
        </h2>
        <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Interested in our SYMBIOSENSE innovation project, our robotics journey, or supporting our team? We'd love to hear from you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="btn-3d btn-glow">
            <a href="mailto:teamsymbiotix@gmail.com">
              <Mail className="h-4 w-4 mr-2" /> Contact Our Team
            </a>
          </Button>
          <a
            href="mailto:teamsymbiotix@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-brand-teal transition-colors"
          >
            <Mail className="h-4 w-4 text-brand-teal" /> teamsymbiotix@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}