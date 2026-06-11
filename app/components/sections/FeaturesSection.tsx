import Image from "next/image";

type FeatureCard = {
  title: string;
  body: string;
  icon: string;
};

const leftCards: FeatureCard[] = [
  {
    title: "Verified specialists",
    body: "Only certified healthcare and wellness professionals.",
    icon: "/images/icon-seal-check.svg",
  },
  {
    title: "Rehabilitation & Recovery",
    body: "Support for movement, recovery, posture, and pain relief.",
    icon: "/images/icon-users-three.svg",
  },
];

const rightCards: FeatureCard[] = [
  {
    title: "Adult & Child Support",
    body: "Specialists for children, teenagers, and adults.",
    icon: "/images/icon-calendar-heart.svg",
  },
  {
    title: "Safe & secure",
    body: "Your data and privacy are protected at every step of your journey.",
    icon: "/images/icon-shield.svg",
  },
];

function FeatureCard({ title, body, icon }: FeatureCard) {
  return (
    <div className="bg-white rounded-[24px] h-[264px] px-6 pt-6 pb-5 flex flex-col justify-between items-start">
      <div className="bg-[#013D47] w-[72px] h-[72px] rounded-[12px] flex items-center justify-center shrink-0">
        <img src={icon} alt="" className="w-10 h-10" />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-black text-xl font-medium leading-6 capitalize">{title}</p>
        <p className="text-[#494947] text-base font-normal leading-6">{body}</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 py-16 md:py-20 xl:py-[120px] flex flex-col gap-10 xl:gap-12 items-center">
      {/* Centered heading */}
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase tracking-wide">
          BULIT AROUND TRUST
        </p>
        <h2 className="text-[#013D47] text-[32px] sm:text-[36px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
          Your Well-being is our top Priority
        </h2>
      </div>

      {/* 3-column row */}
      <div className="flex flex-col xl:flex-row gap-4 w-full items-stretch">
        {/* Left column: 2 stacked cards */}
        <div className="flex-1 flex flex-col sm:flex-row xl:flex-col gap-4 min-w-0">
          {leftCards.map((c) => (
            <div key={c.title} className="flex-1 xl:flex-none">
              <FeatureCard {...c} />
            </div>
          ))}
        </div>

        {/* Center photo — xl only */}
        <div className="hidden xl:block relative w-[416px] h-[544px] rounded-[24px] overflow-hidden shrink-0">
          <Image
            src="/images/features-center-photo.jpg"
            alt=""
            fill
            className="object-cover rounded-[24px]"
          />
          <img
            src="/images/features-wave.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <img
            src="/images/features-wave-bottom.png"
            alt=""
            className="absolute bottom-0 left-0 w-full pointer-events-none"
          />
        </div>

        {/* Right column: 2 stacked cards */}
        <div className="flex-1 flex flex-col sm:flex-row xl:flex-col gap-4 min-w-0">
          {rightCards.map((c) => (
            <div key={c.title} className="flex-1 xl:flex-none">
              <FeatureCard {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
