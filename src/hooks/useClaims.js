import {useQuickswapClaims} from "./claims/useQuickswapClaims";
import {useBalancerRewardClaims} from "./claims/useBalancerRewardClaims";
import {getProviderOrSigner, getSigner} from "./withContract";

export const useClaims = (web3) => {

    const initiateClaim = async (claimable) => {
        return await getSigner(web3.library, web3.account).sendTransaction(
            {
                to: claimable.claimTransaction.to,
                data: claimable.claimTransaction.data
            }
        )
    }

    return {
        claim: initiateClaim
    }
}