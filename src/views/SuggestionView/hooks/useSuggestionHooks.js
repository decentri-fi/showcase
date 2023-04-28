import {useQuery} from "@tanstack/react-query";
import {createAuthentication} from "../../../api/whalespotter/authentication/createAuthentication";
import {getApprovals} from "../../../api/whalespotter/approvals/Approvals";
import useSiwe from "../../../hooks/siwe/useSiwe";
import useWeb3 from "../../../hooks/web3";
import {getSuggestions} from "../../../api/whalespotter/suggestion/suggestions.js";

export default function useSuggestionHooks(address) {

    const siwe = useSiwe();
    const web3 = useWeb3();

    const suggestionQuery = useQuery({
        queryKey: ['account', address, 'suggestions'],
        queryFn: async () => {
            const auth = createAuthentication({
                owner: siwe.owner,
                signature: await siwe.getSignature(),
                message: await siwe.getMessage()
            })
            return getSuggestions(
                address,
                auth
            )
        }
    })

    const dismiss = function () {
        console.log("dismiss")
    };

    return {
        suggestions: suggestionQuery.data || [],
        isLoading: suggestionQuery.isLoading,
        dismiss
    }
};