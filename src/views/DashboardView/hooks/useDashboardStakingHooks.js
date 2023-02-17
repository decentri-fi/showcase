import {useEffect, useState} from "react";
import {farmingPositions} from "../../../api/defitrack/staking/staking";
import useProtocols from "./useProtocols";

export default function useDashboardStakingHooks(account, supportsStaking, {
    setTotalScanning,
    setDoneScanning
}) {

    const [stakings, setStakings] = useState([]);
    const {protocols} = useProtocols();

    function refresh() {
        localStorage.setItem(`staking-elements-${account}`, null);
        setStakings([]);
        init();
    }

    function updateStakes(retStakings) {
        setDoneScanning(prevState => {
            return prevState + 1
        })
        if (retStakings.length > 0) {
            for (const staking of retStakings) {
                setStakings(prevState => {
                    prevState.push(staking)
                    localStorage.setItem(`staking-elements-${account}`, JSON.stringify(prevState));
                    return [...prevState];
                })
            }
        } else {
            setStakings(prevState => {
                localStorage.setItem(`staking-elements-${account}`, JSON.stringify(prevState));
                return [...prevState]
            })
        }
    }

    function init() {
        const loadData = async () => {
            if (protocols.length > 0) {
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                })
                for (const protocol of protocols) {
                    farmingPositions(account, protocol).then(retStakings => {
                        updateStakes(retStakings)
                    }).catch(() => {
                        updateStakes([]);
                    });
                }
            }
        }

        if (supportsStaking && account !== undefined) {
            const savedOne = JSON.parse(localStorage.getItem(`staking-elements-${account}`));
            if (savedOne !== null) {
                setStakings(savedOne);
            } else {
                setStakings([]);
                loadData();
            }
        }
    }

    useEffect(() => {
        init();
    }, [protocols, account])

    return {
        stakings,
        refresh
    }
};