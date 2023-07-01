import request from "./request";
import {gql} from "graphql-request";
import gqlClient from './graph';
import {get} from "lodash-es";

export const getUserCourseInfo = async (courseId, needClaimId) => {
    const res = await request.get(`/user_course/${courseId}`).then(res => res.data);
    const bindWallet = get(res, 'user_wallet.wallet');
    if (bindWallet) {
        const tokenInfo = await userTokenInfo(bindWallet);
        const curTokenInfo = get(tokenInfo, 'user.created', []).find(item => item.soulId === needClaimId + '');
        const hasClaimed = !!curTokenInfo;
        const donationAmount = get(curTokenInfo, 'creator.amount', 0)
        return {
            ...res,
            data: {
                ...res.data,
                hasClaimed,
                donationAmount: donationAmount / 10 ** 18
            }
        }
    }

    return res;
}

export const getMintInfoByCourse = (courseId) => {
    return request.post(`/user_course/${courseId}/nft_sign`, {}, {
        turnOnValve: true
    }).then(res => res.data)
}

export const userTokenInfo = async (address) => {
    const query = gql`
       query getTokenInfo($address: String!) {
          user(id: $address) {
            created {
              soulId
               creator {
                amount
              }
            }
            amount
          }
       }
    `
    return await gqlClient.request(query, {address: address.toLowerCase()});
}

