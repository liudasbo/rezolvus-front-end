"use client";

import { useState } from "react";
import { specialists } from "@/app/data/specialists";
import SpecialistCard from "./SpecialistCard";

interface SpecialistListProps {
  searchQuery: string;
  activeFilters: Record<string, string>;
}

export default function SpecialistList({ searchQuery, activeFilters }: SpecialistListProps) {
  const [sortOrder, setSortOrder] = useState<"All" | "Rating" | "Price">("All");
  const [sortOpen, setSortOpen] = useState(false);
  const sortOptions = ["All", "Rating", "Price"] as const;

  const filtered = specialists.filter((s) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.specializations.some((spec) => spec.toLowerCase().includes(q)) ||
      s.languages.some((lang) => lang.toLowerCase().includes(q));

    const matchesSessionType =
      !activeFilters["Session Type"] ||
      s.sessionTypes.includes(activeFilters["Session Type"] as "In person" | "Online");

    const matchesLanguage =
      !activeFilters["Language"] ||
      s.languages.includes(activeFilters["Language"]);

    return matchesSearch && matchesSessionType && matchesLanguage;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "Rating") return parseFloat(b.rating) - parseFloat(a.rating);
    if (sortOrder === "Price") return a.priceFrom - b.priceFrom;
    return 0;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Results header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-[#013D47] text-[18px] sm:text-[20px] lg:text-[24px] font-medium leading-8">
          {sorted.length} specialist{sorted.length !== 1 ? "s" : ""} found
          {searchQuery.trim() ? ` for "${searchQuery.trim()}"` : " — browse all"}
        </p>
        <div className="relative">
          <button
            onClick={() => setSortOpen((o) => !o)}
            className="backdrop-blur-[10px] bg-white/10 border-[1.5px] border-[rgba(13,13,13,0.1)] rounded-full h-10 flex items-center gap-2 pl-5 pr-[14px] text-[#1C1C1C] text-sm lg:text-base font-normal leading-6 whitespace-nowrap hover:bg-white/20 active:bg-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013D47]/30 cursor-pointer"
            aria-expanded={sortOpen}
          >
            {sortOrder}
            <img src="/images/icon-caret-down.svg" alt="" className={`w-5 h-5 shrink-0 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
          </button>
          {sortOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 z-50 bg-white rounded-2xl shadow-lg py-2 min-w-[120px] overflow-hidden">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSortOrder(opt); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm leading-5 hover:bg-[#F6F6F5] transition-colors ${sortOrder === opt ? "text-[#FB652B] font-medium" : "text-[#1C1C1C]"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4 mt-2">
        {sorted.length > 0 ? (
          sorted.map((specialist) => (
            <SpecialistCard
              key={specialist.id}
              specialist={specialist}
              defaultSelectedTime={specialist.nextAvailable.times[1]?.[1] ?? "14:00"}
            />
          ))
        ) : (
          <div className="bg-white rounded-[24px] p-12 flex flex-col items-center gap-4 text-center">
            <p className="text-[#013D47] text-xl font-medium leading-6">No specialists found</p>
            <p className="text-[#494947] text-base font-normal leading-6 max-w-[400px]">
              Try adjusting your search or removing some filters to see more results.
            </p>
          </div>
        )}
      </div>

      {/* View More */}
      {sorted.length > 0 && (
        <div className="flex justify-center mt-8">
          <button className="border-[1.5px] border-[#FB652B] rounded-full h-10 px-6 text-[#FB652B] text-base font-medium leading-6 whitespace-nowrap hover:bg-[#FB652B]/10 active:bg-[#FB652B]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 cursor-pointer">
            View More
          </button>
        </div>
      )}
    </div>
  );
}
