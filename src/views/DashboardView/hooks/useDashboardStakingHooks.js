import {useEffect, useState} from "react";
import {farmingPositions} from "../../../api/defitrack/staking/staking";

export default function useDashboardStakingHooks(account, protocols, supportsStaking, {
    setTotalScanning,
    setDoneScanning
}) {

    const [stakings, setStakings] = useState( []);

    useEffect( () => {
        if(account !== undefined && supportsStaking) {
            if(stakings.length >= (JSON.parse(localStorage.getItem(`staking-elements-${account}`))?.length || 0)) {
                localStorage.setItem(`staking-elements-${account}`, JSON.stringify(stakings));
            }
        }
    }, [stakings]);

    useEffect(() => {
        const loadData = async () => {
            if (protocols.length > 0) {
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                })
                for (const protocol of protocols) {
                    farmingPositions(account, protocol).then(retStakings => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
                        if (retStakings.length > 0) {
                            for (const staking of retStakings) {
                                setStakings(prevState => {
                                    prevState.push(staking)
                                    return [...prevState];
                                })
                            }
                        } else {
                            setStakings(prevState => {
                                return [...prevState];
                            })
                        }
                    })
                }
            }
        }

        if (supportsStaking && account !== undefined) {
            const savedOne = JSON.parse(localStorage.getItem(`staking-elements-${account}`));
            if(savedOne !== null) {
                setStakings(savedOne);
            } else {
                loadData();
            }
        }
    }, [protocols, account])

    return {
        stakings
    }
};