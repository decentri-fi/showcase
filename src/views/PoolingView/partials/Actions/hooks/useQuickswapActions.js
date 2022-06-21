import {useQuickswapLPYeet} from "../../../../../hooks/yeet/quickswap/UseQuickswapLPYeet";
import {useERC20} from "../../../../../hooks/erc20/useERC20";
import {useEffect, useState} from "react";
import BigNumber from "bignumber.js";
import {withContract} from "../../../../../hooks/withContract";
import ERC20 from "../../../../../constants/abis/erc20/ERC20.json";
import {MaxUint256} from "@ethersproject/constants";
import swal from "sweetalert";
import useContractExceptions from "../../../../../hooks/useContractExceptions";
import useWeb3 from "../../../../../hooks/web3";


export default function useQuickswapActions(poolingMarket, chosenToken) {

    const web3 = useWeb3();

    const quickswapYeet = useQuickswapLPYeet(web3.web3React);
    const erc20 = useERC20(web3.web3React);
    const contractExceptions = useContractExceptions();

    const token = chosenToken || poolingMarket.token[0]

    const [allowed, setAllowed] = useState(false);
    const [approving, setApproving] = useState(false);

    async function fetchAllowance() {
        if (isValidChain()) {
            const allowance = await erc20.allowance(web3.account, token.address, quickswapYeet.quickswapYeetInAddress)
            if (allowance > 0) {
                setAllowed(true);
            }
        }
    }

    useEffect(() => {
        async function fetchData() {
            setAllowed(false);
            if (isValidChain()) {
                fetchAllowance()
            }
        }

        fetchData();
    }, [chosenToken])

    function isValidChain() {
        return web3.hasAccount() && web3.isOnCorrectChain(poolingMarket.network.chainId);
    }

    const yeet = async (e) => {
        const amount = new BigNumber(chosenAmount);
        if (amount.lte(new BigNumber(0))) {
            swal({
                text: 'In order to successfully yeet, please use yeet more than 0',
                icon: "error"
            })
        } else {
            try {
                const result = await quickswapYeet.yeetIn(
                    token.address, poolingMarket.address, amount.multipliedBy(
                        new BigNumber(10).exponentiatedBy(token.decimals || 18)
                    ).toString()
                );
            } catch (e) {
                contractExceptions.handle(e);
            }
        }
    }

    const [chosenAmount, setChosenAmount] = useState(0);

    const changeAmount = (value) => {
        setChosenAmount(value)
    }

    const fullApprove = async (erc20, spender) => {
        const contract = withContract(erc20, ERC20, web3.web3React)
        return await contract.approve(spender, MaxUint256);
    }

    const approve = async () => {
        try {
            setApproving(true);
            const response = await fullApprove(token.address, quickswapYeet.quickswapYeetInAddress);
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

    return {
        yeet: yeet,
        approve: approve,
        approving: approving,
        allowed: allowed,
        token: token,
        changeAmount: changeAmount,
        chosenAmount: chosenAmount
    }
}