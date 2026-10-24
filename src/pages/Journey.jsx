import JourneyHero from "@/components/sections/JourneyHero";
import JourneyProgress from "@/components/sections/JourneyProgress";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import JourneyGallery from "@/components/sections/JourneyGallery";
import { SEASON_MILESTONES, seasonProgress } from "@/lib/journeyMilestones";

export default function Journey() {
  const { doneCount, total, progress, nextUp } = seasonProgress(SEASON_MILESTONES);

  return (
    <div>
      <JourneyHero doneCount={doneCount} total={total} progress={progress} nextUp={nextUp} />
      <JourneyProgress doneCount={doneCount} total={total} progress={progress} nextUp={nextUp} />
      <JourneyTimeline milestones={SEASON_MILESTONES} progress={progress} />
      <JourneyGallery />
    </div>
  );
}