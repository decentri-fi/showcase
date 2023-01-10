import {useEffect, useState} from "react";
import {useBeefyYeet} from "../../../../../hooks/yeet/beefy/useBeefyYeet";
import {useQuickswapLPYeet} from "../../../../../hooks/yeet/quickswap/UseQuickswapLPYeet";
import useContractExceptions from "../../../../../hooks/useContractExceptions";
import {useERC20} from "../../../../../hooks/erc20/useERC20";
import {fetchTokenBalance, fetchTokenInformation,} from "../../../../../api/defitrack/erc20/erc20";
import BigNumber from "bignumber.js";
import swal from "sweetalert";
import {withContract} from "../../../../../hooks/withContract";
import ERC20 from "../../../../../constants/abis/erc20/ERC20.json";
import {MaxUint256} from "@ethersproject/constants";
import useWeb3 from "../../../../../hooks/web3";

export default function useBeefyQuickswapYeet(wantTokenInfo, farmingMarket) {

    const web3 = useWeb3();
    const beefyYeet = useBeefyYeet(web3.web3React)
    const quickswapYeet = useQuickswapLPYeet(web3.web3React);
    const contractExceptions = useContractExceptions()
    const erc20 = useERC20(web3.web3React);

    const [tokenList, setTokenList] = useState([]);
    const [activeToken, setActiveToken] = useState([]);
    const [chosenAmount, setChosenAmount] = useState(0);


    const yeet = async (e) => {
        const amount = new BigNumber(chosenAmount);
        if (amount.lte(new BigNumber(0))) {
            swal({
                text: 'In order to successfully yeet, please use yeet more than 0',
                icon: "error"
            })
        } else {
            try {
                const result = await beefyYeet.yeetIn(
                    activeToken.address, amount.multipliedBy(
                        new BigNumber(10).exponentiatedBy(activeToken.decimals || 18)
                    ).toString(), farmingMarket.contractAddress, quickswapYeet.quickswapYeetInAddress
                );
            } catch (e) {
                console.log(e);
                contractExceptions.handle(e);
            }
        }
    }

    function updateAvailableTokenList() {
        const tokens = [
            wantTokenInfo.token0,
            wantTokenInfo.token1
        ]

        tokens.map(token => {
            let balance;
            fetchTokenBalance(token.address, web3.account, farmingMarket.network.name).then(result => {
                balance = result;
            }).catch(e => {
                balance = 0
            }).finally(async () => {
                const tokenInfo = await fetchTokenInformation(token.address, farmingMarket.network.name);

                setTokenList(prevState => {

                    let newitem = {
                        logo: tokenInfo.logo,
                        ...token,
                        balance: balance,
                        realDecimalBalance: function () {
                            let result = new BigNumber(balance).dividedBy(
                                new BigNumber(10).exponentiatedBy(token.decimals || 18)
                            );
                            return result.toFixed(token.decimals || 18, 0);
                        }(),
                        viewableBalance: function () {
                            let result = new BigNumber(balance).dividedBy(
                                new BigNumber(10).exponentiatedBy(token.decimals || 18)
                            );
                            if (new BigNumber(0.000001).isGreaterThan(result)) {
                                return "< 0.000001";
                            } else if (new BigNumber(0).isLessThan(result)) {
                                return `~ ${result.toFixed(6, 0)}`;
                            } else {
                                return "0.0";
                            }
                        }()
                    };
                    prevState.push(newitem);
                    return [...prevState]
                })
            })
        });
    }

    useEffect(() => {
        async function fetchData() {
            if (wantTokenInfo !== null && web3.account != null) {
                updateAvailableTokenList();
            }
        }

        fetchData()
    }, []);

    useEffect(() => {
        setActiveToken(tokenList[0])
    }, [tokenList])

    const approve = async () => {
        try {
            setApproving(true);
            const response = await fullApprove(activeToken.address, beefyYeet.beefyYeetInAddress);
            response.wait(3).then((receipt) => {
                fetchAllowance();
            }).catch((err) => {
                swal({
                    text: err.message,
                    icon: "error"
                })
            }).finally(e => {
                setApproving(false);
            })
        } catch (ex) {
            swal({
                text: ex.message,
                icon: "error"
            })
            setApproving(false);
        }
    }


    const [allowed, setAllowed] = useState(false);
    const [approving, setApproving] = useState(false);

    useEffect(() => {
        setAllowed(false);
        fetchAllowance()
    }, [activeToken])


    async function fetchAllowance() {
        if (isValidChain() && activeToken != null && activeToken.address != null) {
            const allowance = await erc20.allowance(web3.account, activeToken.address, beefyYeet.beefyYeetInAddress)
            if (allowance > 0) {
                setAllowed(true);
            }
        }
    }

    function isValidChain() {
        return web3.hasAccount && web3.isOnCorrectChain(farmingMarket.network.chainId);
    }

    const fullApprove = async (erc20, spender) => {
        const contract = withContract(erc20, ERC20, web3.web3React)
        return await contract.approve(spender, MaxUint256);
    }

    return {
        yeet: yeet,
        approve: approve,
        allowed: allowed,
        approving: approving,
        setChosenAmount: setChosenAmount,
        chosenAmount: chosenAmount,
        activeToken: activeToken,
        setActiveToken: setActiveToken,
        tokenList: tokenList
    }
};