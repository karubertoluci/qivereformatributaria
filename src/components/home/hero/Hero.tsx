
import React from 'react';
import HeroBadge from './HeroBadge';
import HeroHeading from './HeroHeading';
import ReportGenerator from './ReportGenerator';
import OfferingsSection from './OfferingsSection';
import CTASection from './CTASection';
import ReformSummary from './ReformSummary';

const Hero = () => {
  return (
    <section className="bg-white pt-10 md:pt-16 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <HeroBadge />
        <HeroHeading />
        <ReportGenerator />
        <OfferingsSection />
        <CTASection />
        <ReformSummary />
      </div>
    </section>
  );
};

export default Hero;
