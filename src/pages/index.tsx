import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HeroSection from "@site/src/pages/home/_HeroSection";
import CourseSection from "@site/src/pages/home/_CourseSection";
import IntroductionSection from "@site/src/pages/home/_IntroductionSection";
import EventSection from "@site/src/pages/home/_EventSection";
import SponsorSection from "@site/src/pages/home/_SponsorSection";
import ContributorSection from "@site/src/pages/home/_ContributorSection";
import Translate, {translate} from '@docusaurus/Translate'; 

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Web3 Open-source University for Developers."
    >
      <HeroSection />
      <CourseSection />
      <IntroductionSection />
      <EventSection />
      <SponsorSection />
      <ContributorSection />
    </Layout>
  );
}
