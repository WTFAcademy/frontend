import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "../components/ui/Button";

function LoginForm() {
  return (
    <div className="mt-14 mx-auto text-center">
      <svg
        width="96"
        height="40"
        viewBox="0 0 96 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="mx-auto mb-6"
      >
        <rect x="0.222168" width="95.5556" height="40" fill="url(#pattern0)" />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_385_1407"
              transform="scale(0.00232558 0.00555556)"
            />
          </pattern>
          <image
            id="image0_385_1407"
            width="430"
            height="180"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa4AAAC0CAYAAADMz8jTAAAAAXNSR0IArs4c6QAABD5JREFUeJzt3CFyGzEYhmGrE+BjFBb2CIGFPUphYWGPElgYmCMEFgYGBpqpoLiZ37NypW/3efCOV9Zu8o6A/9MJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/6VVL+y991suhL9aa6Vn4nmQwPvM6VR/D6o+jPwwALg14QIginABEEW4AIgiXABEES4AoggXAFGEC4AowgVAlLvRHzj4B9K7MWswgOfBTNWJGN7TfbviPSi9CE5cAEQRLgCiCBcAUYQLgCjCBUAU4QIginABEEW4AIgiXABEGT45Y7TLy+PsJbzr/PHL0M+r/sJ8tL3s8+rf42hGT8TwfNcy+v9flRMXAFGEC4AowgVAFOECIIpwARBFuACIIlwARBEuAKIIFwBRlp+ccXp7nr2CIUZPEBhuJ/u8m+9xMJfnn7ULPV9OTlwAhBEuAKIIFwBRhAuAKMIFQBThAiCKcAEQRbgAiCJcAERZf3LGy+PsFQxx+XU/5b7nr0+1C3eyz+fP36fcd9bzrSq/B7Ms/v4tv3+T9N5L17XBo4OcuACIIlwARBEuAKIIFwBRhAuAKMIFQBThAiCKcAEQRbgAiLL+5Iy359krGGP177H6+lZn/7axf1zBiQuAKMIFQBThAiCKcAEQRbgAiCJcAEQRLgCiCBcAUYQLgCjrT854eZu9gjFW/x6rr6+o9166rrU29sb2b5vF9+/yY859z8X7Vp/bXjhxARBFuACIIlwARBEuAKIIFwBRhAuAKMIFQBThAiCKcAEQZf3JGWv/oP50+Va8cNL3WH19u2H/trF/S2nDR6OM5cQFQBThAiCKcAEQRbgAiCJcAEQRLgCiCBcAUYQLgCjCBUCU9SdnvM5eABR4T7dZfP/OD3Pu23svXbf6pIvRnLgAiCJcAEQRLgCiCBcAUYQLgCjCBUAU4QIginABEEW4AIhicgaM4D3dZif7V510wTZOXABEES4AoggXAFGEC4AowgVAFOECIIpwARBFuACIIlwARFl/csZOnJ/m3PdyP+e+wL+11trsNSRz4gIginABEEW4AIgiXABEES4AoggXAFGEC4AowgVAFOECIMr6kzNeZy/gfeffs1fwvurEjsunmy5j/xZ/T5dn/7iCExcAUYQLgCjCBUAU4QIginABEEW4AIgiXABEES4AoggXAFFa9cLeey99YCt/5KEUt2+4oz2P6j4fbV+q7N82V+yfDdzAiQuAKMIFQBThAiCKcAEQRbgAiCJcAEQRLgCiCBcAUYQLgCh3sxeQbtZEjCqTEIC9ceICIIpwARBFuACIIlwARBEuAKIIFwBRhAuAKMIFQBThAiBKeVxCX31ExOLapNEUR3tu1X0+2r5U2b9tZv2dH40TFwBRhAuAKMIFQBThAiCKcAEQRbgAiCJcAEQRLgCiCBcAAAAAAAAAAAAAAAAAAAAAAMDN/QHtW56ntd1SogAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
      <p className="text-2xl leading-8 font-bold">Log in to WTF Academy</p>
      <div className="shadow-md bg-white rounded-lg px-10 py-8 mt-8">
        <Button className="w-full">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5 0C4.977 0 0.5 4.484 0.5 10.017C0.5 14.442 3.365 18.197 7.339 19.521C7.839 19.613 8.021 19.304 8.021 19.038C8.021 18.801 8.013 18.17 8.008 17.335C5.226 17.94 4.639 15.992 4.639 15.992C4.185 14.834 3.529 14.526 3.529 14.526C2.621 13.906 3.598 13.918 3.598 13.918C4.601 13.988 5.129 14.95 5.129 14.95C6.021 16.48 7.47 16.038 8.039 15.782C8.131 15.135 8.389 14.694 8.675 14.444C6.455 14.191 4.12 13.331 4.12 9.493C4.12 8.4 4.51 7.505 5.149 6.805C5.046 6.552 4.703 5.533 5.247 4.155C5.247 4.155 6.087 3.885 7.997 5.181C8.81277 4.95851 9.65444 4.84519 10.5 4.844C11.35 4.848 12.205 4.959 13.004 5.181C14.913 3.885 15.751 4.154 15.751 4.154C16.297 5.533 15.954 6.552 15.851 6.805C16.491 7.505 16.879 8.4 16.879 9.493C16.879 13.341 14.54 14.188 12.313 14.435C12.672 14.745 12.991 15.356 12.991 16.291C12.991 17.629 12.979 18.71 12.979 19.038C12.979 19.306 13.159 19.618 13.667 19.52C15.6583 18.8521 17.3893 17.5753 18.6155 15.87C19.8416 14.1648 20.5009 12.1173 20.5 10.017C20.5 4.484 16.022 0 10.5 0Z"
              fill="white"
            />
          </svg>
          <span className="ml-3 text-base">Sign in with GitHub</span>
        </Button>
        <span
          className="relative text-gray-500 text-sm px-4 block my-4 leading-5
            before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:h-px before:w-2.5 before:bg-gray-300
            after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:h-px after:w-2.5 after:bg-gray-300"
        >
          Or if your account is already connected to a wallet
        </span>
        <Button className="w-full bg-white text-[#374151] border border-gray-300 border-solid text-base">
          Sign in with Ethereum
        </Button>
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
