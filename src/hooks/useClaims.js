import {useQuickswapClaims} from "./claims/useQuickswapClaims";
import {useBalancerRewardClaims} from "./claims/useBalancerRewardClaims";
import {getProviderOrSigner, getSigner} from "./withContract";

export const useClaims = (web3) => {

    const initiateClaim = async (claimable) => {
        console.log(claimable)
        return await getSigner(web3.library, web3.account).sendTransaction(
            {
                to: claimable.claimTransaction[0].to,
                data: claimable.claimTransaction[0].data
            }
        )
    }

    return {
        claim: initiateClaim
    }
}