import { getProfile } from "@site/src/api/user";
import { useQuery } from 'react-query';

const useProfile = ( id: string = 'ed1c04ab-f6f4-411b-9b3f-19da7be6276e' ) => {

    let isLogin = true;

    const { data, isLoading, isError } = useQuery(['profile', id], () => getProfile(id), {
        enabled: isLogin,
    });

    return {
        profile : data
    };
};

export default useProfile;
