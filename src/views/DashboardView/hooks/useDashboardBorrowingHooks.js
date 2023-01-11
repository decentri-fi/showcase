import {useEffect, useState} from "react";
import {fetchBorrowingsV2} from "../../../api/defitrack/borrowing/borrowing";


export default function useDashboardBorrowingHooks(account, protocols, supportsDebt, {
    setTotalScanning,
    setDoneScanning
}) {
    const [borrowings, setBorrowings] = useState([]);

    function refresh() {
        localStorage.setItem(`borrowing-elements-${account}`, null);
        setBorrowings([]);
        init();
    }

    function init() {
        const loadData = async () => {
            if (protocols.length > 0) {
                if (borrowings == null) {
                    setBorrowings([]);
                }
                setTotalScanning(prevTotalScanning => {
                    return prevTotalScanning + protocols.length
                })
                for (const protocol of protocols) {
                    fetchBorrowingsV2(account, protocol).then(retBorrowings => {
                        setDoneScanning(prevState => {
                            return prevState + 1
                        })
                        if (retBorrowings.length > 0) {
                            for (const borrowing of retBorrowings) {
                                setBorrowings(prevState => {
                                    prevState.push(borrowing);
                                    localStorage.setItem(`borrowing-elements-${account}`, JSON.stringify(prevState));
                                    return [...prevState];
                                })
                            }
                        } else {
                            setBorrowings(prevState => {
                                localStorage.setItem(`borrowing-elements-${account}`, JSON.stringify(prevState));
                                return [...prevState];
                            })
                        }
                    });
                }
            }
        }

        if (supportsDebt && account != null) {
            const savedOne = JSON.parse(localStorage.getItem(`borrowing-elements-${account}`));
            if (savedOne !== null) {
                setBorrowings(savedOne);
            } else {
                loadData();
            }
        }
    }

    useEffect(() => {
        init();
    }, [protocols, account])

    return {
        borrowings,
        refresh
    }
};