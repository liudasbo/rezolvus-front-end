"use client";

import { useState, useRef, useEffect } from "react";

const filterDefs: { label: string; icon: React.ReactNode; options: string[] }[] = [
  {
    label: "Specialist",
    options: ["Psychologist", "Physiotherapist", "Therapist", "Wellness Coach", "Nutritionist"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 1.5c-4.14 0-7.5 2.1-7.5 4.687V17h15v-.813C17.5 13.6 14.14 11.5 10 11.5Z" fill="#1C1C1C" fillOpacity="0.85"/>
      </svg>
    ),
  },
  {
    label: "Session Type",
    options: ["In person", "Online"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 1.875A5.313 5.313 0 0 0 4.688 7.188c0 3.476 4.687 10.937 4.687 10.937s4.688-7.461 4.688-10.938A5.313 5.313 0 0 0 10 1.875Zm0 7.5a2.188 2.188 0 1 1 0-4.375 2.188 2.188 0 0 1 0 4.375Z" fill="#1C1C1C" fillOpacity="0.85"/>
      </svg>
    ),
  },
  {
    label: "Availability",
    options: ["Today", "This week", "This month"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="3.75" width="15" height="13.75" rx="1.5" stroke="#1C1C1C" strokeOpacity="0.85" strokeWidth="1.5"/>
        <path d="M2.5 7.5h15M6.875 2.5v2.5M13.125 2.5v2.5" stroke="#1C1C1C" strokeOpacity="0.85" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="6.875" cy="11.25" r="0.938" fill="#1C1C1C" fillOpacity="0.85"/>
        <circle cx="10" cy="11.25" r="0.938" fill="#1C1C1C" fillOpacity="0.85"/>
        <circle cx="13.125" cy="11.25" r="0.938" fill="#1C1C1C" fillOpacity="0.85"/>
        <circle cx="6.875" cy="14.375" r="0.938" fill="#1C1C1C" fillOpacity="0.85"/>
        <circle cx="10" cy="14.375" r="0.938" fill="#1C1C1C" fillOpacity="0.85"/>
      </svg>
    ),
  },
  {
    label: "Language",
    options: ["Lithuanian", "English", "German", "French", "Russian"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#1C1C1C" strokeOpacity="0.85" strokeWidth="1.5"/>
        <path d="M10 2.5c0 0-3.125 2.5-3.125 7.5s3.125 7.5 3.125 7.5M10 2.5c0 0 3.125 2.5 3.125 7.5S10 17.5 10 17.5M2.5 10h15" stroke="#1C1C1C" strokeOpacity="0.85" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "Price Range",
    options: ["€0–€50", "€50–€100", "€100+"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#1C1C1C" strokeOpacity="0.85" strokeWidth="1.5"/>
        <path d="M10 6.25v7.5M12.5 8.125a2.5 2.5 0 0 0-5 0c0 1.38 1.12 2.5 2.5 2.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1-2.5-2.5" stroke="#1C1C1C" strokeOpacity="0.85" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

interface FilterDropdownProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  selected: string | undefined;
  onSelect: (value: string | undefined) => void;
}

function FilterDropdown({ label, icon, options, selected, onSelect }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
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
        aria-expanded={open}
        className={`backdrop-blur-[10px] border-[1.5px] rounded-full h-12 flex items-center gap-4 px-[14px] whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013D47]/30 ${
          selected
            ? "bg-[#013D47]/10 border-[#013D47]/30 hover:bg-[#013D47]/15"
            : "bg-white/10 border-[rgba(13,13,13,0.1)] hover:bg-white/20 active:bg-white/30"
        }`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className={`text-base font-normal leading-6 ${selected ? "text-[#013D47] font-medium" : "text-[#1C1C1C]"}`}>
            {selected ?? label}
          </span>
        </div>
        <img
          src="/images/icon-caret-down.svg"
          alt=""
          className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
        {selected && (
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(undefined); }}
            className="ml-[-8px] w-5 h-5 flex items-center justify-center text-[#013D47] hover:text-[#FB652B] transition-colors text-lg leading-none"
            aria-label="Clear filter"
          >
            ×
          </button>
        )}
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 bg-white rounded-2xl shadow-lg py-2 min-w-full overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onSelect(opt === selected ? undefined : opt); setOpen(false); }}
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

interface SpecialistFiltersProps {
  activeFilters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
}

export default function SpecialistFilters({ activeFilters, onFilterChange }: SpecialistFiltersProps) {
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  function handleSelect(label: string, value: string | undefined) {
    const updated = { ...activeFilters };
    if (value === undefined) {
      delete updated[label];
    } else {
      updated[label] = value;
    }
    onFilterChange(updated);
  }

  return (
    <div className="flex items-center justify-between">
      {/* Filter dropdowns */}
      <div className="flex items-center gap-4">
        {filterDefs.map(({ label, icon, options }) => (
          <FilterDropdown
            key={label}
            label={label}
            icon={icon}
            options={options}
            selected={activeFilters[label]}
            onSelect={(v) => handleSelect(label, v)}
          />
        ))}
      </div>

      {/* More Filters button */}
      <button
        onClick={() => setMoreFiltersOpen((o) => !o)}
        className={`bg-[#FB652B] rounded-full h-12 flex items-center gap-2 pl-3 pr-5 text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 cursor-pointer ${moreFiltersOpen ? "ring-2 ring-[#FB652B]/60" : ""}`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M13 2.5V7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M7 7.5V12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M11 12.5V17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        More Filters
      </button>
    </div>
  );
}
