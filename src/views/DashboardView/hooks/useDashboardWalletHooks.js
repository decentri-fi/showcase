import {useEffect, useState} from "react";
import {fetchNativeBalance, fetchTokenBalance} from "../../../api/defitrack/balance/balance";

export default function useDashboardWalletHooks(account, networks, supportsBalances) {
    const [balanceElements, setBalanceElements] = useState(null);

    useEffect(() => {
        if (account !== undefined && supportsBalances && balanceElements !== null) {
            if (balanceElements.length >= (JSON.parse(localStorage.getItem(`balance-elements-${account}`))?.length || 0)) {
                localStorage.setItem(`balance-elements-${account}`, JSON.stringify(balanceElements));
            }
        }
    }, [balanceElements]);

    useEffect(() => {
        if (account !== undefined && supportsBalances) {
            const balanceElements = JSON.parse(localStorage.getItem(`balance-elements-${account}`)) || [];
            setBalanceElements(balanceElements);
        }
    }, [account]);

    useEffect(() => {
        if (supportsBalances && account != null && networks != null && networks.length > 0) {
            const savedOne = JSON.parse(localStorage.getItem(`balance-elements-${account}`));
            if (savedOne != null) {
                setBalanceElements(savedOne)
            } else {
                if(balanceElements === null) {
                    setBalanceElements([]);
                }
                fetchNativeBalance(account).then(nativeBalance => {
                    for (const balanceElement of nativeBalance) {
                        setBalanceElements(prevState => {
                            prevState.push(balanceElement);
                            console.log(prevState)
                            return [...prevState];
                        })
                    }
                });
                for (const network of networks) {
                    fetchTokenBalance(account, network.name).then(tokenBalance => {
                        if (tokenBalance.length > 0) {
                            for (const balanceElement of tokenBalance) {
                                setBalanceElements(prevState => {
                                    prevState.push(balanceElement);
                                    return [...prevState];
                                })
                            }
                        } else {
                            setBalanceElements(prevState => {
                                return [...prevState];
                            })
                        }
                    }).catch(ex => {
                        console.log(`error trying to fetch token balances for network ${network.name}`)
                    });
                }
            }
        }
    }, [account, networks])

    return {
        balanceElements: balanceElements?.sort((a, b) => {
            return b.dollarValue - a.dollarValue
        }) || []
    }
};