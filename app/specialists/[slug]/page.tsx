// app/specialists/[slug]/page.tsx

import { notFound } from "next/navigation";
import { specialists } from "@/app/data/specialists";
import Header from "@/app/components/Header";
import Footer from "@/app/components/sections/Footer";
import ProfileHero from "@/app/components/specialists/ProfileHero";
import ProfileContent from "@/app/components/specialists/ProfileContent";
import ProfileBookingCard from "@/app/components/specialists/ProfileBookingCard";

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
    <main className="overflow-x-hidden">
      <div className="relative">
        <Header variant="dark" />
      </div>

      <div className="bg-[#edecec] min-h-screen">
        {/* Spacer for fixed header */}
        <div className="h-20" />

        <div className="px-5 sm:px-8 lg:px-20 pt-8 pb-40">
          {/* Hero: breadcrumbs + photo + name + stats */}
          <ProfileHero specialist={specialist} />

          {/* Two-column layout */}
          <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
            {/* Left column: tabs + content */}
            <div className="flex-1 min-w-0">
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
