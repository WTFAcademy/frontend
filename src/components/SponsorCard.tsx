import {TSponsorAsset} from "@site/src/typings/common";
import React from "react";

type TCardProps = {
    sponsor: TSponsorAsset;
};

const SponsorCard = (props: TCardProps) => {
    const {sponsor} = props;

    return (
        <div className="w-3/4 md:flex-1 mx-auto">
            <img
                className="w-full object-cover"
                alt={sponsor.name}
                src={sponsor.image_url}
            />
        </div>

    );
};

export default SponsorCard;
