import { TSponsorAsset } from "@site/src/typings/common";
import React from "react";

type TCardProps = {
  sponsor: TSponsorAsset;
};

const SponsorCard = (props: TCardProps) => {
  const { sponsor } = props;

  return (
    <div className="h-[96px] inline-flex items-center justify-center bg-card">
      <img
        className="h-full w-full object-cover"
        alt={sponsor.name}
        src={sponsor.image_url}
      />
    </div>
  );
};

export default SponsorCard;
