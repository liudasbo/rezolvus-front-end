"use client";

export type AuthRole = "seeking" | "specialist";

interface AuthRoleTabsProps {
  role: AuthRole;
  setRole: (role: AuthRole) => void;
}

export default function AuthRoleTabs({ role, setRole }: AuthRoleTabsProps) {
  return (
    <div className="flex flex-col items-center gap-[8px] w-full">
      <p className="text-[14px] leading-[20px] text-[#013d47] text-center w-full">
        SIGNING AS:
      </p>
      <div role="tablist" className="flex gap-[4px] bg-[rgba(13,13,13,0.05)] border border-[#edecec] rounded-[12px] p-[4px]">
        <button
          role="tab"
          aria-selected={role === "seeking"}
          type="button"
          onClick={() => setRole("seeking")}
          className={`px-[24px] py-[8px] rounded-[8px] text-[14px] leading-[20px] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40 ${
            role === "seeking"
              ? "bg-white font-medium text-[#fb652b]"
              : "font-normal text-[#676665] hover:text-[#1c1c1c]"
          }`}
        >
          Seeking
        </button>
        <button
          role="tab"
          aria-selected={role === "specialist"}
          type="button"
          onClick={() => setRole("specialist")}
          className={`px-[24px] py-[8px] rounded-[8px] text-[14px] leading-[20px] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/40 ${
            role === "specialist"
              ? "bg-white font-medium text-[#fb652b]"
              : "font-normal text-[#676665] hover:text-[#1c1c1c]"
          }`}
        >
          Specialist
        </button>
      </div>
    </div>
  );
}
