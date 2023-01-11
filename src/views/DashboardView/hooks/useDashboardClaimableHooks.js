import {useEffect, useState} from "react";
import {fetchClaimables} from "../../../api/defitrack/claimable/claimable";

export default function useDashboardClaimableHooks(account, protocols, supportsClaimables, {
    setTotalScanning,
    setDoneScanning
}) {
    const [claimables, setClaimables] = useState([])
    const [protocolsToScan, setProtocolstoScan] = useState([])

    function refresh() {
        localStorage.setItem(`claimable-elements-${account}`, null);
        setClaimables([]);
        init();
    }

    useEffect(() => {
        console.log('protocols to scan: ', protocolsToScan);
    }, [protocolsToScan])

    function removeFromToScan(protocol) {
        console.log('removing from to scan: ', protocol);
        setProtocolstoScan((prev) => {
            prev = prev.filter(element => element.slug != protocol.slug)
            localStorage.setItem(`claimables-to-scan-${account}`, JSON.stringify(prev));
            return [...prev]
        });
    }


    function init() {
        const loadData = async () => {
            if (protocolsToScan.length > 0) {
                console.log('still got protocols to scan: ', protocolsToScan.length);
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                });
                for (const protocol of protocolsToScan) {
                    fetchClaimables(account, protocol).then(retClaimable => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        });
                        removeFromToScan(protocol);
                        if (retClaimable.length > 0) {
                            for (const claimable of retClaimable) {
                                setClaimables(prevState => {
                                    prevState.push(claimable);
                                    localStorage.setItem(`claimable-elements-${account}`, JSON.stringify(prevState));
                                    return [...prevState];
                                })
                            }
                        } else {
                            setClaimables(prevState => {
                                localStorage.setItem(`claimable-elements-${account}`, JSON.stringify(prevState));
                                return [...prevState];
                            });
                        }
                    })
                }
            }
        };

        if (supportsClaimables && account !== undefined) {

            const savedOne = JSON.parse(localStorage.getItem(`claimable-elements-${account}`));
            if (savedOne !== null) {
                setClaimables(savedOne);
            }

            let storedScannedProtocols = localStorage.getItem(`claimables-to-scan-${account}`);
            if (storedScannedProtocols != null) {
                console.log('stored wasnt null', storedScannedProtocols)
                setProtocolstoScan(JSON.parse(storedScannedProtocols));
            } else {
                if (protocols.length > 0) {
                    setProtocolstoScan(protocols);
                }
            }

            if (protocolsToScan.length > 0) {
                loadData();
            }
        }
    }

    useEffect(() => {
        init();
    }, [protocols, account])

    return {
        claimables,
        refresh,
        loading: protocolsToScan.length > 0
    }
}