import { Approach } from "@/components/Approach";
import { Background } from "@/components/Background";
import { ClinicalWork } from "@/components/ClinicalWork";
import { Contact } from "@/components/Contact";
import { DoorwayDivider } from "@/components/Doorway";
import { Hero } from "@/components/Hero";
import { Introduction } from "@/components/Introduction";
import { Questions } from "@/components/Questions";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Writing } from "@/components/Writing";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ivory focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <div id="top">
          <Hero />
        </div>
        <Introduction />
        <DoorwayDivider />
        <ClinicalWork />
        <Approach />
        <Background />
        <Writing />
        <Questions />
        <DoorwayDivider />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
