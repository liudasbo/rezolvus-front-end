const features = [
  {
    title: "Verified Specialists",
    body: "Every professional is carefully verified for safety and confidence.",
    icon: "/images/icon-seal-check.png",
  },
  {
    title: "Real Reviews",
    body: "Honest feedback from people like you helps you make the right choice.",
    icon: "/images/icon-users-three.png",
  },
  {
    title: "Safe & Secure",
    body: "Your data and privacy are protected at every step of your journey.",
    icon: "/images/icon-shield.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-20 py-[120px] flex items-start gap-[126px]">
      <div className="shrink-0 w-[306px] flex flex-col gap-4">
        <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase tracking-wide">
          BUILT AROUND TRUST
        </p>
        <h2 className="text-[#013D47] text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize">
          Your Well-Being is our top Priority
        </h2>
      </div>
      <div className="flex gap-4 flex-1">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-[24px] flex-1 min-w-0 h-[264px] px-6 pt-6 pb-5 flex flex-col justify-between items-end"
          >
            <div className="flex flex-col gap-3 w-full">
              <p className="text-black text-xl font-medium leading-6 capitalize">{f.title}</p>
              <p className="text-[#494947] text-base font-normal leading-6">{f.body}</p>
            </div>
            <div className="bg-[#013D47] w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
              <img src={f.icon} alt="" className="w-8 h-8" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
