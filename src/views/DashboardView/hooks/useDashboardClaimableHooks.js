import {useEffect, useState} from "react";
import {fetchClaimables} from "../../../api/defitrack/claimable/claimable";

export default function useDashboardClaimableHooks(account, protocols, supportsClaimables, {
    setTotalScanning,
    setDoneScanning
}) {
    const [claimables, setClaimables] = useState([])

    useEffect(() => {
        if (account !== undefined && supportsClaimables) {
            console.log('updated claimables', claimables)
            console.log('claimables', claimables.length)
            if (claimables.length >= (JSON.parse(localStorage.getItem(`claimable-elements-${account}`))?.length || 0)) {
                localStorage.setItem(`claimable-elements-${account}`, JSON.stringify(claimables));
            }
        }
    }, [claimables]);


    useEffect(() => {
        const loadData = async () => {

            setTotalScanning(prevTotalScanning => {
                return prevTotalScanning + protocols.length
            })

            if (protocols.length > 0) {
                for (const protocol of protocols) {
                    fetchClaimables(account, protocol).then(retClaimable => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
                        if (retClaimable.length > 0) {
                            for (const claimable of retClaimable) {
                                setClaimables(prevState => {
                                    prevState.push(claimable);
                                    return [...prevState];
                                })
                            }
                        } else {
                            setClaimables(prevState => {
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
    }, [protocols, account])

    return {
        claimables
    }
}