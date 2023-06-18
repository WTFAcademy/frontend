
// 为了便于寻找哪里用了any
export type TAny = any;

export type TSponsorAsset = {
    name: string;
    image_url: string;
}

export type TCourseAsset = {
    "id": number;
    "name": string;
    "description": string;
    "share_url": string;
    "image_url": string;
    "tags": string[];
}

export type TResult<T> = {
    "code": number;
    "msg": string;
    "data": T;
}
