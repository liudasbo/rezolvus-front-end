import Image from "next/image";
import type { AuthRole } from "./AuthRoleTabs";

const COPY: Record<AuthRole, { heading: string; subtitle: string }> = {
  seeking: {
    heading: "Find the right specialist\nwithout the stress",
    subtitle: "Discover verified professionals tailored to your personal needs.",
  },
  specialist: {
    heading: "Grow a practice you're\ngenuinely proud of",
    subtitle: "Reach clients who value your craft — calm tools, no admin chaos.",
  },
};

export default function AuthDecorativePanel({ role }: { role: AuthRole }) {
  const { heading, subtitle } = COPY[role];

  return (
    <div className="relative w-full h-full">
      {/* Background clipped to panel */}
      <div className="absolute inset-0 overflow-hidden rounded-[32px]">
        <Image
          src="/images/auth/auth-bg-gradient.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "url('/images/auth/auth-noise.png')",
            backgroundSize: "716px 716px",
          }}
        />
      </div>

      {/* Orange creature — top right, bleeds above panel */}
      <div className="absolute top-[-68px] right-[-31px] pointer-events-none">
        <Image
          src="/images/auth/auth-creature-orange.svg"
          alt=""
          width={350}
          height={312}
        />
      </div>

      {/* Teal blob — center left, partially overlaps white card */}
      <div className="absolute top-[145px] left-[-114px] pointer-events-none">
        <Image
          src="/images/auth/auth-creature-teal.svg"
          alt=""
          width={340}
          height={342}
        />
      </div>

      {/* Cream heart — bottom right, bleeds below panel */}
      <div className="absolute bottom-[-62px] right-[86px] pointer-events-none">
        <Image
          src="/images/auth/auth-creature-cream.svg"
          alt=""
          width={238}
          height={273}
        />
      </div>

      {/* Text block */}
      <div className="absolute bottom-[22%] left-0 right-0 flex flex-col items-center gap-[8px] px-[32px] xl:px-[80px] min-[1440px]:px-[120px]">
        <p className="text-[28px] xl:text-[36px] min-[1440px]:text-[40px] font-semibold leading-[36px] xl:leading-[44px] min-[1440px]:leading-[48px] tracking-[-0.8px] text-[#013d47] text-center whitespace-pre-wrap capitalize">
          {heading}
        </p>
        <p className="text-[16px] leading-[24px] text-[#013d47] text-center">
          {subtitle}
        </p>
        {/* Pagination dots */}
        <div className="flex items-center gap-[8px] mt-[8px]">
          <div className="w-[48px] h-[8px] rounded-[100px] bg-[#013d47]" />
          <div className="w-[8px] h-[8px] rounded-[100px] bg-[rgba(1,61,71,0.25)]" />
          <div className="w-[8px] h-[8px] rounded-[100px] bg-[rgba(1,61,71,0.25)]" />
        </div>
      </div>
    </div>
  );
}
