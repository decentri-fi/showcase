import {useQuery} from "@tanstack/react-query";
import {getStatistics} from "../../../api/defitrack/statistics/Statistics";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";
import {fetchNetworks} from "../../../api/defitrack/networks/networks";

export function useLandingView() {

    const statsQuery = useQuery({
            queryKey: ["statistics"],
            staleTime: 1000 * 60 * 10,
            queryFn: async () => {
                const markets = (await getStatistics()).marketCount;
                const protocols = (await fetchProtocols()).length;
                const networks = (await fetchNetworks()).length;

                return {
                    "markets": markets,
                    "protocols": protocols,
                    "networks": networks
                }
            }
        }
    )

    return {
        statistics : statsQuery.data || {
            "protocols": 21, "networks": 7, "markets": 550
        }
    }
}