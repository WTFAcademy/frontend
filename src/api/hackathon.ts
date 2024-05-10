import request from "@site/src/api/request";
import { TResult } from "@site/src/typings/common";

export const checkEthBeijingQualification = (githubId: string) => {
  return request
    .get<unknown, TResult<boolean>>(`/ethbeijing/check?github_id=${githubId}`)
    .then(res => res.data);
};
