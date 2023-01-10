import {useEffect, useState} from "react";
import {lendingPositions} from "../../../api/defitrack/lending/lending";

export default function useDashboardLendingHooks(account, protocols, supportsLending, {
    setTotalScanning,
    setDoneScanning
}) {
    const [lendings, setLendings] = useState(null);

    useEffect(() => {
        if (account !== undefined && supportsLending && lendings !== null) {
            if (lendings.length >= (JSON.parse(localStorage.getItem(`lending-elements-${account}`))?.length || 0)) {
                localStorage.setItem(`lending-elements-${account}`, JSON.stringify(lendings));
            }
        }
    }, [lendings]);

    useEffect(() => {
        if (account !== undefined && supportsLending) {
            const lendingElements = JSON.parse(localStorage.getItem(`lending-elements-${account}`)) || [];
            setLendings(lendingElements);
        }
    }, [account]);


    useEffect(() => {
        const loadData = async () => {

            if (protocols.length > 0) {
                if (lendings === null) {
                    setLendings([]);
                }
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
        lendings: lendings || []
    }
};