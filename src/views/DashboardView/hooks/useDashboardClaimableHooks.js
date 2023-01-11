import {useEffect, useState} from "react";
import {fetchClaimables} from "../../../api/defitrack/claimable/claimable";

export default function useDashboardClaimableHooks(account, protocols, supportsClaimables, {
    setTotalScanning,
    setDoneScanning
}) {
    const [claimables, setClaimables] = useState([])

    function refresh() {
        localStorage.setItem(`claimable-elements-${account}`, null);
        setClaimables([]);
        init();
    }

    function scanned(protocol) {
        const scannedClaimables = JSON.parse(localStorage.getItem(`scanned-claimables-${account}`)) || [];
        scannedClaimables.push(protocol.slug)
        localStorage.setItem(`scanned-claimables-${account}`, JSON.stringify(scannedClaimables));
    }


    function init() {
        const loadData = async (protocolsToScan) => {
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
                        scanned(protocol);
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

            const protocolsToScan = getProtocolsToScan();

            if (protocolsToScan.length > 0) {
                loadData(protocolsToScan);
            }
        }
    }

    function getProtocolsToScan() {
        let protocolsToScan = protocols;
        let storedScannedProtocols = JSON.parse(localStorage.getItem(`scanned-claimables-${account}`)) || [];
        if (storedScannedProtocols != null) {
            protocolsToScan = protocolsToScan.filter(element => {
                return !storedScannedProtocols.includes(element.slug);
            })
        }
        return protocolsToScan;
    }

    useEffect(() => {
        init();
    }, [protocols, account])

    return {
        claimables,
        refresh,
        loading: getProtocolsToScan().length > 0
    }
}