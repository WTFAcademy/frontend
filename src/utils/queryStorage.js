const queryDataMap = new Map();

export const setQueryData = (keys, data) => {
    const key = keys.join('_');
    queryDataMap.set(key, data);
}

export const getQueryData = (keys) => {
    const key = keys.join('_');
    return queryDataMap.get(key);
}

export const hasQueryData = (keys) => {
    const key = keys.join('_');
    return queryDataMap.has(key);
}

export const updateQueryData = (keys, updateData = {}) => {
    const key = keys.join('_');
    const data = queryDataMap.get(key) || {};
    queryDataMap.set(key, {...data, ...updateData});
}