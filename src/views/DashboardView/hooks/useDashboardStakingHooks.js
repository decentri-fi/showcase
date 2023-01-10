import {useEffect, useState} from "react";
import {farmingPositions} from "../../../api/defitrack/staking/staking";

export default function useDashboardStakingHooks(account, protocols, supportsStaking, {
    setTotalScanning,
    setDoneScanning
}) {

    const [stakings, setStakings] = useState( null);

    useEffect( () => {
        if(account !== undefined && supportsStaking && stakings !== null) {
            if(stakings.length || null >= (JSON.parse(localStorage.getItem(`staking-elements-${account}`))?.length || 0)) {
                localStorage.setItem(`staking-elements-${account}`, JSON.stringify(stakings));
            }
        }
    }, [stakings]);

    useEffect(() => {
        if(account !== undefined && supportsStaking) {
            const stakingElements = JSON.parse(localStorage.getItem(`staking-elements-${account}`)) || [];
            setStakings(stakingElements);
        }
    }, [account]);

    useEffect(() => {
        const loadData = async () => {
            if (protocols.length > 0) {
                if(stakings === null) {
                    setStakings([]);
                }
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
        stakings: stakings || []
    }
};