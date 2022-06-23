import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";
import defitrack from "@defitrack/js-client";

export default function useProtocolView() {

    const params = useParams();

    const protocolSlug = params.protocol;

    const [protocol, setProtocol] = useState(null)
    const [poolingOpportunities, setPoolingOpportunities] = useState([]);
    const [farmingOpportunities, setFarmingOpportunities] = useState([]);
    const [lendingOpportunities, setLendingOpportunities] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const protocols = await fetchProtocols();
            const proto = protocols.find(element => element.slug === protocolSlug)
            if (proto !== undefined) {
                setProtocol(proto)
            }
        }

        fetchData();
    }, [params])

    async function fetchPoolingMarkets() {
        if (protocol !== null) {
            defitrack.pooling().markets(protocol.slug).then(po => {
                for (const element of po) {
                    setPoolingOpportunities((prevState) => {
                        prevState.push(element)
                        return [...prevState]
                    })
                }
            })
        }
    }


    async function fetchLendingMarkets() {
        if (protocol !== null) {
            defitrack.lending().markets(protocol.slug).then(lo => {
                for (const element of lo) {
                    setLendingOpportunities((prevState) => {
                        prevState.push(element)
                        return [...prevState]
                    })
                }
            })
        }
    }


    async function fetchFarmingMarkets() {
        if (protocol !== null) {
            defitrack.farming().markets(protocol.slug, 'ETHEREUM').then(fo => {
                for (const element of fo) {
                    setFarmingOpportunities((prevState) => {
                        prevState.push(element)
                        return [...prevState]
                    })
                }
            })
        }
    }

    useEffect(() => {
        fetchPoolingMarkets();
        fetchLendingMarkets();
        fetchFarmingMarkets();
    }, [protocol])

    return {
        protocol,
        poolingOpportunities,
        farmingOpportunities,
        lendingOpportunities
    }
}