import { HelpCircle, AlertTriangle, Leaf, Cpu } from "lucide-react";
import TiltCard from "@/components/TiltCard";

export default function ConsoleInfo() {
  return (
    <section className="py-12 bg-secondary/30 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-2 gap-5">
        <InfoCard icon={<HelpCircle className="h-5 w-5" />} title="How this simulation works">
          <p>This console runs a <strong>client-side simulation</strong>. When you press Start, a virtual rover moves along a fictional study-area route. At each numbered station it pauses and runs a scripted inspection sequence: image capture, AI-assisted classification (Invasive Firewall), lichen observation (LichenGuard), environmental recording, and a BioRisk AI priority update. All readings, classifications, and priorities are generated from demo data so the map, charts, event log, and dashboard always agree.</p>
          <p className="mt-2">The workflow mirrors the intended real system: <strong>Robot Navigation → Camera Observation → Invasive Firewall → LichenGuard → BioRisk AI → Human Verification → Investigation Report</strong>.</p>
        </InfoCard>

        <InfoCard icon={<AlertTriangle className="h-5 w-5" />} title="Limitations" accent="#B5654A">
          <ul className="space-y-1.5 list-disc pl-4">
            <li>This is a <strong>simulation</strong> — no real LEGO hub, phone camera, physical sensors, or live AI model are connected.</li>
            <li>Environmental readings, confidence values, and risk priorities are <strong>illustrative</strong>, not scientifically validated.</li>
            <li>AI classifications need human verification and can be wrong (false positives/negatives). Lighting, angle, and image quality affect results.</li>
            <li>Lichen observations do not prove pollution or its cause — moisture, shade, habitat, and tree type also influence them.</li>
            <li>Real-world testing, ecological validation, and expert review are required before any field claim.</li>
          </ul>
        </InfoCard>

        <InfoCard icon={<Leaf className="h-5 w-5" />} title="Why lichens?">
          <p>Lichens are associations of fungi and photosynthetic partners. Many are sensitive to environmental conditions, including some forms of air pollution, so their presence, diversity, and growth patterns can provide useful biological evidence about a location. But lichen observations are <strong>not direct pollution measurements</strong> — they are one piece of evidence that helps a human investigator decide where to look next.</p>
        </InfoCard>

        <InfoCard icon={<Cpu className="h-5 w-5" />} title="Simulation vs Real Hardware" accent="#438B78">
          <p>The code is structured so future versions could connect a real LEGO hub (motor control + distance sensor), a phone camera feed, a trained plant-classification model, and real environmental sensors. Today, every value is labelled <strong>SIMULATED DEMO DATA</strong>. The movement controller stays responsible for safe navigation — a low-confidence classification triggers a stop-and-review, never an automatic unsafe turn.</p>
        </InfoCard>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-5">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center">
          <p className="text-xs text-amber-800 font-semibold">This interactive console uses simulated demo data. Real hardware integration, ecological validation, and field testing are required.</p>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, children, accent }) {
  return (
    <TiltCard max={5} depth={20} className="rounded-2xl glass-strong p-5 depth-shadow-md card-shine h-full" contentClassName="p-0">
      <div className="preserve-3d">
        <div className="flex items-center gap-2.5 mb-3" style={{ transform: "translateZ(12px)" }}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground depth-shadow-sm" style={{ background: accent || "#173F32" }}>{icon}</span>
          <h3 className="font-heading text-lg font-bold text-primary">{title}</h3>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-1" style={{ transform: "translateZ(8px)" }}>{children}</div>
      </div>
    </TiltCard>
  );
}