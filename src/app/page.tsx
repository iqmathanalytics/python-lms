import { getModulesByCourse, getPublishedTopicCount } from "@/data/curriculum";
import { HomeHero } from "./HomeHero";
import { HomeFeatures } from "./HomeFeatures";
import { HomeRoadmap } from "./HomeRoadmap";
import { HomeCTA } from "./HomeCTA";

export default function HomePage() {
  const pythonModules = getModulesByCourse("python");
  const liveModules = pythonModules.filter((m) =>
    m.topics.some((t) => t.published)
  ).length;
  const liveTopics = getPublishedTopicCount();

  return (
    <div className="bg-white">
      <HomeHero
        liveModules={liveModules}
        liveTopics={liveTopics}
        totalModules={pythonModules.length}
      />
      <HomeFeatures />
      <HomeRoadmap modules={pythonModules} />
      <HomeCTA />
    </div>
  );
}
