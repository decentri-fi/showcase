import {useEffect, useState} from "react";
import {getEvents} from "../../../api/whalespotter/transactions/transactions";
import useSiwe from "../../../hooks/siwe/useSiwe";

export default function (address) {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const siwe = useSiwe();


    useEffect(async () => {
        document.title = `History for ${address} - Decentrifi`;
        if (address) {
            getEvents(address, siwe.getAddress()).then(events => {
                setEvents(events);
                setLoading(false);
            }).catch(e => {
                console.error(e);
                setLoading(false);
            });
        }
    }, []);

    const eventsPerTransaction = events.reduce((acc, event) => {
        if (acc[event.transaction.id] == null) {
            acc[event.transaction.id] = []
        }
        acc[event.transaction.id].push(
            event
        )
        return acc
    }, {});

    const transactionsPerId = events.reduce((acc, event) => {
        if (acc[event.transaction.id] == null) {
            acc[event.transaction.id] = event.transaction
        }
        return acc
    }, {});

    return {
        loading,
        eventsPerTransaction,
        transactionsPerId,
    }
};