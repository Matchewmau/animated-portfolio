import Hero from "@/components/Hero";
import ProofBar from "@/components/ProofBar";
import SelectedWork from "@/components/SelectedWork";
import HairmixerSpotlight from "@/components/HairmixerSpotlight";
import SkillsMatrix from "@/components/SkillsMatrix";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <SelectedWork />
      <HairmixerSpotlight />
      <SkillsMatrix />
      <Experience />
      <Contact />
    </>
  );
}
