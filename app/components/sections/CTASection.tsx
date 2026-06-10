import Image from "next/image";

export default function CTASection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-20 py-40 flex items-center justify-center relative">
      <div className="relative w-full h-[524px] rounded-[40px] overflow-hidden">
        <Image src="/images/cta-bg.jpg" alt="" fill className="object-cover" />
      </div>

      <img
        src="/images/cta-heart.svg"
        alt=""
        className="absolute left-[calc(50%-450px)] top-[196px] w-[130px] pointer-events-none z-10"
      />

      <img
        src="/images/cta-star.svg"
        alt=""
        className="absolute right-[calc(50%-490px)] bottom-[200px] w-[130px] pointer-events-none z-10"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-[32px] px-14 py-8 flex flex-col gap-12 items-center max-w-[650px] w-full mx-20">
          <div className="flex flex-col gap-4 items-center text-center">
            <h2 className="text-[#013D47] text-[40px] font-semibold leading-[48px] tracking-[-0.8px] capitalize">
              Ready to take the first step?
            </h2>
            <p className="text-[rgba(13,13,13,0.8)] text-lg font-normal leading-7 max-w-[437px]">
              Find the right support for your mental and physical health today.
              We&apos;re here to help you feel better!
            </p>
          </div>
          <button className="bg-[#FB652B] rounded-full h-14 px-8 flex items-center justify-center text-white text-base font-medium leading-6 hover:bg-[#e85520] transition-colors">
            Find My Specialist
          </button>
        </div>
      </div>
    </section>
  );
}
