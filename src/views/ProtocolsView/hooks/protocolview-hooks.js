import {useState} from "react";
import {useParams} from "react-router-dom";
import defitrack from "@defitrack/js-client";
import useProtocols from "../../DashboardView/hooks/useProtocols";
import {useQuery} from "@tanstack/react-query";

export default function useProtocolView() {

    const params = useParams();

    const protoArgument = params.protocol;

    const [activeTab, setActiveTab] = useState();

    const {allProtocols} = useProtocols();
    const protocol = allProtocols.find(element => element.slug === protoArgument)

    const poolingMarkets = useQuery({
        queryKey: ['protocols', protocol, 'pooling-markets'],
        queryFn: async () => {
            return await defitrack.pooling().markets(protocol.slug);
        },
        enabled: !!protocol
    });

    const lendingMarkets = useQuery({
        queryKey: ['protocols', protocol, 'lending-markets'],
        queryFn: async () => {
            return await defitrack.lending().markets(protocol.slug);
        },
        enabled: !!protocol
    });

    const farmingMarkets = useQuery({
        queryKey: ['protocols', protocol, 'farming-markets'],
        queryFn: async () => {
            return await defitrack.farming().markets(protocol.slug);
        },
        enabled: !!protocol
    });


    const farmingOpportunities = farmingMarkets.data || []
    const lendingOpportunities = lendingMarkets.data || []
    const poolingOpportunities = poolingMarkets.data || []


    function getTabs() {
        console.log('activetab', activeTab)
        console.log("'Pooling' == activeTab", 'Pooling' == activeTab)
        console.log("'Farming' == activeTab", 'Farming' == activeTab)
        let t = [];
        if (poolingOpportunities.length > 0) {
            t.push({
                id: 'Pooling',
                selected: 'Pooling' == activeTab,
                name: `Pooling (${poolingOpportunities.length})`,
                onClick: () => setActiveTab('Pooling')
            });
        }
        if (lendingOpportunities.length > 0) {
            t.push({
                id: `Lending`,
                selected: 'Lending' == activeTab,
                name: `Lending (${lendingOpportunities.length})`,
                onClick: () => {
                    console.log('lending')
                    setActiveTab('Lending')
                }
            });
        }
        if (farmingOpportunities.length > 0) {
            t.push({
                id: 'Farming',
                selected: 'Farming' == activeTab,
                name: `Farming (${farmingOpportunities.length})`,
                onClick: () => {
                    console.log('farming')
                    setActiveTab('Farming')
                }
            });
        }

        if (t.length > 0 && !t.find((x) => {
            return x.selected
        })) {
            t[0].selected = true;
        }

        return t;
    }


    return {
        protocol,
        poolingOpportunities,
        farmingOpportunities,
        lendingOpportunities,
        tabs: getTabs(),
        setActiveTab,
        networks: Array.from(
            new Set(
                (lendingOpportunities.concat(farmingOpportunities).concat(poolingOpportunities)).map((opportunity) => {
                    return opportunity.network.name
                })
            )
        )
    }
}