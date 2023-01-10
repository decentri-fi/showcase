import {useEffect, useState} from "react";
import {poolingPositions} from "../../../api/defitrack/pools/pools";

export default function useDashboardLPHooks(account, protocols, supportsPooling, {setTotalScanning, setDoneScanning}) {
    const [lps, setLps] = useState(
        []
    );

    useEffect( () => {
        if(account !== undefined && supportsPooling) {
            if(lps.length >= (JSON.parse(localStorage.getItem(`lp-elements-${account}`))?.length || 0)) {
                localStorage.setItem(`lp-elements-${account}`, JSON.stringify(lps));
            }
        }
    }, [lps]);

    useEffect(async () => {
        const loadData = async () => {
            if (protocols.length > 0) {
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                })
                for (const protocol of protocols) {
                    poolingPositions(account, protocol).then(poolings => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
                        if (poolings.length > 0) {
                            for (const pooling of poolings) {
                                setLps(prevState => {
                                    prevState.push(pooling);
                                    return [...prevState];
                                });
                            }
                        } else {
                            setLps(prevState => {
                                return [...prevState];
                            });
                        }
                    })
                }
            }
        }

        if (supportsPooling && account !== undefined) {
            const savedOne = JSON.parse(localStorage.getItem(`lp-elements-${account}`));
            if(savedOne !== null) {
                setLps(savedOne);
            } else {
                loadData();
            }
        }
    }, [protocols, account])

    return {
        lps
    }
};