"use client";

import { useState } from "react";
import Image from "next/image";
import type { Specialist } from "@/app/data/specialists";

function CertificateIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5L12.245 7.045L17.3 7.8L13.65 11.355L14.49 16.39L10 14.025L5.51 16.39L6.35 11.355L2.7 7.8L7.755 7.045L10 2.5Z" stroke="#2B2B2A" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="#2B2B2A" strokeWidth="1.5"/>
      <path d="M10 2.5c0 0-3.125 2.5-3.125 7.5s3.125 7.5 3.125 7.5M10 2.5c0 0 3.125 2.5 3.125 7.5S10 17.5 10 17.5M2.5 10h15" stroke="#2B2B2A" strokeWidth="1.5"/>
    </svg>
  );
}

function ChevronLeftIcon({ opacity }: { opacity?: number }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity }}>
      <path d="M12.5 15L7.5 10L12.5 5" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

interface SpecialistCardProps {
  specialist: Specialist;
  defaultSelectedDay?: number;
  defaultSelectedTime?: string;
}

export default function SpecialistCard({
  specialist,
  defaultSelectedDay,
  defaultSelectedTime = "14:00",
}: SpecialistCardProps) {
  const firstAvailableDay =
    defaultSelectedDay ??
    specialist.nextAvailable.dates.find((d) => d.available)?.day ??
    specialist.nextAvailable.dates[0].day;

  const [selectedDay, setSelectedDay] = useState(firstAvailableDay);
  const [selectedTime, setSelectedTime] = useState<string>(defaultSelectedTime);

  const { nextAvailable } = specialist;

  return (
    <div className="bg-white rounded-[24px] p-2 flex gap-4 items-stretch h-[416px]">
      {/* ── Photo column ── */}
      <div className="w-[340px] shrink-0 relative rounded-[16px] overflow-hidden">
        <Image
          src={specialist.photo}
          alt={specialist.name}
          fill
          className="object-cover"
        />
        {/* Session type badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {specialist.sessionTypes.map((type) => (
            <span
              key={type}
              className="bg-white rounded-full px-3 py-1 flex items-center gap-2 text-sm font-normal leading-5 text-black whitespace-nowrap"
            >
              <img
                src={
                  type === "In person"
                    ? "/images/icon-armchair.svg"
                    : "/images/icon-laptop.svg"
                }
                alt=""
                className="w-4 h-4"
              />
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* ── Info column ── */}
      <div className="w-[304px] shrink-0 flex flex-col justify-between px-3 py-4">
        {/* Name + specializations */}
        <div className="flex flex-col gap-1">
          <p className="text-black text-[24px] font-medium leading-8">
            {specialist.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-2">
            {specialist.specializations.map((spec, i) => (
              <span key={`${spec}-${i}`} className="flex items-center gap-2">
                <span className="text-[rgba(13,13,13,0.65)] text-xs leading-5 whitespace-nowrap">
                  {spec}
                </span>
                {i < specialist.specializations.length - 1 && (
                  <span className="w-[3px] h-[3px] rounded-full bg-[rgba(13,13,13,0.65)] shrink-0" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <p className="text-[rgba(13,13,13,0.7)] text-sm leading-5 overflow-hidden">
          {specialist.bio}
        </p>

        {/* Stats */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CertificateIcon />
            <span className="text-[#2B2B2A] text-sm leading-5 whitespace-nowrap">
              {specialist.yearsExperience}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/icon-star.svg" alt="" className="w-5 h-5 shrink-0" />
            <span className="text-[#2B2B2A] text-sm leading-5 whitespace-nowrap">
              {specialist.rating} rating
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/icon-users-three.svg"
              alt=""
              className="w-5 h-5 shrink-0"
            />
            <span className="text-[#2B2B2A] text-sm leading-5 whitespace-nowrap">
              {specialist.reviewsCount} reviews
            </span>
          </div>
          <div className="flex items-center gap-2">
            <GlobeIcon />
            <span className="text-[#2B2B2A] text-sm leading-5 whitespace-nowrap">
              {specialist.languages.join(", ")}
            </span>
          </div>
        </div>

        {/* Price */}
        <p className="text-[#013D47] text-[24px] font-medium leading-8">
          from €{specialist.priceFrom}{" "}
          <span className="text-[rgba(1,61,71,0.75)] text-sm font-normal leading-5">
            /session
          </span>
        </p>
      </div>

      {/* ── Vertical divider ── */}
      <div className="self-stretch w-px bg-[rgba(13,13,13,0.08)] shrink-0" />

      {/* ── Right booking column ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-4 pr-4 py-4">
        {/* Session option + time + price pills */}
        <div className="flex items-end gap-2">
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <p className="text-black text-sm font-medium leading-5">Option</p>
            <div className="bg-[rgba(13,13,13,0.05)] h-12 rounded-lg flex items-center px-4 gap-4">
              <p className="flex-1 min-w-0 text-[#1C1C1C] text-sm leading-5 truncate">
                Select session option
              </p>
              <img
                src="/images/icon-caret-down.svg"
                alt=""
                className="w-5 h-5 shrink-0"
              />
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <div className="bg-[rgba(13,13,13,0.05)] h-12 rounded-lg flex items-center justify-center gap-1 px-6 whitespace-nowrap">
              <span className="text-[#676665] text-xs leading-5">Time:</span>
              <span className="text-[#013D47] text-sm font-medium leading-5">
                {specialist.sessionDuration} min
              </span>
            </div>
            <div className="bg-[rgba(13,13,13,0.05)] h-12 rounded-lg flex items-center justify-center gap-1 px-6 whitespace-nowrap">
              <span className="text-[#676665] text-xs leading-5">Price:</span>
              <span className="text-[#013D47] text-sm font-medium leading-5">
                €{specialist.priceFrom}
              </span>
            </div>
          </div>
        </div>

        {/* Date picker */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm leading-5">
            <span className="font-medium text-black">Next available</span>
            <span className="text-[#676665] font-normal">
              {nextAvailable.weekLabel}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Prev arrow */}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg opacity-35 cursor-not-allowed shrink-0">
              <ChevronLeftIcon />
            </button>

            {/* Days */}
            {nextAvailable.dates.map((d) => {
              const isSelected = d.day === selectedDay;
              const isUnavailable = !d.available;
              return (
                <button
                  key={d.day}
                  onClick={() => d.available && setSelectedDay(d.day)}
                  disabled={isUnavailable}
                  className={[
                    "flex-1 h-[52px] flex flex-col items-center justify-center rounded-lg transition-colors",
                    isSelected
                      ? "bg-[#FB652B]"
                      : isUnavailable
                      ? "bg-[#F6F6F5] opacity-50 cursor-not-allowed"
                      : "bg-[rgba(13,13,13,0.05)] hover:bg-[rgba(13,13,13,0.08)]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "text-base font-medium leading-6",
                      isSelected ? "text-white" : "text-[#0D0D0D]",
                    ].join(" ")}
                  >
                    {d.day}
                  </span>
                  <span
                    className={[
                      "text-sm leading-5",
                      isSelected
                        ? "text-white/80"
                        : "text-[rgba(13,13,13,0.5)]",
                    ].join(" ")}
                  >
                    {d.dayName}
                  </span>
                </button>
              );
            })}

            {/* Next arrow */}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(13,13,13,0.05)] transition-colors shrink-0">
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* Time slots */}
        <div className="flex flex-col gap-2">
          {nextAvailable.times.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-2">
              {row.map((time, tIdx) => {
                if (!time) return <div key={tIdx} className="flex-1" />;
                const isSelected = time !== "View All" && time === selectedTime;
                return (
                  <button
                    key={time}
                    onClick={() => time !== "View All" && setSelectedTime(time)}
                    className={[
                      "w-[133px] shrink-0 py-2 flex items-center justify-center rounded-lg text-[#1C1C1C] text-sm leading-5 transition-colors",
                      isSelected
                        ? "bg-[rgba(13,13,13,0.05)] border-[1.5px] border-[#FB652B]"
                        : "bg-[rgba(13,13,13,0.05)] hover:bg-[rgba(13,13,13,0.08)]",
                    ].join(" ")}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 h-10 border-[1.5px] border-[#FB652B] rounded-full text-[#FB652B] text-base font-medium leading-6 hover:bg-[#FB652B]/10 transition-colors">
            View Profile
          </button>
          <button className="flex-1 h-10 bg-[#FB652B] rounded-full text-white text-base font-medium leading-6 hover:bg-[#e85520] transition-colors">
            Book a Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
