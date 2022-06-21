import {useEffect, useState} from "react";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";

export default function useDashboardProtocolHooks() {
    const [protocols, setProtocols] = useState([])

    useEffect(() => {
        async function fetchData() {
            const retVal = await fetchProtocols()
            setProtocols(retVal)
        }

        fetchData();
    }, [])

    return {
        protocols
    }
};