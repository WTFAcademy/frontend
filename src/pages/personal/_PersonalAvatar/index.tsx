import React from 'react';
import avatar from "@site/static/img/user-avatar.jpg";

function PersonalAvatar() {
    return (
        <div className="w-[1024px] mx-auto px-8 flex items-end">
            <div className="h-32 w-32 rounded-full bg-white -mt-[68px] mr-5 flex-shrink-0 border-4 border-white box-content overflow-hidden">
                <img src={avatar} alt="WTF Academy" className="w-full h-full"/>
            </div>
            <p className="text-gray-900 text-2xl font-bold leading-8">Tank Xu</p>
        </div>
    );
}

export default PersonalAvatar;
