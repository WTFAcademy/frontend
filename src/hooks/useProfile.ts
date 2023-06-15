import { useEffect, useState } from "react";
import { getProfile } from "@site/src/api/wallet-auth";

const useProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getProfile('ed1c04ab-f6f4-411b-9b3f-19da7be6276e')
            .then(res => {
                setProfile(res.data?.data);
                console.log(res.data?.data);
            })
            .catch(err => console.log(err));
    }, []);

    return {
        profile
    };
};

export default useProfile;
