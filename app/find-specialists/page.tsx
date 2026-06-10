import FindSpecialistsHero from "@/app/components/find-specialists/FindSpecialistsHero";
import SpecialistFilters from "@/app/components/find-specialists/SpecialistFilters";
import SpecialistList from "@/app/components/find-specialists/SpecialistList";
import Footer from "@/app/components/sections/Footer";

export const metadata = {
  title: "Find Specialists — Rezolvus",
  description:
    "Browse and connect with verified psychologists, physiotherapists, wellness specialists, and more.",
};

export default function FindSpecialistsPage() {
  return (
    <main className="overflow-x-hidden">
      <FindSpecialistsHero />

      {/* Filters + Results */}
      <section className="bg-[#F6F6F5] px-20 pt-12 pb-40">
        {/* Filter bar */}
        <SpecialistFilters />

        {/* Gap + results */}
        <div className="mt-12">
          <SpecialistList />
        </div>
      </section>

      <Footer />
    </main>
  );
}
