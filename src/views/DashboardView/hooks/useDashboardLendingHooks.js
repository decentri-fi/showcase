import {useEffect, useState} from "react";
import {lendingPositions} from "../../../api/defitrack/lending/lending";

export default function useDashboardLendingHooks(account, protocols, supportsLending, {setTotalScanning, setDoneScanning}) {
    const [lendings, setLendings] = useState([])

    useEffect(() => {
        const loadData = async () => {
            setLendings([]);
            setTotalScanning(prevTotalScanning => {
                return prevTotalScanning + protocols.length
            })
            for (const protocol of protocols) {
                lendingPositions(account, protocol).then(retLendings => {
                    setDoneScanning(prevState => {
                        return prevState + 1
                    })
                    if (retLendings.length > 0) {
                        for (const lending of retLendings) {
                            setLendings(prevState => {
                                prevState.push(lending);
                                return [...prevState];
                            })
                        }
                    }
                });
            }
        }

        if (supportsLending && account !== null) {
            loadData();
        }
    }, [protocols, account])

    return {
        lendings
    }
};