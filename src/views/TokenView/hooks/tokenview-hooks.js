import {useEffect, useState} from "react";
import {fetchTokenBalance, fetchTokenInformation, fetchWrappedToken} from "../../../api/defitrack/erc20/erc20";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";
import {fetchPoolingMarketAlternativesForToken, fetchPoolingMarketsForToken} from "../../../api/defitrack/pools/pools";
import useWeb3 from "../../../hooks/web3";
import {ethers} from 'ethers';
import {BigNumber} from "@ethersproject/bignumber";
import {calculatePrice} from "../../../api/defitrack/price/price";
import {fetchLendingMarketsForToken} from "../../../api/defitrack/lending/lending";
import {fetchStakingMarketsForToken} from "../../../api/defitrack/staking/staking";

export default function useTokenviewHooks(networkName, tokenAddress) {

    const [token, setToken] = useState(null);
    const [decimalUserBalance, setDecimalUserBalance] = useState(null);
    const [lendingOpportunities, setLendingOpportunities] = useState([])
    const [farmingOpportunities, setFarmingOpportunities] = useState([])

    const [tabs, setTabs] = useState([]);

    function setActiveTab(tabName) {
        setTabs((prevState) => {
            return prevState.map((tab) => {
                tab.selected = tab.id === tabName;
                return tab;
            });
        });
    }


    const web3 = useWeb3();

    useEffect(() => {
        async function fetchData() {
            if (tokenAddress !== null && networkName !== null) {
                const usingAddress = tokenAddress === '0x0' ? (await fetchWrappedToken(networkName)).address : tokenAddress
                const tokenInfoResponse = await fetchTokenInformation(usingAddress, networkName)
                const dollarValue = await calculatePrice({
                    address: tokenInfoResponse.address,
                    network: networkName,
                    amount: 1.0,
                    tokenType: tokenInfoResponse.type
                })
                let fullTokenInfo = {
                    ...tokenInfoResponse,
                    dollarValue: dollarValue
                };
                setToken(fullTokenInfo)
            }
        }

        fetchData();
    }, [networkName, tokenAddress])

    useEffect(() => {
        async function fetchData() {
            if (token !== null && web3.hasAccount && token.type === 'SINGLE') {
                const result = await fetchTokenBalance(token.address, web3.account, networkName);
                if (result > 0) {
                    const number = BigNumber.from(String(result))
                    console.log(number);
                    setDecimalUserBalance(
                        ethers.utils.formatUnits(number, token.decimals)
                    )
                }
            }
        }

        fetchData()
    }, [token, web3.account]);

    const [poolingOpportunities, setPoolingOpportunities] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (token !== null && networkName !== null) {
                let protocols = await fetchProtocols();
                for (const proto of protocols) {
                    let promise = token.type === 'SINGLE' ? fetchPoolingMarketsForToken(
                        networkName,
                        proto,
                        token.address
                    ) : fetchPoolingMarketAlternativesForToken(
                        networkName,
                        proto,
                        token.address
                    );
                    promise.then((elements) => {
                        for (const element of elements) {
                            setPoolingOpportunities((prevState) => {
                                prevState.push(element)
                                return [...prevState]
                            })
                        }
                    })
                }
            }
        }

        fetchData();
    }, [token])

    useEffect(() => {
        let t = [];
        if (poolingOpportunities.length > 0) {
            t.push({
                id: 'Pooling',
                name: `Pooling (${poolingOpportunities.length})`, selected: true,
                onClick: () => setActiveTab('Pooling')
            });
        }
        if (lendingOpportunities.length > 0) {
            t.push({
                id: `Lending`,
                name: `Lending (${lendingOpportunities.length})`, onClick: (() => {
                    setActiveTab('Lending')
                })
            });
        }
        if (farmingOpportunities.length > 0) {
            t.push({
                id: 'Farming',
                name: `Farming (${farmingOpportunities.length})`, onClick: (() => {
                    setActiveTab('Farming')
                })
            });
        }

        if (t.length > 0) {
            t[0].selected = true;
        }

        setTabs(t);
    }, [poolingOpportunities, lendingOpportunities, farmingOpportunities]);

    useEffect(() => {
        async function fetchData() {
            let protocols = await fetchProtocols();
            for (const proto of protocols) {
                fetchLendingMarketsForToken(
                    networkName,
                    token.address,
                    proto
                ).then((elements) => {
                    for (const element of elements) {
                        setLendingOpportunities((prevState) => {
                            prevState.push(element)
                            return [...prevState]
                        })
                    }
                })
            }
        }

        if (token !== null && token.type === 'SINGLE' && networkName !== null) {
            fetchData();
        }
    }, [token, networkName])

    useEffect(() => {
        async function fetchData() {
            if (token !== null) {
                let protocols = await fetchProtocols();
                for (const proto of protocols) {
                    fetchStakingMarketsForToken(
                        networkName,
                        proto,
                        token.address
                    ).then((elements) => {
                        for (const element of elements) {
                            setFarmingOpportunities((prevState) => {
                                prevState.push(element)
                                return [...prevState]
                            })
                        }
                    })
                }
            }
        }

        if (token !== null && networkName !== null) {
            fetchData();
        }
    }, [token, networkName])


    return {
        tabs,
        userBalance: decimalUserBalance,
        poolingOpportunities,
        farmingOpportunities,
        lendingOpportunities,
        token,
        network: networkName,
    }
}