import {useEffect, useState} from "react";
import {lendingPositions} from "../../../api/defitrack/lending/lending";

export default function useDashboardLendingHooks(account, protocols, supportsLending, {
    setTotalScanning,
    setDoneScanning
}) {
    const [lendings, setLendings] = useState([]);

    function refresh() {
        localStorage.setItem(`lending-elements-${account}`, null);
        setLendings([]);
        init();
    }

    function init() {
        const loadData = async () => {
            if (protocols.length > 0) {
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
                                    localStorage.setItem(`lending-elements-${account}`, JSON.stringify(prevState));
                                    return [...prevState];
                                })
                            }
                        } else {
                            setLendings(prevState => {
                                localStorage.setItem(`lending-elements-${account}`, JSON.stringify(prevState));
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
                setLendings([]);
                loadData();
            }
        }
    }

    useEffect(() => {
        init();
    }, [protocols, account])

    return {
        lendings,
        refresh
    }
};