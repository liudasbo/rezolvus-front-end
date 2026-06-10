"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Header from "../Header";

const dropdownOptions: Record<string, string[]> = {
  Specialist: ["Psychologist", "Physiotherapist", "Therapist", "Wellness Coach", "Nutritionist"],
  Location: ["Vilnius", "Kaunas", "Klaipėda", "Online"],
  "Consultation type": ["In person", "Online", "Hybrid"],
};

function SearchDropdown({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-white/10 border border-[rgba(13,13,13,0.1)] rounded-full h-12 w-[185px] flex items-center justify-between px-5 py-2 text-[#1C1C1C] text-base font-normal leading-6 hover:bg-white/20 active:bg-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 cursor-pointer"
        aria-expanded={open}
      >
        <span className={`truncate ${selected ? "text-[#1C1C1C]" : "text-[#858482]"}`}>
          {selected ?? label}
        </span>
        <img
          src="/images/icon-caret-down.svg"
          alt=""
          className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 bg-white rounded-2xl shadow-lg py-2 min-w-full overflow-hidden">
          {dropdownOptions[label]?.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm leading-5 hover:bg-[#F6F6F5] transition-colors ${selected === opt ? "text-[#FB652B] font-medium" : "text-[#1C1C1C]"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-[780px] overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />
      {/* Gradient overlay */}
      <Image
        src="/images/hero-overlay.png"
        alt=""
        fill
        className="object-cover"
        priority
      />

      {/* Nav */}
      <Header />

      {/* Headline block — centered, top 236px */}
      <div className="absolute top-[236px] left-0 right-0 flex flex-col items-center gap-4 text-center px-4">
        <h1 className="text-white text-[64px] font-medium leading-[80px] tracking-[-1.92px] capitalize max-w-[723px]">
          Find the right specialist{" "}
          <br />
          without the stress
        </h1>
        <p className="text-white text-lg font-normal leading-[27px] max-w-[601px]">
          Discover verified psychologists, physiotherapists, wellness specialists,
          and more — all in one modern platform designed around trust and simplicity.
        </p>
      </div>

      {/* Search bar — top 564px, centered, 816px wide */}
      <div className="absolute top-[564px] left-1/2 -translate-x-1/2 w-[816px]">
        <div className="relative bg-white backdrop-blur-xl rounded-full p-3 flex items-center gap-8">
          {/* Decorative bunny (top-left) */}
          <img
            src="/images/search-bunny.svg"
            alt=""
            className="absolute -top-12 left-[82px] w-16 pointer-events-none"
          />
          {/* Decorative creature (bottom-right) */}
          <img
            src="/images/search-creature.svg"
            alt=""
            className="absolute -bottom-[25px] right-[194px] w-[72px] pointer-events-none"
          />

          {/* Dropdowns */}
          <div className="flex items-center gap-3">
            {Object.keys(dropdownOptions).map((label) => (
              <SearchDropdown key={label} label={label} />
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/find-specialists"
            className="bg-[#FB652B] rounded-full h-12 px-6 flex items-center justify-center text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-[#e85520] active:bg-[#d44a18] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60"
          >
            Find My Specialist
          </Link>
        </div>
      </div>

      {/* Rating strip — top 700px, centered */}
      <div className="absolute top-[700px] left-1/2 -translate-x-1/2">
        <div className="bg-white/15 backdrop-blur-sm border border-white rounded-full h-12 flex items-center gap-3 pl-2 pr-4 py-2">
          {/* Overlapping avatars */}
          <div className="flex items-center">
            <img src="/images/avatar-1.png" alt="" className="w-8 h-8 rounded-full relative z-30" style={{marginRight: '-16px'}} />
            <img src="/images/avatar-2.png" alt="" className="w-8 h-8 rounded-full relative z-20" style={{marginRight: '-16px'}} />
            <img src="/images/avatar-3.png" alt="" className="w-8 h-8 rounded-full relative z-10 mr-2" />
          </div>
          {/* Stars */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <img key={i} src="/images/icon-star-rating.svg" alt="" className="w-5 h-5" />
            ))}
          </div>
          {/* Rating text */}
          <div className="flex items-center gap-2 text-base leading-6">
            <span className="text-white font-medium">4.8/5.0</span>
            <span className="text-white/70 font-normal">(1.1K+ reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
