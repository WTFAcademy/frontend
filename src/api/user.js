import request from "./request";
import {gql} from "graphql-request";
import gqlClient from './graph';
import get from "lodash/get";
import {ethers} from "ethers";

export const getUserCourseInfo = async (courseId) => {
    const res = await request.get(`/user_course/${courseId}`).then(res => res.data);
    // return res;
    const bindWallet = get(res, 'data.user_wallet.wallet');
    console.log('bindWallet: ', bindWallet);
    if (bindWallet) {
        const needClaimId = get(res, 'data.course_nft.token_id');
        const tokenInfo = await userTokenInfo(bindWallet);
        const claimedIds = get(tokenInfo, 'user.created', []).map(item => item.id);
        const hasClaimed = claimedIds.includes(needClaimId + '');
        const donationAmount = get(tokenInfo, 'user.amount', 0)

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
    return request.post(`/user_course/${courseId}/nft_sign`).then(res => res.data)
}

export const bindWallet = (mesData, signData, wallet) => {
    return request.post('/wallet/bind', {
        mesData,
        signData,
        wallet
    }).then(res => res.data);
}

export const userTokenInfo = async (address) => {
    const query = gql`
       query getTokenInfo($address: String!) {
          user(id: $address) {
            created {
              id
            }
            amount
          }
       }
    `
    return await gqlClient.request(query, {address: address.toLowerCase()});
}

