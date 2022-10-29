import {useCallback, useEffect, useState} from "react";
import {getQueryData, hasQueryData, setQueryData} from "../utils/queryStorage";

const defaultQueryOptions = {
    cache: true,
    manual: false
}

const useQuery = (cacheKeys, request, options = defaultQueryOptions) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (force = false) => {
        setLoading(true);

        if (!force && options.cache && hasQueryData(cacheKeys)) {
            setData(getQueryData(cacheKeys));
            setLoading(false);
            return;
        }

        try {
            const response = await request();
            setData(response.data);
            setQueryData(cacheKeys, response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }, [cacheKeys, request]);

    const mutate = useCallback((newData) => {
        setData(newData);
        setQueryData(cacheKeys, newData);
    }, [cacheKeys])

    useEffect(() => {
        if (options.manual) {
            return;
        }

        fetchData();
    }, []);

    return {
        data,
        loading,
        error,
        mutate,
        fetch: fetchData,
    };
}

export default useQuery;