// app/components/specialists/ProfileContent.tsx
"use client";

import { useState } from "react";
import type { Specialist } from "@/app/data/specialists";

function PlusIcon({ rotated }: { rotated?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`transition-transform duration-200 ${rotated ? "rotate-[135deg]" : ""}`}
    >
      <path d="M12 5V19M5 12H19" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M8 6L22 14L8 22V6Z" fill="white" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L1 6L8 10L15 6L8 2Z" stroke="#013d47" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M4 8v4c0 1.1 1.79 2 4 2s4-.9 4-2V8" stroke="#013d47" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M15 6v4" stroke="#013d47" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

interface ProfileContentProps {
  specialist: Specialist;
}

type MainTab = "Overview" | "Reviews";
type SessionTab = "Options" | "Type";
type QualificationTab = "Education" | "Experience" | "Approach";

export default function ProfileContent({ specialist }: ProfileContentProps) {
  const [mainTab, setMainTab] = useState<MainTab>("Overview");
  const [sessionTab, setSessionTab] = useState<SessionTab>("Options");
  const [qualTab, setQualTab] = useState<QualificationTab>("Education");
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [openFaqIds, setOpenFaqIds] = useState<Set<string>>(new Set([specialist.faq[0]?.id]));
  const [showAllSessions, setShowAllSessions] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredQualifications = specialist.qualifications.filter((q) => {
    if (qualTab === "Education") return q.type === "education";
    if (qualTab === "Experience") return q.type === "experience";
    return q.type === "approach";
  });

  const visibleSessions = showAllSessions ? specialist.sessions : specialist.sessions.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      {/* Main tabs: Overview / Reviews */}
      <div className="flex items-end border-b border-[rgba(13,13,13,0.15)]">
        {(["Overview", "Reviews"] as MainTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={[
              "flex items-center gap-2 px-6 py-2 text-[16px] leading-6 transition-colors cursor-pointer focus-visible:outline-none",
              mainTab === tab
                ? "border-b-[3px] border-[#fb652b] text-[#1c1c1c] font-medium -mb-px"
                : "text-[#676665] font-normal hover:text-[#1c1c1c]",
            ].join(" ")}
          >
            {tab}
            {tab === "Reviews" && (
              <span className="bg-[#013d47] text-white text-[12px] leading-5 rounded-full px-1 min-w-[20px] flex items-center justify-center">
                {specialist.reviewsCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {mainTab === "Overview" && (
        <div className="flex flex-col gap-16">
          {/* About Me */}
          <section className="flex flex-col gap-6">
            <h2 className="text-[#013d47] text-[24px] font-medium leading-8">About Me</h2>
            <div className="flex flex-col gap-1">
              <p className="text-[#494947] text-[16px] leading-6">
                {aboutExpanded ? specialist.aboutFull : specialist.aboutFull.slice(0, 300) + (specialist.aboutFull.length > 300 ? "..." : "")}
              </p>
              {specialist.aboutFull.length > 300 && (
                <button
                  onClick={() => setAboutExpanded((v) => !v)}
                  className="text-[#fb652b] text-[16px] font-medium leading-6 self-start hover:underline focus-visible:outline-none cursor-pointer"
                >
                  {aboutExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
            {/* Video/photo card */}
            <div className="relative h-[320px] lg:h-[459px] rounded-[24px] overflow-hidden bg-[#e4dece]">
              <img
                src={specialist.photo}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <button
                aria-label="Play video"
                className="absolute inset-0 flex items-center justify-center group focus-visible:outline-none"
              >
                <span className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <PlayIcon />
                </span>
              </button>
            </div>
          </section>

          {/* Session Options & Type */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-[#013d47] text-[24px] font-medium leading-8 whitespace-nowrap">
                Session Options &amp; Type
              </h2>
              <div className="bg-[rgba(13,13,13,0.05)] border border-[#dadad9] flex gap-1 p-1 rounded-[12px] overflow-x-auto no-scrollbar">
                {(["Options", "Type"] as SessionTab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSessionTab(t)}
                    className={[
                      "px-6 py-2 rounded-[8px] text-[14px] leading-5 transition-colors cursor-pointer focus-visible:outline-none",
                      sessionTab === t
                        ? "bg-white text-[#fb652b] font-medium"
                        : "text-[#676665] hover:text-[#1c1c1c]",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {sessionTab === "Options" ? (
              <>
                <div className="flex flex-col gap-3">
                  {visibleSessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-white rounded-[24px] p-6 flex gap-8 items-start"
                    >
                      <div className="flex-1 min-w-0 flex flex-col gap-3">
                        <p className="text-[#1c1c1c] text-[20px] font-medium leading-6">{session.name}</p>
                        <p className="text-[#494947] text-[14px] leading-5">{session.description}</p>
                      </div>
                      <div className="bg-[#e4dece] rounded-[12px] px-4 py-3 flex flex-col items-center shrink-0 min-w-[80px] text-right">
                        <span className="text-[#013d47] text-[14px] font-medium leading-5">{session.price}</span>
                        <span className="text-[rgba(1,61,71,0.75)] text-[14px] leading-5">{session.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {specialist.sessions.length > 3 && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowAllSessions((v) => !v)}
                      className="text-[#fb652b] text-[16px] font-medium leading-6 hover:underline focus-visible:outline-none cursor-pointer"
                    >
                      {showAllSessions ? "Show fewer sessions" : "View more sessions"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-[24px] p-6 flex flex-col gap-4">
                <p className="text-[#1c1c1c] text-[16px] font-medium leading-6">Available session formats</p>
                <div className="flex gap-3">
                  {specialist.sessionTypes.map((type) => (
                    <div
                      key={type}
                      className="bg-[rgba(13,13,13,0.05)] rounded-[12px] px-4 py-3 flex items-center gap-2"
                    >
                      <img
                        src={type === "In person" ? "/images/icon-armchair.svg" : "/images/icon-laptop.svg"}
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5 shrink-0"
                      />
                      <span className="text-[#1c1c1c] text-[14px] leading-5">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Qualification */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-[#013d47] text-[24px] font-medium leading-8 whitespace-nowrap">
                Qualification
              </h2>
              <div className="bg-[rgba(13,13,13,0.05)] border border-[#dadad9] flex gap-1 p-1 rounded-[12px] overflow-x-auto no-scrollbar">
                {(["Education", "Experience", "Approach"] as QualificationTab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setQualTab(t)}
                    className={[
                      "px-6 py-2 rounded-[8px] text-[14px] leading-5 transition-colors cursor-pointer focus-visible:outline-none whitespace-nowrap",
                      qualTab === t
                        ? "bg-white text-[#fb652b] font-medium"
                        : "text-[#676665] hover:text-[#1c1c1c]",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {filteredQualifications.length > 0 ? (
                filteredQualifications.map((q) => (
                  <div key={q.id} className="bg-white rounded-[24px] p-6 flex flex-col gap-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <p className="text-[#1c1c1c] text-[20px] font-medium leading-6">{q.title}</p>
                        <div className="flex items-center gap-2">
                          <GraduationCapIcon />
                          <span className="text-[#013d47] text-[14px] font-medium leading-5">{q.institution}</span>
                        </div>
                      </div>
                      {q.year && (
                        <span className="bg-[#e4dece] rounded-full px-3 py-1 text-[#013d47] text-[14px] font-medium leading-5 whitespace-nowrap shrink-0">
                          {q.year}
                        </span>
                      )}
                    </div>
                    <p className="text-[#676665] text-[14px] leading-5">{q.description}</p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-[24px] p-6">
                  <p className="text-[#676665] text-[14px] leading-5">No {qualTab.toLowerCase()} information available.</p>
                </div>
              )}
            </div>
          </section>

          {/* FAQ */}
          <section className="flex flex-col gap-6">
            <h2 className="text-[#013d47] text-[24px] font-medium leading-8">FAQ</h2>
            <div className="flex flex-col gap-3">
              {specialist.faq.map((item) => {
                const isOpen = openFaqIds.has(item.id);
                return (
                  <div key={item.id} className="bg-white rounded-[16px] overflow-hidden">
                    <button
                      onClick={() => toggleFaq(item.id)}
                      className="w-full flex items-start gap-3 p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#013d47]/30"
                    >
                      <span className="flex-1 text-[#1c1c1c] text-[18px] sm:text-[20px] font-medium leading-6">{item.question}</span>
                      <span className="shrink-0 mt-0.5">
                        <PlusIcon rotated={isOpen} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <p className="text-[#676665] text-[14px] leading-5">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* ── REVIEWS TAB ── */}
      {mainTab === "Reviews" && (
        <div className="bg-white rounded-[24px] p-6">
          <p className="text-[#676665] text-[16px] leading-6">No reviews yet.</p>
        </div>
      )}
    </div>
  );
}
