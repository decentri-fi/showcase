import {useEffect} from "react";
import {getEvents} from "../../../api/whalespotter/transactions/transactions";
import useSiwe from "../../../hooks/siwe/useSiwe";
import {useQuery} from "@tanstack/react-query";

export default function (address) {

    const eventsQuery = useQuery({
        queryKey: ['account', address, 'events'],
        queryFn: async () => {
            return getEvents(address, address)
        }
    })

    const events = eventsQuery.data || []

    useEffect(async () => {
        document.title = `History for ${address} - Decentrifi`;
    }, []);

    const eventsPerTransaction = events.reduce((acc, event) => {
        if (acc[event.transactionHash] == null) {
            acc[event.transactionHash] = []
        }
        acc[event.transactionHash].push(
            event
        )
        return acc
    }, {});

    const transactionsPerId = events.reduce((acc, event) => {
        if (acc[event.transactionHash] == null) {
            acc[event.transactionHash] = event.transactionHash
        }
        return acc
    }, {});

    return {
        loading: eventsQuery.isLoading,
        eventsPerTransaction,
        transactionsPerId,
    }
};