export default function AgeSection() {
  return (
    <section className="bg-[#F6F6F5] w-full px-5 sm:px-10 xl:px-20 pb-16 md:pb-20 xl:pb-[120px] flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-4">
      {/* Heading */}
      <div className="flex flex-col gap-4 lg:w-[307px] lg:shrink-0">
        <p className="text-[#FB652B] text-xs font-semibold leading-6 uppercase tracking-wide">
          BULIT AROUND TRUST
        </p>
        <h2 className="text-[#013D47] text-[28px] sm:text-[32px] xl:text-[40px] font-semibold leading-[1.2] xl:leading-[48px] tracking-[-0.8px] capitalize">
          Support for every Age
        </h2>
      </div>

      {/* Two age cards */}
      <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
        {/* Adults & Teens card */}
        <div className="flex-1 bg-[#E4DECE] rounded-[24px] h-[280px] sm:h-[320px] xl:h-[358px] relative overflow-hidden px-8 py-6">
          <p className="text-[#013D47] text-[20px] xl:text-[24px] font-medium leading-8 relative z-10">
            Adults &amp; Teens
          </p>
          {/* Left illustration */}
          <img
            src="/images/age-adults-left.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "10px", left: "-30px", width: "220px", height: "auto" }}
          />
          {/* Right illustration */}
          <img
            src="/images/age-adults-right.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "10px", right: "-30px", width: "220px", height: "auto" }}
          />
        </div>

        {/* Kids & Infants card */}
        <div className="flex-1 bg-[#E4DECE] rounded-[24px] h-[280px] sm:h-[320px] xl:h-[358px] relative overflow-hidden px-8 py-6">
          <p className="text-[#013D47] text-[20px] xl:text-[24px] font-medium leading-8 relative z-10">
            Kids &amp; Infants
          </p>
          {/* Main illustration (face with glasses) */}
          <img
            src="/images/age-kids-main.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ left: "16px", top: "40px", width: "263px", height: "auto" }}
          />
          {/* Decorative extras */}
          <img
            src="/images/age-kids-extra-1.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "-10px", right: "100px", width: "106px" }}
          />
          <img
            src="/images/age-kids-extra-2.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ top: "40px", right: "0", width: "40px" }}
          />
          <img
            src="/images/age-kids-extra-3.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "30px", right: "70px", width: "40px" }}
          />
          <img
            src="/images/age-kids-extra-4.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "-10px", left: "76px", width: "98px" }}
          />
          <img
            src="/images/age-kids-extra-5.svg"
            alt=""
            className="absolute pointer-events-none"
            style={{ bottom: "40px", right: "20px", width: "97px" }}
          />
        </div>
      </div>
    </section>
  );
}
