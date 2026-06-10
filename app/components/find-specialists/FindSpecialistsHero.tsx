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
    <section className="relative w-full h-[542px] bg-[#013D47] overflow-visible">
      {/* Header nav */}
      <Header />

      {/* Left decorative creature */}
      <img
        src="/images/find-hero-creature-left.svg"
        alt=""
        className="absolute pointer-events-none"
        style={{ left: "-16px", top: "372px", width: "196px", height: "213px" }}
      />

      {/* Right decorative creature */}
      <img
        src="/images/find-hero-creature-right.svg"
        alt=""
        className="absolute pointer-events-none"
        style={{ left: "1222px", top: "171px", width: "261px", height: "249px" }}
      />

      {/* Center content */}
      <div
        className="absolute flex flex-col gap-8 items-center"
        style={{ left: "404px", top: "140px", width: "632px" }}
      >
        {/* Title + subtitle */}
        <div className="flex flex-col gap-4 items-center w-full">
          <h1 className="text-white text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize text-center w-full">
            Find Specialists
          </h1>
          <p className="text-white/80 text-[18px] font-normal leading-7 text-center">
            Connect with experienced professionals tailored to your personal health
            <br />
            and wellness needs.
          </p>
        </div>

        {/* Search bar */}
        <div className="bg-white h-12 rounded-full flex items-center gap-2 pl-3 pr-[2px] w-[438px] relative">
          <img src="/images/icon-search.svg" alt="" className="w-6 h-6 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by specialist, concern, or condition..."
            className="flex-1 text-[#0D0D0D] text-base leading-5 outline-none bg-transparent placeholder:text-[#858482]"
          />
          <button
            onClick={() => {}}
            className="bg-[#FB652B] rounded-full h-[40px] px-5 text-white text-sm font-medium leading-5 whitespace-nowrap hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 shrink-0"
          >
            Search
          </button>
        </div>

        {/* Popular tags */}
        <div className="flex flex-wrap gap-4 items-center justify-center w-[632px]">
          {popularTags.map((tag, i) => (
            <button
              key={`${tag}-${i}`}
              onClick={() => onSearchChange(tag)}
              className="bg-white/5 h-10 flex items-center gap-2 pl-2 pr-4 rounded-full text-white text-sm font-normal leading-5 whitespace-nowrap hover:bg-white/10 active:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
            >
              <img src="/images/icon-search.svg" alt="" className="w-5 h-5 opacity-80" />
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
