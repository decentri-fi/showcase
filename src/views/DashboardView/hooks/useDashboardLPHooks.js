import {useEffect, useState} from "react";
import {poolingPositions} from "../../../api/defitrack/pools/pools";

export default function useDashboardLPHooks(account, protocols,  {setTotalScanning, setDoneScanning}) {
    const [lps, setLps] = useState([]);

    useEffect(async () => {
        const loadData = async () => {
            setLps([])
            if(protocols.length > 0) {
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                })
                for (const protocol of protocols) {
                    poolingPositions(account, protocol).then(poolings => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
                        for (const pooling of poolings) {
                            setLps(prevState => {
                                prevState.push(pooling);
                                return [...prevState];
                            });
                        }
                    })
                }
            }
        }

        if (account != null) {
            loadData();
        }
    }, [protocols, account])

    return {
        lps
    }
};