import {TSponsorAsset} from "@site/src/typings/common";
import React from "react";

type TCardProps = {
    sponsor: TSponsorAsset;
}

const SponsorCard = (props: TCardProps) => {
    const {sponsor} = props;

    return (
        <div className="border-border border border-solid px-[100px] rounded-md h-[96px] inline-flex items-center justify-center bg-card">
            <img className="h-[50px] w-[150px]" alt={sponsor.name} src={sponsor.image_url} />
        </div>
    )
}

export default SponsorCard;
