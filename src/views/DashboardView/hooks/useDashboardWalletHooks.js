import {useEffect, useState} from "react";
import {fetchNativeBalance, fetchTokenBalance} from "../../../api/defitrack/balance/balance";

export default function useDashboardWalletHooks(account, networks) {
    const [balanceElements, setBalanceElements] = useState([])

    useEffect(() => {
        if (account != null && networks != null && networks.length > 0) {
            console.log(account);
            console.log(networks);
            console.log('fetching balance elements');
            setBalanceElements(prevState => {
                return []
            });
            fetchNativeBalance(account).then(nativeBalance => {
                for (const balanceElement of nativeBalance) {
                    setBalanceElements(prevState => {
                        prevState.push(balanceElement);
                        return [...prevState]
                    })
                }
            })

            for (const network of networks) {
                    fetchTokenBalance(account, network.name).then(tokenBalance => {
                        for (const balanceElement of tokenBalance) {
                            setBalanceElements(prevState => {
                                prevState.push(balanceElement);
                                return [...prevState]
                            })
                        }
                    }).catch(ex => {
                        console.log(`error trying to fetch token balances for network ${network.name}`)
                    });
            }
        }
    }, [account, networks])

    return {
        balanceElements: balanceElements.sort((a, b) => {
            return b.dollarValue - a.dollarValue
        })
    }
};