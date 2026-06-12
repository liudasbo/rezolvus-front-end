// app/components/specialists/ProfileHero.tsx

import Image from "next/image";
import type { Specialist } from "@/app/data/specialists";

function CertificateIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2.5L12.245 7.045L17.3 7.8L13.65 11.355L14.49 16.39L10 14.025L5.51 16.39L6.35 11.355L2.7 7.8L7.755 7.045L10 2.5Z"
        stroke="#2B2B2A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="#2B2B2A" strokeWidth="1.5" />
      <path
        d="M10 2.5c0 0-3.125 2.5-3.125 7.5s3.125 7.5 3.125 7.5M10 2.5c0 0 3.125 2.5 3.125 7.5S10 17.5 10 17.5M2.5 10h15"
        stroke="#2B2B2A"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="6" r="3.5" stroke="#2B2B2A" strokeWidth="1.5" />
      <path
        d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7"
        stroke="#2B2B2A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface ProfileHeroProps {
  specialist: Specialist;
}

export default function ProfileHero({ specialist }: ProfileHeroProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Photo */}
      <div className="w-full aspect-[4/3] lg:w-[416px] lg:h-[406px] lg:aspect-auto shrink-0 relative rounded-[24px] overflow-hidden">
        <Image
          src={specialist.photo}
          alt={specialist.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-5 flex-1 min-w-0 lg:w-[368px] lg:flex-none">
        {/* Name + specializations */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[#0d0d0d] text-[32px] font-medium leading-10 tracking-[-0.96px] capitalize">
            {specialist.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0">
            {specialist.specializations.map((spec, i) => (
              <span key={`${spec}-${i}`} className="flex items-center gap-3">
                <span className="text-[rgba(13,13,13,0.65)] text-[14px] leading-5">
                  {spec}
                </span>
                {i < specialist.specializations.length - 1 && (
                  <span className="w-[3px] h-[3px] rounded-full bg-[rgba(13,13,13,0.65)] shrink-0" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <CertificateIcon />
            <span className="text-[#2b2b2a] text-[14px] leading-5">
              {specialist.yearsExperience} of experience
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/icon-star.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 shrink-0"
            />
            <span className="text-[#2b2b2a] text-[14px] leading-5">
              {specialist.rating} rating
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="/images/icon-users-three.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 shrink-0"
            />
            <span className="text-[#2b2b2a] text-[14px] leading-5">
              {specialist.reviewsCount} reviews
            </span>
          </div>
          <div className="flex items-center gap-2">
            <GlobeIcon />
            <span className="text-[#2b2b2a] text-[14px] leading-5">
              {specialist.languages.join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PersonIcon />
            <span className="text-[#2b2b2a] text-[14px] leading-5">
              {specialist.ageGroups}
            </span>
          </div>
        </div>

        {/* Specializes in */}
        <div className="flex flex-col gap-2">
          <p className="text-[#1c1c1c] text-[14px] font-medium leading-5">
            Specializes in:
          </p>
          <div className="flex flex-wrap gap-2">
            {specialist.specializationTags.map((tag) => (
              <span
                key={tag}
                className="bg-white rounded-full px-3 py-2 text-[14px] text-[rgba(13,13,13,0.65)] leading-5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
