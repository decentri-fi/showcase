import {getReverseEns} from "../../../api/defitrack/ens/ens";
import {useQuery} from "@tanstack/react-query";

export default function useEnsHooks(account) {

    const query = useQuery({
        queryKey: ['ens', account], queryFn: async () => {
            if (account) {
                return await getReverseEns(account);
            } else {
                return null
            }
        }
    })

    return {
        ens: query.data?.name
    }
};