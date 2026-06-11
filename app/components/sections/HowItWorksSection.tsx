import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "Tell us what support you need",
    body: "Speech therapy, rehabilitation, physiotherapy, educational support, or wellness services.",
  },
  {
    num: "02",
    title: "Explore verified specialists",
    body: "Compare experience, specializations, languages, and availability.",
  },
  {
    num: "03",
    title: "Choose the right fit",
    body: "Book online or in-person sessions with trusted professionals.",
  },
  {
    num: "04",
    title: "Begin your recovery or development journey",
    body: "Receive personalized support for yourself, your child, or your family.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 pt-16 md:pt-24 xl:pt-[160px] pb-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
      {/* Photo card */}
      <div className="relative w-full lg:w-[524px] lg:shrink-0 h-[280px] sm:h-[380px] lg:h-[556px] rounded-[32px] overflow-hidden">
        <Image
          src="/images/how-it-works-photo.jpg"
          alt="Your path to wellness"
          fill
          className="object-cover"
        />
        <Image
          src="/images/how-it-works-overlay-2.png"
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
        {/* Bottom-left star creature */}
        <img
          src="/images/how-it-works-star-2.svg"
          alt=""
          className="absolute bottom-14 -left-3 w-[80px] lg:w-[104px] pointer-events-none"
        />
        {/* Top-right blob creature */}
        <img
          src="/images/how-it-works-creature.svg"
          alt=""
          className="absolute top-3 -right-3 w-[80px] lg:w-[104px] pointer-events-none"
        />
        {/* Photo heading */}
        <div className="absolute top-6 left-6 lg:left-8 z-10">
          <h2 className="text-white text-[22px] sm:text-[28px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize max-w-[260px] xl:max-w-none">
            Your Path <br />
            to rehabilitation, <br />
            development, &amp; wellbeing.
          </h2>
        </div>
        <p className="absolute bottom-7 left-6 lg:left-8 z-10 text-white text-xs font-semibold uppercase leading-6">
          HOW IT WORKS
        </p>
      </div>

      {/* Steps */}
      <div className="w-full lg:flex-1 flex flex-col gap-6 lg:gap-8 lg:pl-[64px] py-4 lg:py-[64px]">
        <p className="hidden lg:block text-[#FB652B] text-xs font-semibold leading-6 uppercase">
          HOW IT WORKS
        </p>
        {steps.map((step) => (
          <div key={step.num} className="flex items-center gap-5 lg:gap-8">
            <span className="text-[#67CDCD] text-[48px] sm:text-[60px] lg:text-[72px] font-semibold leading-[1] tracking-[-2px] lg:tracking-[-2.16px] w-[64px] sm:w-[80px] lg:w-[90px] shrink-0">
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
