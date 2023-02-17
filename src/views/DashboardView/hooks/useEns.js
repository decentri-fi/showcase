import {getReverseEns} from "../../../api/defitrack/ens/ens";
import {useQuery} from "@tanstack/react-query";

export default function useEns(account) {

    const query = useQuery({
        queryKey: ['ens', account], queryFn: async () => {
            if (account) {
                try {
                    return await getReverseEns(account);
                } catch (ex) {
                    return null;
                }
            } else {
                return null
            }
        }
    })

    return {
        ens: query.data?.name
    }
};