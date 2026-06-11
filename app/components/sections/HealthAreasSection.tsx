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
    <section className="bg-[#013D47] w-full px-5 sm:px-10 xl:px-20 py-10 lg:py-14 flex flex-col gap-8 lg:gap-12 relative overflow-hidden">
      {/* Background decorative wave */}
      <img
        src="/images/health-areas-wave.svg"
        alt=""
        className="absolute pointer-events-none"
        style={{ width: "1686px", height: "582px", top: "65px", left: "calc(50% - 843px)" }}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between w-full relative gap-4 md:gap-8">
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase">
            SUPPORT FOR EVERY NEED
          </p>
          <h2 className="text-white text-[28px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize max-w-[445px]">
            Health &amp; Wellness Popular Support Areas
          </h2>
        </div>
        <p className="text-white/80 text-base lg:text-lg font-normal leading-7 max-w-full md:max-w-[400px] xl:max-w-[494px]">
          Whether you&apos;re dealing with stress, physical pain, burnout, or simply
          looking to improve your well-being — Rezolvus helps you find the right
          support faster.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 w-full relative">
        {areas.map((area) => (
          <div
            key={area.title}
            className="bg-[#EDECEC] rounded-[24px] h-[150px] sm:h-[170px] lg:h-[209px] pl-4 lg:pl-6 pr-3 lg:pr-4 py-4 flex items-start justify-between overflow-hidden relative hover:bg-[#E4E3E3] transition-colors cursor-pointer group"
          >
            <p className="text-black text-base lg:text-xl font-medium leading-6 capitalize flex-1 pr-2">
              {area.title}
            </p>
            <img src="/images/icon-arrow-up-right.svg" alt="" className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
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
