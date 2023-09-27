import React, { useState, useEffect } from "react";
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
    <div className="flex flex-col items-center w-full px-8 mx-auto lg:w-[1024px] lg:flex-row lg:items-end">
      <div className="flex-shrink-0 w-32 h-32 overflow-hidden bg-white border-4 border-white rounded-full -mt-[68px] box-content lg:mr-5">
        {avatar ? (
          <img src={avatar} alt="WTF Academy" className="w-full h-full" />
        ) : (
          <Skeleton className="w-full h-full bg-gray-200" />
        )}
      </div>
      {username ? (
        <p className="mb-3 text-2xl font-bold leading-8">{username}</p>
      ) : (
        <Skeleton className="w-32 h-8 mb-3 bg-gray-200" />
      )}
    </div>
  );
}

export default PersonalAvatar;
