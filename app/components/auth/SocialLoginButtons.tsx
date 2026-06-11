import Image from "next/image";

export default function SocialLoginButtons() {
  return (
    <div className="flex gap-[16px] w-full">
      <button
        type="button"
        onClick={() => console.log("Google login clicked")}
        className="flex flex-1 items-center justify-center gap-[8px] h-[48px] bg-[rgba(13,13,13,0.05)] rounded-[1000px] px-[24px] py-[8px] hover:bg-[rgba(13,13,13,0.08)] active:bg-[rgba(13,13,13,0.12)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40"
      >
        <Image src="/images/auth/auth-icon-google.svg" alt="" width={24} height={24} />
        <span className="text-[16px] font-medium leading-[24px] text-[#1c1c1c] whitespace-nowrap">
          Google
        </span>
      </button>
      <button
        type="button"
        onClick={() => console.log("Apple login clicked")}
        className="flex flex-1 items-center justify-center gap-[8px] h-[48px] bg-[rgba(13,13,13,0.05)] rounded-[1000px] px-[24px] py-[8px] hover:bg-[rgba(13,13,13,0.08)] active:bg-[rgba(13,13,13,0.12)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40"
      >
        <Image src="/images/auth/auth-icon-apple.svg" alt="" width={24} height={24} />
        <span className="text-[16px] font-medium leading-[24px] text-[#1c1c1c] whitespace-nowrap">
          Apple
        </span>
      </button>
    </div>
  );
}
