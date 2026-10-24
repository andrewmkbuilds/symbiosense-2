import { motion } from "framer-motion";
import { Leaf, Bot, FlaskConical, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import DotField from "@/components/effects/DotField";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <PageHero
        label="About"
        title="About SYMBIOTIX"
        subtitle="A FIRST LEGO League Challenge team connecting nature, robotics, and innovation in the 2026–2027 FIRST CANOPY season."
      />

      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <DotField dotRadius={1.2} dotSpacing={28} gradientFrom="#438B78" gradientTo="#9ABF82" gradientAngle={135} glowColor="#438B78" glowRadius={150} glowIntensity={0.35} baseOpacity={0.16} speed={0.25} />
        </div>
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="prose-symbiotix"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-6 text-3d">About SYMBIOTIX</h1>

            <p className="text-muted-foreground leading-relaxed mb-4">
              SYMBIOTIX is a FIRST LEGO League Challenge team competing in the 2026–2027 <strong className="text-foreground">FIRST CANOPY</strong> season.
              Our team brings together curious students who share a passion for nature, robotics, and creative problem-solving.
              Through the FIRST LEGO League program, we build and code a LEGO robot to complete themed missions on a competition field,
              and we develop an Innovation Project that tackles a real-world challenge connected to the season's theme.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              This website is the home of our team's journey. It documents our Innovation Project, <strong className="text-foreground">SYMBIOSENSE</strong>,
              an environmental concept that explores how technology could help identify conservation priorities by combining ecological
              signals such as bioindicator species, invasive-species spread, and biodiversity risk. The site also covers our robot game
              strategy, robot design process, season timeline, gallery, and a curated set of official FIRST LEGO League resources.
              We separate official FLL information from our own team content so visitors can tell what is verified and what is our work.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              SYMBIOTIX is built by the student team members and their mentors. Every part of the project — the robot, the code, the
              research, and this website — is created by the team as we learn the engineering design process: identify, design, create,
              iterate, and communicate. The site is intended for fellow FIRST LEGO League teams, families, mentors, judges, and anyone
              curious about how young people can connect science, engineering, and the natural world.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              FIRST LEGO League guides young people to explore science and engineering through hands-on challenges, the FIRST Core Values,
              and a culture of Gracious Professionalism. We are proud to take part and to share what we learn along the way.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 not-prose">
              {[
                { icon: Users, label: "Our Team", to: "/team" },
                { icon: FlaskConical, label: "SYMBIOSENSE", to: "/innovation" },
                { icon: Bot, label: "Robot Game", to: "/robot-game" },
              ].map((c) => (
                <Link key={c.to} to={c.to} className="group rounded-2xl glass p-4 depth-shadow-sm hover:border-brand-teal/50 transition-all">
                  <c.icon className="h-5 w-5 text-brand-teal mb-2" />
                  <p className="font-heading text-sm font-bold text-primary">{c.label}</p>
                </Link>
              ))}
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}