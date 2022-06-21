import {withContract} from "../withContract";
import StakingRewards from '../../constants/abis/balancer/StakingRewards.json';

export const useBalancerRewardClaims = (web3ReactContextInterface) => {

    const claim = async (claimableelementVO) => {
        const contract = withContract(claimableelementVO.address, StakingRewards, web3ReactContextInterface)
        console.log(contract);
        return await contract.functions["claim_rewards()"]()
    }

    const validate = function (claimableelementVO) {

        if (claimableelementVO.user != null && claimableelementVO.user != web3ReactContextInterface.account) {
            throw Error("You can't claim the rewards on behalf of this user.");
        }

        if (claimableelementVO.network.chainId !== web3ReactContextInterface.chainId) {
            throw Error("web3 is not on the correct chain. Polygon chain is required for this transaction.");
        }
    };

    return {
        claim: claim,
        validate: validate
    }
}
