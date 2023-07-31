import { TSponsorAsset } from "@site/src/typings/common";
import React from "react";

type TCardProps = {
  sponsor: TSponsorAsset;
};

const SponsorCard = (props: TCardProps) => {
  const { sponsor } = props;

  return (
    <div className="border-border border border-solid rounded-md inline-flex items-center justify-center bg-card">
      <img
        className="object-cover w-full"
        alt={sponsor.name}
        src={sponsor.image_url}
      />
    </div>
  );
};

export default SponsorCard;
