import React from "react";

type Area = {
  title: string;
  img: string;
  imgClass: string;
  imgStyle: React.CSSProperties;
};

const areas: Area[] = [
  {
    title: "Anxiety & Stress",
    img: "/images/area-anxiety.svg",
    imgClass: "absolute w-[155px] h-[122px] pointer-events-none",
    imgStyle: { left: "62px", top: "87px" },
  },
  {
    title: "Physical Recovery",
    img: "/images/area-physical.svg",
    imgClass: "absolute pointer-events-none",
    imgStyle: { inset: "55.02% -19.32% -14.83% 37.5%" },
  },
  {
    title: "Sleep Problems",
    img: "/images/area-sleep.svg",
    imgClass: "absolute w-[150px] h-[119px] pointer-events-none",
    imgStyle: { left: "55px", top: "110px" },
  },
  {
    title: "Nutrition & Lifestyle",
    img: "/images/area-nutrition.svg",
    imgClass: "absolute pointer-events-none",
    imgStyle: { inset: "45.45% -9.09% -9.18% 44.32%" },
  },
  {
    title: "Burnout",
    img: "/images/area-burnout.svg",
    imgClass: "absolute pointer-events-none",
    imgStyle: { inset: "63.64% -0.16% -0.13% 22.24%" },
  },
  {
    title: "Relationship Problems",
    img: "/images/area-relationship.svg",
    imgClass: "absolute pointer-events-none",
    imgStyle: { inset: "46.89% -4.37% -9.34% 47.4%" },
  },
];

export default function HealthAreasSection() {
  return (
    <section className="bg-[#013D47] w-full px-20 py-14 flex flex-col gap-12 relative overflow-hidden">
      {/* Background decorative wave */}
      <img
        src="/images/health-areas-wave.svg"
        alt=""
        className="absolute pointer-events-none"
        style={{ width: "1686px", height: "582px", top: "65px", left: "calc(50% - 843px)" }}
      />

      <div className="flex items-end justify-between w-full relative">
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase">
            SUPPORT FOR EVERY NEED
          </p>
          <h2 className="text-white text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize w-[445px]">
            Health &amp; Wellness Popular Support Areas
          </h2>
        </div>
        <p className="text-white/80 text-lg font-normal leading-7 w-[494px]">
          Whether you&apos;re dealing with stress, physical pain, burnout, or simply
          looking to improve your well-being — Rezolvus helps you find the right
          support faster.
        </p>
      </div>

      <div className="flex gap-4 w-full relative">
        {areas.map((area) => (
          <div
            key={area.title}
            className="bg-[#EDECEC] rounded-[24px] flex-1 min-w-0 h-[209px] pl-6 pr-4 py-4 flex items-start justify-between overflow-hidden relative hover:bg-[#E4E3E3] transition-colors cursor-pointer group"
          >
            <p className="text-black text-xl font-medium leading-6 capitalize flex-1 pr-4">
              {area.title}
            </p>
            <img src="/images/icon-arrow-up-right.svg" alt="" className="w-6 h-6 shrink-0" />
            <img
              src={area.img}
              alt=""
              className={area.imgClass}
              style={area.imgStyle}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
