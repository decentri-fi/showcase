import {useEffect, useState} from "react";
import {fetchBorrowingsV2} from "../../../api/defitrack/borrowing/borrowing";

export default function useDashboardBorrowingHooks(account, protocols, supportsDebt, {setTotalScanning, setDoneScanning}) {
    const [borrowings, setBorrowings] = useState([])

    useEffect(() => {
        const loadData = async () => {
            setTotalScanning(prevTotalScanning => {
                return prevTotalScanning + protocols.length
            })
            setBorrowings([]);
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
                    }
                })
            }
        }

        if (supportsDebt && account != null) {
            loadData();
        }
    }, [protocols, account])

    return {
        borrowings
    }
};