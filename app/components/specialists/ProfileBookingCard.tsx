// app/components/specialists/ProfileBookingCard.tsx
"use client";

import { useState } from "react";
import type { Specialist } from "@/app/data/specialists";

function ChevronLeftIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={disabled ? "opacity-35" : ""}>
      <path d="M12.5 15L7.5 10L12.5 5" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L3.5 4.5V9.5C3.5 13.09 6.24 16.45 10 17.5C13.76 16.45 16.5 13.09 16.5 9.5V4.5L10 2Z" fill="#013d47" />
      <path d="M7.5 10L9.5 12L12.5 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1 13h14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function ArmchairIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M2 7h12v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

interface ProfileBookingCardProps {
  specialist: Specialist;
}

export default function ProfileBookingCard({ specialist }: ProfileBookingCardProps) {
  const { nextAvailable, sessionTypes, sessions } = specialist;

  const firstAvailableDay = nextAvailable.dates.find((d) => d.available)?.day ?? nextAvailable.dates[0].day;
  const [selectedDay, setSelectedDay] = useState(firstAvailableDay);
  const [selectedTime, setSelectedTime] = useState<string>(nextAvailable.times[1]?.[1] ?? "14:00");
  const [selectedFormat, setSelectedFormat] = useState<"Online" | "In person">(
    sessionTypes.includes("In person") ? "In person" : "Online"
  );
  const [selectedSession, setSelectedSession] = useState(sessions[1] ?? sessions[0]);

  return (
    <div id="booking" className="bg-white rounded-[24px] pt-6 pb-4 px-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[#1c1c1c] text-[24px] font-medium leading-8">Book session</p>
        <p className="text-[#1c1c1c] text-[14px] leading-5">GMT+3 Timezone</p>
      </div>

      {/* Option selector */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-[#1c1c1c] text-[14px] font-medium leading-5">Option</p>
          <div className="relative">
            <select
              className="w-full bg-[rgba(13,13,13,0.05)] h-12 rounded-[8px] px-4 text-[#1c1c1c] text-[14px] leading-5 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#013d47]/30"
              value={selectedSession.id}
              onChange={(e) => {
                const s = sessions.find((s) => s.id === e.target.value);
                if (s) setSelectedSession(s);
              }}
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <img
              src="/images/icon-caret-down.svg"
              alt=""
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-[rgba(13,13,13,0.05)] rounded-[8px] flex items-center justify-center gap-1 py-2">
            <span className="text-[#676665] text-[12px] leading-5">Time:</span>
            <span className="text-[#013d47] text-[14px] font-medium leading-5">{selectedSession.duration.split("/")[0].trim()}</span>
          </div>
          <div className="flex-1 bg-[rgba(13,13,13,0.05)] rounded-[8px] flex items-center justify-center gap-1 py-2">
            <span className="text-[#676665] text-[12px] leading-5">Price:</span>
            <span className="text-[#013d47] text-[14px] font-medium leading-5">{selectedSession.price.split("/")[0].trim()}</span>
          </div>
        </div>
      </div>

      {/* Format */}
      <div className="flex flex-col gap-1">
        <p className="text-[#1c1c1c] text-[14px] font-medium leading-5">Format</p>
        <div className="flex gap-2">
          {(["Online", "In person"] as const).map((format) => {
            const available = sessionTypes.includes(format);
            const isSelected = selectedFormat === format;
            return (
              <button
                key={format}
                onClick={() => available && setSelectedFormat(format)}
                disabled={!available}
                className={[
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-[8px] text-[14px] leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/30",
                  isSelected
                    ? "bg-[rgba(13,13,13,0.05)] border border-[#fb652b] text-[#1c1c1c]"
                    : available
                    ? "bg-[rgba(13,13,13,0.05)] text-[#1c1c1c] hover:bg-[rgba(13,13,13,0.08)] cursor-pointer"
                    : "bg-[rgba(13,13,13,0.03)] text-[rgba(13,13,13,0.3)] cursor-not-allowed",
                ].join(" ")}
              >
                {format === "Online" ? <LaptopIcon /> : <ArmchairIcon />}
                {format}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date picker */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-[14px] leading-5">
          <span className="font-medium text-[#1c1c1c]">Choose time</span>
          <span className="text-[#676665] font-normal">{nextAvailable.weekLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled
            className="w-8 h-[52px] flex items-center justify-center rounded-[8px] cursor-not-allowed focus-visible:outline-none shrink-0"
          >
            <ChevronLeftIcon disabled />
          </button>
          {nextAvailable.dates.slice(0, 4).map((d) => {
            const isSelected = d.day === selectedDay;
            const isUnavailable = !d.available;
            return (
              <button
                key={d.day}
                onClick={() => d.available && setSelectedDay(d.day)}
                disabled={isUnavailable}
                className={[
                  "flex-1 h-[52px] flex flex-col items-center justify-center rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2",
                  isSelected
                    ? "bg-[#fb652b] focus-visible:ring-[#fb652b]/60"
                    : isUnavailable
                    ? "bg-[#f6f6f5] opacity-50 cursor-not-allowed"
                    : "bg-[rgba(13,13,13,0.05)] hover:bg-[rgba(13,13,13,0.08)] cursor-pointer focus-visible:ring-[#013d47]/30",
                ].join(" ")}
              >
                <span className={["text-[16px] font-medium leading-6", isSelected ? "text-white" : "text-[#1c1c1c]"].join(" ")}>
                  {d.day}
                </span>
                <span className={["text-[14px] leading-5", isSelected ? "text-white/80" : "text-[rgba(13,13,13,0.5)]"].join(" ")}>
                  {d.dayName}
                </span>
              </button>
            );
          })}
          <button className="w-8 h-[52px] flex items-center justify-center rounded-[8px] hover:bg-[rgba(13,13,13,0.05)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/30 shrink-0">
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Time slots */}
      <div className="flex flex-col gap-2 pt-3">
        {nextAvailable.times.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2">
            {row.map((time) => {
              if (!time) return null;
              const isSelected = time !== "View All" && time === selectedTime;
              const isViewAll = time === "View All";
              return (
                <button
                  key={time}
                  onClick={() => !isViewAll && setSelectedTime(time)}
                  className={[
                    "flex-1 py-2 flex items-center justify-center rounded-[8px] text-[14px] leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 cursor-pointer",
                    isSelected
                      ? "bg-[rgba(13,13,13,0.05)] border border-[#fb652b] text-[#1c1c1c] focus-visible:ring-[#fb652b]/60"
                      : isViewAll
                      ? "bg-transparent text-[#fb652b] font-medium hover:underline focus-visible:ring-[#fb652b]/40"
                      : "bg-[rgba(13,13,13,0.05)] text-[#1c1c1c] hover:bg-[rgba(13,13,13,0.08)] focus-visible:ring-[#013d47]/30",
                  ].join(" ")}
                >
                  {time}
                </button>
              );
            })}
          </div>
        ))}
        <div className="flex justify-center">
          <button className="text-[#fb652b] text-[14px] font-medium leading-5 hover:underline focus-visible:outline-none cursor-pointer">
            View more availabilities
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2">
        <button className="w-full bg-[#fb652b] rounded-full py-3 text-white text-[16px] font-medium leading-6 hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/60 cursor-pointer">
          Login to Book
        </button>
        <div className="flex items-center justify-center gap-2">
          <ShieldCheckIcon />
          <span className="text-[#013d47] text-[14px] leading-5">Free cancellation within 24h</span>
        </div>
      </div>
    </div>
  );
}
