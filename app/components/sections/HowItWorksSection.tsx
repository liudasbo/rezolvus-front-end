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
    <section className="bg-[#F6F6F5] w-full px-20 pt-40 pb-20 flex items-center gap-4">
      <div className="relative w-[633px] h-[556px] rounded-[32px] overflow-hidden shrink-0">
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
          className="absolute bottom-14 -left-3 w-[104px] pointer-events-none"
        />
        <img
          src="/images/how-it-works-creature.svg"
          alt=""
          className="absolute top-3 -right-3 w-[104px] pointer-events-none"
        />
        <div className="absolute top-6 left-8 z-10">
          <h2 className="text-white text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize">
            Your Path <br />to Wellness
          </h2>
        </div>
        <p className="absolute bottom-7 left-8 z-10 text-white text-xs font-semibold uppercase leading-6">
          HOW IT WORKS
        </p>
      </div>

      <div className="flex-1 h-[556px] flex flex-col justify-between pl-16 py-16">
        {steps.map((step) => (
          <div key={step.num} className="flex items-center gap-8">
            <span className="text-[#67CDCD] text-[72px] font-semibold leading-[69px] tracking-[-2.16px] w-[90px] shrink-0">
              {step.num}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[#0D0D0D] text-xl font-medium leading-6 capitalize">
                {step.title}
              </p>
              <p className="text-[#494947] text-base font-normal leading-6">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
