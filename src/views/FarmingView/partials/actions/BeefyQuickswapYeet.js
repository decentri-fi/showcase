import React from "react";
import TokenSelect from "../../../../components/Select/TokenSelect";
import useBeefyQuickswapYeet from "./hooks/useBeefyQuickswapYeet";
import {Button} from "@mui/material";
import tw from 'twin.macro';

export default function BeefyQuickswapYeet({tokenInfo, farmingElement}) {

    const {
        yeet, approve, allowed, setChosenAmount, chosenAmount, activeToken, setActiveToken, tokenList
    } = useBeefyQuickswapYeet(tokenInfo, farmingElement);

    const yeetButton = (
        <Button variant={"contained"} onClick={e => {
            yeet();
        }} type="button">
            YEET
        </Button>
    )

    const activeButton = () => {
        if (allowed) {
            return yeetButton;
        } else {
            return approveButton;
        }
    }


    const approveButton = (
        <Button  onClick={approve} variant={"contained"}>
            APPROVE
        </Button>
    )

    const changeAmount = (value) => {
        setChosenAmount(value)
    }

    const balanceLabel = function () {
        if (activeToken != null) {
            return <div tw="grid justify-items-end">
                <a href="#" tw="text-xs text-gray-500" onClick={e => {
                    e.preventDefault();
                    changeAmount(activeToken.realDecimalBalance);
                }}>Balance: {activeToken.viewableBalance}</a>
            </div>
        } else {
            return <></>
        }
    }();

    if (activeToken == null) {
        return <></>
    } else {
        return (
            <>
                <div tw="flex grid justify-items-center w-full mb-10">
                    <div
                        tw="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                        {balanceLabel}
                        <div tw="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                            Yeet token into LP
                        </div>
                        <div tw="grid justify-items-center  ">
                            <div tw="flex w-full items-center">
                                <TokenSelect tokenList={tokenList} activeToken={activeToken}
                                             setActiveToken={setActiveToken}/>
                            </div>
                        </div>
                        <div tw="mt-8">
                            <form action="#" autoComplete="off">
                                <div tw="flex flex-col mb-2">
                                    <div tw="flex relative ">
                    <span
                        tw="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        {activeToken.symbol}
                    </span>
                                        <input value={chosenAmount} onChange={e => {
                                            changeAmount(e.target.value);
                                        }} type="text" id="amount"
                                               tw=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                               placeholder="0.0"/>
                                    </div>
                                </div>
                                <div tw="flex w-full grid justify-items-center mt-4">{activeButton()}</div>
                            </form>
                        </div>
                        <div tw="flex items-center justify-center mt-6">
                            <a href="#" target="_blank"
                               tw="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
                    <span tw="ml-2">
                        Not sure what this is?
                    </span>
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
