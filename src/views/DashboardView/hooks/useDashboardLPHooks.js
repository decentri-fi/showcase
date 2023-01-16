import {useEffect, useState} from "react";
import {poolingPositions} from "../../../api/defitrack/pools/pools";

export default function useDashboardLPHooks(account, protocols, supportsPooling, {setTotalScanning, setDoneScanning}) {
    const [lps, setLps] = useState([]);

    function getStoredElements() {
        return JSON.parse(localStorage.getItem(`lp-elements-${account}`));
    }

    function refresh() {
        localStorage.setItem(`lp-elements-${account}`, null);
        setLps([]);
        init();
    }

    function updatePoolings(poolings) {
        setDoneScanning(prevState => {
            return prevState + 1
        })
        if (poolings.length > 0) {
            for (const pooling of poolings) {
                setLps(prevState => {
                    prevState.push(pooling);
                    localStorage.setItem(`lp-elements-${account}`, JSON.stringify(prevState));
                    return [...prevState];
                });
            }
        } else {
            setLps(prevState => {
                localStorage.setItem(`lp-elements-${account}`, JSON.stringify(prevState));
                return [...prevState];
            });
        }
    }

    function init() {
        const loadData = async () => {
            if (protocols.length > 0) {
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                })
                for (const protocol of protocols) {
                    poolingPositions(account, protocol).then(poolings => {
                        updatePoolings(poolings);
                    })
                }
            }
        }

        if (supportsPooling && account !== undefined) {
            const savedOne = getStoredElements();
            if (savedOne !== null) {
                setLps(savedOne);
            } else {
                setLps([])
                loadData();
            }
        }
    }

    useEffect(async () => {
        init();
    }, [protocols, account])

    return {
        lps,
        refresh
    }
};