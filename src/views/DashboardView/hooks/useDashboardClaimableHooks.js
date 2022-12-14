import {useEffect, useState} from "react";
import {fetchClaimables} from "../../../api/defitrack/claimable/claimable";

export default function useDashboardClaimableHooks(account, protocols, supportsClaimables, {setTotalScanning, setDoneScanning}) {
    const [claimables, setClaimables] = useState([])
    useEffect(() => {
        const loadData = async () => {
            setClaimables([]);
            setTotalScanning(prevTotalScanning => {
                return prevTotalScanning + protocols.length
            })

            if (protocols.length > 0) {
                for (const protocol of protocols) {
                    fetchClaimables(account, protocol).then(retClaimable => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
                        for (const claimable of retClaimable) {
                            setClaimables(prevState => {
                                prevState.push(claimable);
                                return [...prevState];
                            })
                        }
                    })
                }
            }
        };

        if (supportsClaimables && account !== null) {
            loadData();
        }
    }, [protocols, account])

    return {
        claimables
    }
}