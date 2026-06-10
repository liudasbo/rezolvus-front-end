const areas = [
  { title: "Anxiety & Stress", img: "/images/area-anxiety.png" },
  { title: "Physical Recovery", img: "/images/area-physical.png" },
  { title: "Sleep Problems", img: "/images/area-sleep.png" },
  { title: "Nutrition & Lifestyle", img: "/images/area-nutrition.png" },
  { title: "Burnout", img: "/images/area-burnout.png" },
  { title: "Relationship Problems", img: "/images/area-relationship.png" },
];

export default function HealthAreasSection() {
  return (
    <section className="bg-[#013D47] w-full px-20 py-14 flex flex-col gap-12 relative overflow-hidden">
      <div className="flex items-end justify-between w-full">
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
      <div className="flex gap-4 w-full">
        {areas.map((area) => (
          <div
            key={area.title}
            className="bg-[#EDECEC] rounded-[24px] flex-1 min-w-0 h-[209px] pl-6 pr-4 py-4 flex items-start justify-between overflow-hidden relative"
          >
            <p className="text-black text-xl font-medium leading-6 capitalize flex-1 pr-4">
              {area.title}
            </p>
            <img src="/images/icon-arrow-up-right.png" alt="" className="w-6 h-6 shrink-0" />
            <img
              src={area.img}
              alt=""
              className="absolute bottom-0 right-0 w-[155px] pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
