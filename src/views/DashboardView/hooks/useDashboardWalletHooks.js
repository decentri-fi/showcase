import {useEffect, useState} from "react";
import {fetchNativeBalance, fetchTokenBalance} from "../../../api/defitrack/balance/balance";

export default function useDashboardWalletHooks(account, networks, supportsBalances) {
    const [balanceElements, setBalanceElements] = useState([]);

    function refresh() {
        localStorage.setItem(`balance-elements-${account}`, null);
        setBalanceElements([]);
        init();
    }

    function init() {
        if (supportsBalances && account != null && networks != null && networks.length > 0) {
            const savedOne = JSON.parse(localStorage.getItem(`balance-elements-${account}`));
            if (savedOne != null) {
                setBalanceElements(savedOne)
            } else {
                setBalanceElements([]);
                fetchNativeBalance(account).then(nativeBalance => {
                    for (const balanceElement of nativeBalance) {
                        setBalanceElements(prevState => {
                            prevState.push(balanceElement);
                            localStorage.setItem(`balance-elements-${account}`, JSON.stringify(prevState));
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
                                    localStorage.setItem(`balance-elements-${account}`, JSON.stringify(prevState));
                                    return [...prevState];
                                })
                            }
                        } else {
                            setBalanceElements(prevState => {
                                localStorage.setItem(`balance-elements-${account}`, JSON.stringify(prevState));
                                return prevState
                            })
                        }
                    }).catch(ex => {
                        console.log(`error trying to fetch token balances for network ${network.name}`)
                    });
                }
            }
        }
    }

    useEffect(() => {
        init();
    }, [account, networks])

    return {
        balanceElements: balanceElements?.sort((a, b) => {
            return b.dollarValue - a.dollarValue
        }) || [],
        refresh
    }
};