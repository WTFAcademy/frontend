import React, { useState } from "react";
import Layout from "@theme/Layout";
import { useAccount } from "wagmi";
import { useQuery } from "react-query";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useAuth from "@site/src/hooks/useAuth";
import {
  Step,
  Button,
  Stepper,
  Spinner,
  ConnectWalletButton,
} from "@site/src/components";
import {
  GitHubWhite as GitHubIconWhite,
  WTFLetter as WTFLetterIcon,
} from "@site/src/icons";

import { getNonce } from "@site/src/api/wallet-auth";

function LoginForm() {
  const { signInWithGithub } = useAuth();

  return (
    <>
      <Button className="w-full" onClick={() => signInWithGithub()}>
        <GitHubIconWhite />
        <span className="ml-3 text-base">Sign in with GitHub</span>
      </Button>
      <span
        className="relative text-gray-500 text-sm px-4 block my-4 leading-5
    before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:h-px before:w-2.5 before:bg-gray-300
    after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:h-px after:w-2.5 after:bg-gray-300"
      >
        Or if your account is already connected to a wallet
      </span>
      <ConnectWalletButton className="w-full bg-secondary-foreground text-foreground border border-gray-300 border-solid text-base">
        Sign in with Ethereum
      </ConnectWalletButton>
    </>
  );
}

function BindStep({ address }: { address: string }) {
  const [currentStep, setCurrentStep] = useState(0);

  const { isLoading, data } = useQuery("getNonce", () => getNonce(address));

  console.log(isLoading, data);

  return (
    <Spinner loading={isLoading} className="mx-auto">
      <Stepper activeStep={currentStep}>
        <Step>
          <Button>Connect GitHub</Button>
        </Step>
        <Step disabled>
          <Button>Sign With Wallet</Button>
        </Step>
      </Stepper>
    </Spinner>
  );
}

function Login() {
  const { siteConfig } = useDocusaurusContext();
  const { address, isConnected } = useAccount();

  return (
    <Layout
      noFooter
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <div className="mt-14 mx-auto text-center">
        <WTFLetterIcon />
        <p className="text-2xl leading-8 font-bold text-foreground">
          Log in to WTF Academy
        </p>
        <div className="shadow-md bg-secondary-foreground rounded-lg px-10 py-8 mt-8">
          {isConnected ? <BindStep address={address} /> : <LoginForm />}
        </div>
      </div>
    </Layout>
  );
}

export default Login;
