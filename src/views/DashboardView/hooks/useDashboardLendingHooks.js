import {useEffect, useState} from "react";
import {lendingPositions} from "../../../api/defitrack/lending/lending";

export default function useDashboardLendingHooks(account, protocols, supportsLending, {
    setTotalScanning,
    setDoneScanning
}) {
    const [lendings, setLendings] = useState([]
    );

    useEffect(() => {
        if (account !== undefined && supportsLending) {
            if(lendings.length >= (JSON.parse(localStorage.getItem(`lending-elements-${account}`))?.length || 0)) {
                localStorage.setItem(`lending-elements-${account}`, JSON.stringify(lendings));
            }
        }
    }, [lendings]);


    useEffect(() => {
        const loadData = async () => {
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
                    } else {
                        setLendings(prevState => {
                            return [...prevState];
                        })
                    }
                });
            }
        }

        if (supportsLending && account !== undefined) {
            const savedOne = JSON.parse(localStorage.getItem(`lending-elements-${account}`))
            if (savedOne !== null) {
                setLendings(savedOne);
            } else {
                loadData();
            }
        }
    }, [protocols, account])

    return {
        lendings
    }
};