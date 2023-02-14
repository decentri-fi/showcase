import {useEffect, useState} from "react";
import {fetchClaimables} from "../../../api/defitrack/claimable/claimable";

export default function useDashboardClaimableHooks(account, protocols, supportsClaimables, {
    setTotalScanning,
    setDoneScanning
}) {
    const [claimables, setClaimables] = useState([])

    function refresh() {
        localStorage.setItem(`claimable-elements-${account}`, null);
        localStorage.setItem(`scanned-claimables-${account}`, null);
        setClaimables([]);
        init();
    }

    function scanned(protocol, _account) {
        const scannedClaimables = JSON.parse(localStorage.getItem(`scanned-claimables-${_account}`)) || [];
        scannedClaimables.push(protocol.slug)
        localStorage.setItem(`scanned-claimables-${_account}`, JSON.stringify(scannedClaimables));
    }


    function init() {
        const loadData = async (protocolsToScan, _account) => {
            if (protocolsToScan.length > 0) {
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                });
                for (const protocol of protocolsToScan) {
                    fetchClaimables(_account, protocol).then(retClaimable => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        });
                        scanned(protocol, _account);
                        if (retClaimable.length > 0) {
                            for (const claimable of retClaimable) {
                                setClaimables(prevState => {
                                    prevState.push({
                                        ...claimable,
                                        owner: _account
                                    });
                                    localStorage.setItem(`claimable-elements-${_account}`, JSON.stringify(prevState));
                                    return [...prevState];
                                })
                            }
                        } else {
                            setClaimables(prevState => {
                                localStorage.setItem(`claimable-elements-${account}`, JSON.stringify(prevState));
                                return [...prevState];
                            });
                        }
                    }).catch(() => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        });
                        console.log("error trying to fetch claimables");
                    })
                }
            }
        };

        if (supportsClaimables && account !== undefined) {
            const savedOne = JSON.parse(localStorage.getItem(`claimable-elements-${account}`));
            if (savedOne !== null) {
                setClaimables(savedOne);
            }

            const protocolsToScan = getProtocolsToScan(account);

            if (protocolsToScan.length > 0) {
                loadData(protocolsToScan, account);
            }
        }
    }

    function getProtocolsToScan(_account) {
        let protocolsToScan = protocols;
        let storedScannedProtocols = JSON.parse(localStorage.getItem(`scanned-claimables-${_account}`)) || [];
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

    const filteredClaimables = () => {
        if (claimables == null || claimables.length === 0) {
            return [];
        } else {
            return [...claimables.reduce((a, c) => {
                a.set(c.id, c);
                return a;
            }, new Map()).values()].filter(claimable => claimable.owner === account);
        }
    }

    return {
        claimables: filteredClaimables(),
        refresh,
        loading: getProtocolsToScan(account).length > 0
    }
}