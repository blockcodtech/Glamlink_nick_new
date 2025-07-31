"use client";

import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import WhyGlamLink from "./WhyGlamLink";
import BookTrustedPros from "./BookTrustedPros";
import FounderBadge from "./FounderBadge";
import Testimonials from "./Testimonials";
import FinalCTA from "./FinalCTA";
import { HomePageContent } from "@/lib/config/pageContent";
import pageContentService from "@/lib/services/pageContentService";

interface HomePageProps {
  initialContent: HomePageContent;
}

export default function HomePage({ initialContent }: HomePageProps) {
  const [content, setContent] = useState<HomePageContent>(initialContent);

  // Listen for content updates (immediate updates from content settings)
  useEffect(() => {
    const handleContentUpdate = async (event: CustomEvent) => {
      if (event.detail.pageId === 'home') {
        // Refresh content when it's updated in the settings
        const newContent = await pageContentService.getPageContent('home');
        setContent(newContent);
      }
    };

    window.addEventListener('glamlink:content-updated' as any, handleContentUpdate);
    return () => {
      window.removeEventListener('glamlink:content-updated' as any, handleContentUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection content={content.hero} />
      <WhyGlamLink content={content.whyGlamLink} />
      <BookTrustedPros content={content.bookTrustedPros} />
      <FounderBadge content={content.founderBadge} />
      <Testimonials content={content.testimonials} />
      <FinalCTA content={content.finalCTA} />
    </div>
  );
}
