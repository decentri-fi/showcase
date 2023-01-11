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


    function init() {
        const loadData = async () => {
            if (protocols.length > 0) {
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                });
                for (const protocol of protocols) {
                    fetchClaimables(account, protocol).then(retClaimable => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
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
            } else {
                loadData();
            }
        }
    }

    useEffect(() => {
        init();
    }, [protocols, account])

    return {
        claimables,
        refresh
    }
}