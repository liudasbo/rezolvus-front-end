const features = [
  {
    title: "Verified Specialists",
    body: "Every professional is carefully verified for safety and confidence.",
    icon: "/images/icon-seal-check.svg",
  },
  {
    title: "Real Reviews",
    body: "Honest feedback from people like you helps you make the right choice.",
    icon: "/images/icon-users-three.svg",
  },
  {
    title: "Safe & Secure",
    body: "Your data and privacy are protected at every step of your journey.",
    icon: "/images/icon-shield.svg",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 py-16 md:py-[80px] xl:py-[120px] flex flex-col lg:flex-row items-start gap-10 lg:gap-[80px] xl:gap-[126px]">
      <div className="w-full lg:w-[306px] lg:shrink-0 flex flex-col gap-4">
        <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase tracking-wide">
          BUILT AROUND TRUST
        </p>
        <h2 className="text-[#013D47] text-[32px] sm:text-[36px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
          Your Well-Being is our top Priority
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 w-full">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-[24px] min-h-[220px] xl:h-[264px] px-6 pt-6 pb-5 flex flex-col justify-between items-end"
          >
            <div className="flex flex-col gap-3 w-full">
              <p className="text-black text-xl font-medium leading-6 capitalize">{f.title}</p>
              <p className="text-[#494947] text-base font-normal leading-6">{f.body}</p>
            </div>
            <div className="bg-[#013D47] w-14 h-14 rounded-xl flex items-center justify-center shrink-0 mt-4">
              <img src={f.icon} alt="" className="w-8 h-8" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
