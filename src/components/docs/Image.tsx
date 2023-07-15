import React, {useState} from "react";
import { PhotoProvider, PhotoView } from 'react-photo-view';

const Image = (props: any) => {
    return (
        <div className="w-full">
            <PhotoProvider
                loop={false}
            >
                <PhotoView src={props.src}>
                    <img
                        {...props}
                        className="mx-auto w-auto max-h-[600px] rounded overflow-hidden cursor-zoom-in"
                    />
                </PhotoView>
            </PhotoProvider>
            {/*{props.alt && <div className="mx-auto text-center text-xs text-gray-600">{props.alt}</div>}*/}
        </div>
    )
}

export default Image;
