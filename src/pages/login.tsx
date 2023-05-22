import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function LoginForm() {
  return (
    <div className="mt-16 mx-auto text-center">
      <p className="text-2xl leading-8 font-bold">Log in to WTF Academy</p>
      <div className="shadow-md bg-white rounded-lg px-10 py-8 mt-8">
        <button className="w-full">Continue with GitHub</button>
        <span
          className="relative text-gray-500 text-sm px-4 block
            before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:h-px before:w-2.5 before:bg-gray-300
            after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:h-px after:w-2.5 after:bg-gray-300"
        >
          Or if your account is already connected to a wallet
        </span>
      </div>
    </div>
  );
}

function Login() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      noFooter
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <LoginForm />
    </Layout>
  );
}

export default Login;
