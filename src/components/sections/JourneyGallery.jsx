import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Plus, X, ImageIcon } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import Grainient from "@/components/effects/Grainient";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { JOURNEY_CONCEPT_PHOTOS } from "@/lib/conceptIllustrations";
import { Image } from "@/components/ui/image";

export default function JourneyGallery() {
  const [photos, setPhotos] = useLocalStorage("symbiotix-concept-illustrations-v1", JOURNEY_CONCEPT_PHOTOS);
  const [active, setActive] = useState(null);

  const updatePhoto = (id, updates) => setPhotos(photos.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  const addPhoto = () => setPhotos([...photos, { id: Date.now(), url: "", caption: "New photo", location: "", date: "" }]);
  const removePhoto = (id) => setPhotos(photos.filter((p) => p.id !== id));

  return (
    <section className="pb-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Grainient colors={["#173F32", "#438B78", "#9ABF82"]} angle={125} flow={0.3} speed={0.2} grainAmount={0.03} opacity={0.1} />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-brand-teal" />
              <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">How SYMBIOSENSE Works</p>
            </div>
            <h2 className="mt-1 font-heading text-2xl font-bold text-primary text-3d">Our project, illustrated</h2>
            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
              Concept illustrations of how our SYMBIOSENSE project works — artwork, not photographs. Paste a photo URL
              into any card to replace it with a real picture.
            </p>
          </div>
          <button onClick={addPhoto} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground btn-3d btn-glow">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {photos.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 18, rotateY: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="[perspective:1000px]"
            >
              <TiltCard max={8} depth={30} className="rounded-2xl glass-strong overflow-hidden card-shine depth-shadow-md h-full" contentClassName="p-0">
                <div className="preserve-3d">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary/40" style={{ transform: "translateZ(15px)" }}>
                    {p.url ? (
                      <Image src={p.url} alt={p.caption} fittingType="cover" className="h-full w-full transition-transform duration-500 hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8" />
                      </div>
                    )}
                    {/* Location badge */}
                    {p.location && (
                      <span className="absolute top-3 left-3 rounded-full glass px-2.5 py-1 text-[10px] font-semibold text-foreground depth-shadow-sm">
                        📍 {p.location}
                      </span>
                    )}
                    {/* Remove button */}
                    <button
                      onClick={() => removePhoto(p.id)}
                      className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full glass text-muted-foreground hover:text-destructive transition-colors depth-shadow-sm"
                      aria-label="Remove photo"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    {/* Date */}
                    {p.date && (
                      <span className="absolute bottom-3 right-3 rounded-full glass px-2.5 py-1 text-[10px] font-mono font-semibold text-foreground depth-shadow-sm">
                        {p.date}
                      </span>
                    )}
                  </div>

                  {/* Caption */}
                  <div className="p-4" style={{ transform: "translateZ(10px)" }}>
                    <input
                      type="text"
                      value={p.caption}
                      onChange={(e) => updatePhoto(p.id, { caption: e.target.value })}
                      placeholder="Add a caption..."
                      className="w-full bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none font-heading text-sm font-bold text-primary"
                    />
                    <input
                      type="text"
                      value={p.url}
                      onChange={(e) => updatePhoto(p.id, { url: e.target.value })}
                      placeholder="Image URL..."
                      className="mt-2 w-full bg-secondary/50 border border-border rounded-md px-2.5 py-1.5 text-[10px] text-muted-foreground outline-none focus:border-primary font-mono"
                    />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="text-center py-12 text-sm text-muted-foreground">
            No images here yet. Click "Add" to show how our project works.
          </div>
        )}

        <p className="mt-6 text-xs text-muted-foreground text-center">
          Every image here is a concept illustration, not a photograph of real field work. Replace any URL above with
          your own photo as the season progresses.
        </p>
      </div>
    </section>
  );
}