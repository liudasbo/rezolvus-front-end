"use client";

import { useState } from "react";
import FindSpecialistsHero from "@/app/components/find-specialists/FindSpecialistsHero";
import SpecialistFilters from "@/app/components/find-specialists/SpecialistFilters";
import SpecialistList from "@/app/components/find-specialists/SpecialistList";
import Footer from "@/app/components/sections/Footer";

export default function FindSpecialistsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  return (
    <main className="overflow-x-hidden">
      <FindSpecialistsHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Filters + Results */}
      <section className="bg-[#F6F6F5] px-5 sm:px-8 lg:px-20 pt-12 pb-20 lg:pb-40">
        <SpecialistFilters activeFilters={activeFilters} onFilterChange={setActiveFilters} />

        <div className="mt-12">
          <SpecialistList searchQuery={searchQuery} activeFilters={activeFilters} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
