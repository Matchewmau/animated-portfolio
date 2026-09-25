import Hero from "@/components/Hero";
import ProofBar from "@/components/ProofBar";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="rounded-lg border border-ink/10 bg-white p-4 text-sm">
          Work lands in Task 3.
        </p>
      </section>
    </>
  );
}
