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
    const [scannedFarmingOpportunities, setScannedFarmingOpportunities] = useState(false);
    const [scannedLendingOpportunities, setScannedLendingOpportunities] = useState(false);
    const [scannedPoolingOpportunities, setScannedPoolingOpportunities] = useState(false);

    const [tabs, setTabs] = useState([])

    function setActiveTab(tabName) {
        setTabs((prevState) => {
            return prevState.map((tab) => {
                tab.selected = tab.id === tabName;
                return tab;
            });
        });
    }

    useEffect(() => {
        let t = [];
        if (poolingOpportunities.length > 0) {
            t.push({
                id: 'Pooling',
                name: `Pooling (${poolingOpportunities.length})`, selected: true,
                onClick: () => setActiveTab('Pooling')
            });
        }
        if (lendingOpportunities.length > 0) {
            t.push({
                id: `Lending`,
                name: `Lending (${lendingOpportunities.length})`, onClick: (() => {
                    setActiveTab('Lending')
                })
            });
        }
        if (farmingOpportunities.length > 0) {
            t.push({
                id: 'Farming',
                name: `Farming (${farmingOpportunities.length})`, onClick: (() => {
                    setActiveTab('Farming')
                })
            });
        }

        if (t.length > 0) {
            t[0].selected = true;
        }

        setTabs(t);
    }, [poolingOpportunities, lendingOpportunities, farmingOpportunities]);

    useEffect(() => {
        async function fetchData() {
            const protocols = await fetchProtocols();
            const proto = protocols.find(element => element.slug === protocolSlug)
            if (proto !== undefined) {
                setProtocol(proto)
            }
        }

        fetchData();
    }, [])

    async function fetchPoolingMarkets() {
        if (protocol !== null) {
            setPoolingOpportunities([]);
            defitrack.pooling().markets(protocol.slug).then(po => {
                for (const element of po) {
                    setPoolingOpportunities((prevState) => {
                        prevState.push(element)
                        return [...prevState]
                    })
                }
                setScannedPoolingOpportunities(true);
            })
        }
    }


    async function fetchLendingMarkets() {
        if (protocol !== null) {
            setLendingOpportunities([]);
            defitrack.lending().markets(protocol.slug).then(lo => {
                for (const element of lo) {
                    setLendingOpportunities((prevState) => {
                        prevState.push(element)
                        return [...prevState]
                    })
                }
                setScannedLendingOpportunities(true);
            })
        }
    }


    async function fetchFarmingMarkets() {
        if (protocol !== null) {
            setFarmingOpportunities([]);
            defitrack.farming().markets(protocol.slug).then(fo => {
                for (const element of fo) {
                    setFarmingOpportunities((prevState) => {
                        prevState.push(element)
                        return [...prevState]
                    })
                }
                setScannedFarmingOpportunities(true);
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
        scannedFarmingOpportunities,
        scannedLendingOpportunities,
        scannedPoolingOpportunities,
        poolingOpportunities,
        farmingOpportunities,
        lendingOpportunities,
        tabs,
        setActiveTab,
        networks: Array.from(
            new Set(
                (farmingOpportunities.concat(poolingOpportunities)).map((opportunity) => {
                    return opportunity.network.name
                })
            )
        )
    }
}