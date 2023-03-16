import {useQuery} from "@tanstack/react-query";
import {getApprovals} from "../../../api/whalespotter/approvals/Approvals";
import {createAuthentication} from "../../../api/whalespotter/authentication/createAuthentication";
import useSiwe from "../../../hooks/siwe/useSiwe";
import {useERC20} from "../../../hooks/erc20/useERC20";
import useWeb3 from "../../../hooks/web3";

export function useApprovalHooks(address) {

    const siwe = useSiwe();
    const web3 = useWeb3();
    const erc20 = useERC20(web3);

    const revoke = async (allowance) => {
        console.log(allowance)
        await erc20.approve(allowance.token.address, allowance.spender.address, 0, allowance.network.chainId)
    }

    const approvalQuery = useQuery({
        queryKey: ['account', address, 'allowance'],
        queryFn: async () => {
            const auth = createAuthentication({
                owner: siwe.owner,
                signature: await siwe.getSignature(),
                message: await siwe.getMessage()
            })
            return getApprovals(
                address,
                auth
            )
        }
    })

    return {
        allowances: approvalQuery.data || [],
        isLoading: approvalQuery.isLoading,
        revoke
    }
}