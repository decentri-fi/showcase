import {useEffect, useState} from "react";
import {fetchTokenBalance, fetchTokenInformation, fetchWrappedToken} from "../../../api/defitrack/erc20/erc20";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";
import {fetchPoolingMarketAlternativesForToken, fetchPoolingMarketsForToken} from "../../../api/defitrack/pools/pools";
import useWeb3 from "../../../hooks/web3";
import {ethers} from 'ethers';
import {BigNumber} from "@ethersproject/bignumber";
import {calculatePrice} from "../../../api/defitrack/price/price";

export default function useTokenviewHooks(networkName, tokenAddress) {

    const [token, setToken] = useState(null);
    const [decimalUserBalance, setDecimalUserBalance] = useState(null);

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


    return {
        userBalance: decimalUserBalance,
        poolingOpportunities: poolingOpportunities,
        token: token,
        network: networkName,
    }
}