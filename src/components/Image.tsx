import React, {useEffect, useState} from 'react'
import Spinner from "@site/src/components/ui/Spinner";
import {cn} from "@site/src/utils/class-utils";

type TProps = {
    src: string;
    className?: string;
}

const LoaderImage = (props: TProps) => {
    const {src, className} = props;
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (src) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setDone(true);
            }
        }
    }, [src]);

    return (
        <Spinner loading={!done}>
            <div className={cn("w-full", className)}>
                {done && <img alt="nft image" src={src} className="w-full"/>}
            </div>
        </Spinner>
    )
}


export default LoaderImage;
