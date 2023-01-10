import {useEffect, useState} from "react";
import {fetchBorrowingsV2} from "../../../api/defitrack/borrowing/borrowing";


export default function useDashboardBorrowingHooks(account, protocols, supportsDebt, {
    setTotalScanning,
    setDoneScanning
}) {
    const [borrowings, setBorrowings] = useState([]);

    useEffect( () => {
        if(account !== undefined && supportsDebt) {
            if(borrowings.length >= (JSON.parse(localStorage.getItem(`borrowing-elements-${account}`))?.length || 0)) {
                localStorage.setItem(`borrowing-elements-${account}`, JSON.stringify(borrowings));
            }
        }
    }, [borrowings]);

    useEffect(() => {
        const loadData = async () => {
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
                                return [...prevState];
                            })
                        }
                    } else {
                        setBorrowings(prevState => {
                            return [...prevState];
                        })
                    }
                })
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
    }, [protocols, account])

    return {
        borrowings
    }
};