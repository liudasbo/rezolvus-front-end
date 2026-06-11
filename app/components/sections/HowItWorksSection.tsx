import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "Tell us what you need",
    body: "Share how you feel and what kind of support you're looking for.",
  },
  {
    num: "02",
    title: "Explore specialists",
    body: "Browse verified professionals matched to your needs.",
  },
  {
    num: "03",
    title: "Choose the right fit",
    body: "Compare profiles, reviews, and expertise to find your perfect match.",
  },
  {
    num: "04",
    title: "Book your session",
    body: "Pick a time that works for you and book instantly online or in-person.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 pt-16 md:pt-24 xl:pt-40 pb-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
      <div className="relative w-full lg:w-[633px] lg:shrink-0 h-[280px] sm:h-[380px] lg:h-[556px] rounded-[32px] overflow-hidden">
        <Image
          src="/images/how-it-works-photo.jpg"
          alt="Your path to wellness"
          fill
          className="object-cover"
        />
        <Image
          src="/images/how-it-works-overlay.png"
          alt=""
          fill
          className="object-cover"
        />
        <img
          src="/images/how-it-works-wave1.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <img
          src="/images/how-it-works-wave2.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <img
          src="/images/how-it-works-star.svg"
          alt=""
          className="absolute bottom-14 -left-3 w-[80px] lg:w-[104px] pointer-events-none"
        />
        <img
          src="/images/how-it-works-creature.svg"
          alt=""
          className="absolute top-3 -right-3 w-[80px] lg:w-[104px] pointer-events-none"
        />
        <div className="absolute top-6 left-6 lg:left-8 z-10">
          <h2 className="text-white text-[28px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
            Your Path <br />to Wellness
          </h2>
        </div>
        <p className="absolute bottom-7 left-6 lg:left-8 z-10 text-white text-xs font-semibold uppercase leading-6">
          HOW IT WORKS
        </p>
      </div>

      <div className="w-full lg:flex-1 flex flex-col gap-6 lg:gap-0 lg:justify-between lg:h-[556px] lg:pl-16 py-4 lg:py-16">
        {steps.map((step) => (
          <div key={step.num} className="flex items-center gap-5 lg:gap-8">
            <span className="text-[#67CDCD] text-[48px] sm:text-[60px] lg:text-[72px] font-semibold leading-[1] lg:leading-[69px] tracking-[-2px] lg:tracking-[-2.16px] w-[64px] sm:w-[80px] lg:w-[90px] shrink-0">
              {step.num}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[#0D0D0D] text-base lg:text-xl font-medium leading-6 capitalize">
                {step.title}
              </p>
              <p className="text-[#494947] text-sm lg:text-base font-normal leading-6">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
