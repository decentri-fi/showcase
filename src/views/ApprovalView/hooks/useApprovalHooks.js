import {useQuery} from "@tanstack/react-query";
import {getApprovals} from "../../../api/whalespotter/approvals/Approvals";
import {createAuthentication} from "../../../api/whalespotter/authentication/createAuthentication";
import useSiwe from "../../../hooks/siwe/useSiwe";

export function useApprovalHooks(address) {

    const siwe = useSiwe();

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
        isLoading: approvalQuery.isLoading
    }
}