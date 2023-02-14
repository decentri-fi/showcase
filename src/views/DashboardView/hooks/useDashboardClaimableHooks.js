import {fetchClaimables} from "../../../api/defitrack/claimable/claimable";
import {useQueries, useQueryClient} from "@tanstack/react-query";

export default function useDashboardClaimableHooks(account, protocols, supportsClaimables, {
    setTotalScanning,
    setDoneScanning
}) {
    const queryClient = useQueryClient();

    async function getClaimables(protocol) {
        const claimables = (await fetchClaimables(account, protocol)).map(claimable => {
            return {
                ...claimable,
                owner: account
            }
        });
        persist(account, protocol, claimables);
        return claimables;
    }

    function query(protocol) {
        return async () => {
            return getFromLocalStorage(account, protocol) || await getClaimables(protocol);
        };
    }

    const queries = useQueries({
        queries: protocols.map((protocol) => {
            return {
                queryKey: ['claimables', account, protocol],
                queryFn: query(protocol),
            }
        })
    });

    function persist(account, protocol, claimables) {
        localStorage.setItem(`claimables-${account}-${protocol.name}`, JSON.stringify(claimables));
    }

    function getFromLocalStorage(account, protocol) {
        return JSON.parse(localStorage.getItem(`claimables-${account}-${protocol.name}`));
    }



    const refresh = () => {
        protocols.forEach(async (protocol) => {
            await queryClient.invalidateQueries(['claimables', account, protocol]);
            persist(account, protocol, null);
        });
        queries.forEach(async query => {
            await query.refetch();
        })
    }

    const fetchedClaimables = queries.map((query) => {
        return query.data
    }).filter(data => {
        return data != null
    }).flat();


    return {
        claimables: [...fetchedClaimables.reduce((a, c) => {
            a.set(c.id, c);
            return a;
        }, new Map()).values()].filter(claimable => claimable.owner === account),
        refresh: refresh,
        loading: queries.map(query => query.isLoading).reduce((a, c) => a || c, false),
    }
}