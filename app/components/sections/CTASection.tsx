import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 py-16 md:py-24 xl:py-[160px] flex items-center justify-center relative">
      {/* Background photo */}
      <div className="relative w-full h-[340px] sm:h-[420px] xl:h-[524px] rounded-[24px] xl:rounded-[40px] overflow-hidden">
        <Image src="/images/cta-bg.jpg" alt="" fill className="object-cover" />
      </div>

      {/* Left decorative creature */}
      <img
        src="/images/cta-creature-left.svg"
        alt=""
        className="hidden xl:block absolute left-[320px] top-[196px] w-[130px] pointer-events-none z-10"
      />
      {/* Right decorative creature */}
      <img
        src="/images/cta-creature-right.svg"
        alt=""
        className="hidden xl:block absolute right-[263px] bottom-[200px] w-[160px] pointer-events-none z-10"
      />

      {/* Glass panel */}
      <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-10 xl:px-20">
        <div className="bg-white/20 backdrop-blur-sm rounded-[24px] xl:rounded-[32px] px-6 sm:px-10 xl:px-14 py-8 xl:py-8 flex flex-col gap-6 xl:gap-12 items-center w-full max-w-[90%] sm:max-w-[560px] xl:max-w-[650px]">
          <div className="flex flex-col gap-3 xl:gap-4 items-center text-center">
            <h2 className="text-[#013D47] text-[24px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
              Ready to take the first step?
            </h2>
            <p className="text-[rgba(13,13,13,0.8)] text-sm sm:text-base xl:text-lg font-normal leading-6 xl:leading-7 max-w-[437px]">
              Explore certified specialists for rehabilitation, speech therapy,
              movement recovery, and long-term wellbeing.
            </p>
          </div>
          <Link
            href="/find-specialists"
            className="bg-[#FB652B] rounded-full h-12 xl:h-14 px-6 xl:px-8 flex items-center justify-center text-white text-base font-medium leading-6 hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60"
          >
            Find My Specialist
          </Link>
        </div>
      </div>
    </section>
  );
}
