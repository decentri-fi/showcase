import {useQuickswapClaims} from "./claims/useQuickswapClaims";
import {useBalancerRewardClaims} from "./claims/useBalancerRewardClaims";

export const useClaims = (web3) => {
    const quickswapClaims = useQuickswapClaims(web3)
    const balancerClaims = useBalancerRewardClaims(web3)

    const initiateClaim = async (claimable) => {
        switch (claimable.type) {
            case 'quickswap-reward-vault':
                quickswapClaims.validate(claimable)
                return quickswapClaims.claim(claimable)
            case 'balancer-reward':
                balancerClaims.validate(claimable)
                return balancerClaims.claim(claimable)
            default:
                throw Error("This type of reward claiming is not supported yet.");
        }
    }

    return {
        claim: initiateClaim
    }
}