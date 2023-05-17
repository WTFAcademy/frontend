import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {Button} from "@site/src/components/ui/Button";
import {Switch} from "@site/src/components/ui/Switch";

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className="flex gap-4">
        <Button>测试</Button>
        <Switch />
      </div>
    </Layout>
  );
}
