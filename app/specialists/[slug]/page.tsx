// app/specialists/[slug]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { specialists } from "@/app/data/specialists";
import Header from "@/app/components/Header";
import Footer from "@/app/components/sections/Footer";
import ProfileHero from "@/app/components/specialists/ProfileHero";
import ProfileContent from "@/app/components/specialists/ProfileContent";
import ProfileBookingCard from "@/app/components/specialists/ProfileBookingCard";

function CaretRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 4L10 8L6 12"
        stroke="#858482"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return specialists.map((s) => ({ slug: s.slug }));
}

export default async function SpecialistProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const specialist = specialists.find((s) => s.slug === slug);

  if (!specialist) {
    notFound();
  }

  return (
    <main>
      <div className="relative">
        <Header variant="dark" />
      </div>

      <div className="bg-[#edecec] min-h-screen">
        {/* Spacer for fixed header */}
        <div className="h-20" />

        <div className="px-5 sm:px-8 lg:px-20 pt-8 pb-40">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-4 mb-8">
            <Link
              href="/"
              className="text-[#858482] text-[18px] font-medium leading-7 hover:text-[#013d47] transition-colors"
            >
              Home
            </Link>
            <CaretRightIcon />
            <Link
              href="/find-specialists"
              className="text-[#858482] text-[18px] font-medium leading-7 hover:text-[#013d47] transition-colors"
            >
              Search
            </Link>
            <CaretRightIcon />
            <span className="text-[#013d47] text-[18px] font-medium leading-7">
              {specialist.name}
            </span>
          </nav>

          {/* Two-column layout: hero+content on left, booking card on right */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left column: hero photo+info + tabs + sections */}
            <div className="flex-1 min-w-0 flex flex-col gap-8">
              <ProfileHero specialist={specialist} />
              <ProfileContent specialist={specialist} />
            </div>

            {/* Right column: sticky booking card */}
            <div className="w-full lg:w-[416px] shrink-0 lg:sticky lg:top-8">
              <ProfileBookingCard specialist={specialist} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
