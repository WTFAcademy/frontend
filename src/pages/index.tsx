import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from "@site/src/pages/home/_HeroSection";
import CourseSection from "@site/src/pages/home/_CourseSection";
import IntroductionSection from "@site/src/pages/home/_IntroductionSection";
import EventSection from "@site/src/pages/home/_EventSection";

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HeroSection />
      <CourseSection />
      <IntroductionSection />
      <EventSection />
    </Layout>
  );
}
