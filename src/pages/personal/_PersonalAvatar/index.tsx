import React, { useState, useEffect } from 'react';
import useAuth from "@site/src/hooks/useAuth";
import { Skeleton } from "@site/src/components/ui/Skeleton";

function PersonalAvatar() {
    const { data } = useAuth();

    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState(null);
    
    useEffect(() => {
        setAvatar(data?.avatar);
        setUsername(data?.username);
    }, [data]);

    return (
        <div className="flex items-center w-full px-8 mx-auto flex-col md:w-[1024px] md:flex-row md:items-end">
            <div className="h-32 w-32 rounded-full bg-white -mt-[68px] flex-shrink-0 border-4 border-white box-content overflow-hidden md:mr-5">
                {avatar ? 
                    <img src={ avatar } alt="WTF Academy" className="w-full h-full"/> 
                    : 
                    <Skeleton className="w-full h-full bg-gray-200" />
                }
            </div>
            {username ?
                <p className="text-2xl font-bold leading-8 mb-3">{ username }</p> :
                <Skeleton className="w-32 h-8 mb-3 bg-gray-200" />
            }
            
        </div>
    );
}

export default PersonalAvatar;
