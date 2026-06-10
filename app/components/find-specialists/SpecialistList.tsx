import { specialists } from "@/app/data/specialists";
import SpecialistCard from "./SpecialistCard";

export default function SpecialistList() {
  return (
    <div className="flex flex-col gap-4">
      {/* Results header */}
      <div className="flex items-end justify-between h-10">
        <p className="text-[#013D47] text-[24px] font-medium leading-8 whitespace-nowrap">
          128 specialists founded for &ldquo;Anxiety&rdquo;
        </p>
        <button className="backdrop-blur-[10px] bg-white/10 border-[1.5px] border-[rgba(13,13,13,0.1)] rounded-full h-10 flex items-center gap-2 pl-5 pr-[14px] text-[#1C1C1C] text-base font-normal leading-6 whitespace-nowrap hover:bg-white/20 transition-colors">
          All
          <img src="/images/icon-caret-down.svg" alt="" className="w-5 h-5 shrink-0" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-4 mt-2">
        {specialists.map((specialist) => (
          <SpecialistCard
            key={specialist.id}
            specialist={specialist}
            defaultSelectedTime={
              specialist.nextAvailable.times[1]?.[1] ?? "14:00"
            }
          />
        ))}
      </div>

      {/* View More */}
      <div className="flex justify-center mt-8">
        <button className="border-[1.5px] border-[#FB652B] rounded-full h-10 px-6 text-[#FB652B] text-base font-medium leading-6 whitespace-nowrap hover:bg-[#FB652B]/10 transition-colors">
          View More
        </button>
      </div>
    </div>
  );
}
