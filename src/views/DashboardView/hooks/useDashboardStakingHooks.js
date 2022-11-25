import {useEffect, useState} from "react";
import {farmingPositions} from "../../../api/defitrack/staking/staking";

export default function useDashboardStakingHooks(account, protocols, {setTotalScanning, setDoneScanning}) {

    const [stakings, setStakings] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            setStakings([]);
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
                        }
                    })
                }
            }
        }

        if (account !== null)
            loadData();
    }, [protocols, account])

    return {
        stakings
    }
};