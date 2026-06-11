import React from "react";
import Link from "next/link";

type Area = {
  title: string;
  img: string;
  imgStyle: React.CSSProperties;
  bg?: string;
};

const areas: Area[] = [
  {
    title: "Speech & Language Therapy",
    img: "/images/area-speech.svg",
    imgStyle: { position: "absolute", bottom: "-7px", right: "16px", width: "150px", height: "119px" },
    bg: "bg-white",
  },
  {
    title: "Occupational & Educational Support",
    img: "/images/area-occupational.svg",
    imgStyle: { position: "absolute", left: "246px", top: "99px", width: "154px", height: "120px" },
  },
  {
    title: "Physiotherapy & Rehabilitation",
    img: "/images/area-physiotherapy.svg",
    imgStyle: { position: "absolute", bottom: 0, right: "16px", width: "186px", height: "120px" },
  },
  {
    title: "Physical Wellness & Recovery",
    img: "/images/area-wellness.svg",
    imgStyle: { position: "absolute", bottom: 0, left: "56px", width: "184px", height: "100px" },
  },
  {
    title: "Child Development Support",
    img: "/images/area-child.svg",
    imgStyle: { position: "absolute", left: "269px", top: "97px", width: "130px", height: "120px" },
  },
  {
    title: "Sports & Injury Recovery",
    img: "/images/area-sports.svg",
    imgStyle: { position: "absolute", bottom: 0, right: "16px", width: "155px", height: "122px" },
  },
];

export default function HealthAreasSection() {
  return (
    <section className="bg-[#013D47] w-full px-5 sm:px-10 xl:px-20 py-10 lg:py-14 xl:py-[56px] flex flex-col gap-8 lg:gap-12 relative overflow-hidden">
      {/* Background decorative wave */}
      <img
        src="/images/health-areas-wave.svg"
        alt=""
        className="absolute pointer-events-none"
        style={{ width: "1686px", height: "582px", top: "65px", left: "calc(50% - 843px)" }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between w-full relative gap-4 md:gap-8">
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase">
            SUPPORT FOR EVERY NEED
          </p>
          <h2 className="text-white text-[28px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize max-w-[445px]">
            Explore Popular Specialist Categories
          </h2>
        </div>
        <p className="text-white/80 text-base lg:text-lg font-normal leading-7 max-w-full md:max-w-[400px] xl:max-w-[494px]">
          Find trusted specialists for speech development, rehabilitation,
          movement, recovery, and long-term wellbeing.
        </p>
      </div>

      {/* 6 area cards — 2 rows × 3 cols */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full relative">
        {areas.map((area) => (
          <div
            key={area.title}
            className={`${area.bg ?? "bg-[#EDECEC]"} rounded-[24px] h-[150px] sm:h-[170px] lg:h-[209px] pl-4 lg:pl-6 pr-4 py-4 flex items-start justify-between overflow-hidden relative hover:opacity-90 transition-opacity cursor-pointer`}
          >
            <p className="text-black text-base sm:text-lg lg:text-[24px] font-medium lg:leading-8 capitalize flex-1 pr-2">
              {area.title}
            </p>
            <img src="/images/icon-arrow-up-right.svg" alt="" className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
            <img
              src={area.img}
              alt=""
              className="pointer-events-none"
              style={area.imgStyle}
            />
          </div>
        ))}
      </div>

      {/* "Not sure who's right for you?" banner */}
      <div className="relative overflow-hidden bg-white rounded-[24px] lg:rounded-[32px] px-6 sm:px-10 lg:px-16 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
        {/* Background decoratives */}
        <img
          src="/images/not-sure-ellipse.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
        />
        <img
          src="/images/not-sure-wave.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Text */}
        <div className="flex flex-col gap-3 lg:gap-4 relative z-10 max-w-[570px]">
          <h2 className="text-black text-[24px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
            Not sure who&apos;s right for you?
          </h2>
          <p className="text-[#494947] text-base lg:text-lg font-normal leading-6 lg:leading-7">
            Answer a few simple questions and let Rezolvus match you with the
            right specialists for your needs
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/find-specialists"
          className="bg-[#FB652B] rounded-full h-12 lg:h-14 px-6 lg:px-8 flex items-center justify-center text-white text-base font-medium leading-6 whitespace-nowrap hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 shrink-0 relative z-10"
        >
          Get Matched
        </Link>
      </div>
    </section>
  );
}
