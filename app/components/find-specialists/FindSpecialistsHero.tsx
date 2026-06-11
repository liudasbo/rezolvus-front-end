"use client";

import Header from "../Header";

const popularTags = [
  "Couple therapy",
  "Burnout",
  "Sleep support",
  "Nutrition",
  "Stress",
  "Recovery",
  "Couple therapy",
];

interface FindSpecialistsHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function FindSpecialistsHero({ searchQuery, onSearchChange }: FindSpecialistsHeroProps) {
  return (
    <section className="relative w-full min-h-[420px] lg:min-h-[542px] bg-[#013D47] overflow-hidden flex flex-col items-center">
      {/* Header nav */}
      <Header />

      {/* Left decorative creature — hidden below xl to avoid overflow */}
      <img
        src="/images/find-hero-creature-left.svg"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none hidden xl:block"
        style={{ left: "-16px", bottom: "0", width: "196px", height: "213px" }}
      />

      {/* Right decorative creature — hidden below xl to avoid overflow */}
      <img
        src="/images/find-hero-creature-right.svg"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none hidden xl:block"
        style={{ right: "-16px", top: "171px", width: "261px", height: "249px" }}
      />

      {/* Center content */}
      <div className="relative z-10 w-full max-w-[632px] mx-auto px-5 sm:px-8 lg:px-0 flex flex-col gap-6 lg:gap-8 items-center pt-24 sm:pt-28 lg:pt-[140px] pb-10 lg:pb-[60px]">
        {/* Title + subtitle */}
        <div className="flex flex-col gap-3 lg:gap-4 items-center w-full">
          <h1 className="text-white text-[28px] sm:text-[32px] lg:text-[40px] font-semibold leading-tight lg:leading-[48px] tracking-[-0.56px] sm:tracking-[-0.64px] lg:tracking-[-0.8px] capitalize text-center w-full">
            Find Specialists
          </h1>
          <p className="text-white/80 text-[15px] sm:text-[16px] lg:text-[18px] font-normal leading-6 lg:leading-7 text-center max-w-[480px] lg:max-w-none">
            Connect with experienced professionals tailored to your personal health
            and wellness needs.
          </p>
        </div>

        {/* Search bar */}
        <div className="bg-white h-12 rounded-full flex items-center gap-2 pl-3 pr-[2px] w-full max-w-[438px] relative">
          <img src="/images/icon-search.svg" alt="" className="w-6 h-6 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by specialist, concern, or condition..."
            className="flex-1 min-w-0 text-[#0D0D0D] text-sm lg:text-base leading-5 outline-none bg-transparent placeholder:text-[#858482]"
          />
          <button
            onClick={() => {}}
            className="bg-[#FB652B] rounded-full h-[40px] px-4 lg:px-5 text-white text-sm font-medium leading-5 whitespace-nowrap hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 shrink-0"
          >
            Search
          </button>
        </div>

        {/* Popular tags */}
        <div className="flex flex-wrap gap-2 lg:gap-4 items-center justify-center w-full">
          {popularTags.map((tag, i) => (
            <button
              key={`${tag}-${i}`}
              onClick={() => onSearchChange(tag)}
              className="bg-white/5 h-9 lg:h-10 flex items-center gap-2 pl-2 pr-3 lg:pr-4 rounded-full text-white text-xs lg:text-sm font-normal leading-5 whitespace-nowrap hover:bg-white/10 active:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
            >
              <img src="/images/icon-search.svg" alt="" className="w-4 lg:w-5 h-4 lg:h-5 opacity-80" />
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
