import { useState, useCallback, useEffect } from "react";
import InnovationHero from "@/components/sections/InnovationHero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import LiveDemo from "@/components/sections/LiveDemo";
import Science from "@/components/sections/Science";
import VisualData from "@/components/sections/VisualData";
import Workflow from "@/components/sections/Workflow";
import { DEFAULT_INPUTS, PRESETS, SITES, computeRisk } from "@/lib/symbiosense";

export default function Innovation() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [result, setResult] = useState(() => computeRisk(DEFAULT_INPUTS));
  const [site, setSite] = useState(SITES[0].id);
  const [activePreset, setActivePreset] = useState(null);

  const analyze = useCallback((next) => setResult(computeRisk(next)), []);
  useEffect(() => { analyze(DEFAULT_INPUTS); }, [analyze]);

  const changeInput = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  };
  const handleAnalyze = () => analyze(inputs);
  const handlePreset = (preset) => {
    setInputs(preset.inputs);
    analyze(preset.inputs);
    setActivePreset(preset.id);
  };
  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    analyze(DEFAULT_INPUTS);
    setActivePreset(null);
  };

  return (
    <div>
      <InnovationHero />
      <Problem />
      <HowItWorks />
      <LiveDemo
        inputs={inputs}
        onChangeInput={changeInput}
        onAnalyze={handleAnalyze}
        onReset={handleReset}
        onPreset={handlePreset}
        result={result}
        site={site}
        onSiteChange={setSite}
        activePreset={activePreset}
      />
      <Science />
      <VisualData result={result} inputs={inputs} />
      <Workflow />
    </div>
  );
}