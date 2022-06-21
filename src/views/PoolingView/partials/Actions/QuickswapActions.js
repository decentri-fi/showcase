import React from 'react';
import FallbackImage from "../../../../components/Image/FallbackImage";
import useQuickswapActions from "./hooks/useQuickswapActions";
import tw from 'twin.macro';
import {Button} from "@mui/material";

export default function QuickswapActions({poolingMarket, chosenToken}) {
    const quickswapActions = useQuickswapActions(poolingMarket, chosenToken);

    const yeetButton = (
        <Button onClick={quickswapActions.yeet} variant={"contained"}>
            YEET
        </Button>
    )

    const activeButton = () => {
        if (quickswapActions.allowed) {
            return yeetButton;
        } else {
            return approveButton;
        }
    }

    const approveButton = (
        <Button variant={"contained"} onClick={quickswapActions.approve}>
            APPROVE
        </Button>
    )

    return (
        <div tw="flex grid justify-items-center w-full mb-10">
            <div
                tw="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div tw="grid justify-items-end">
                    <a href="#" tw="text-xs text-gray-500" onClick={e =>{
                        quickswapActions.changeAmount(quickswapActions.token.realDecimalBalance);
                    }}>Balance: {quickswapActions.token.viewableBalance}</a>
                </div>
                <div tw="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                    Yeet token into LP
                </div>
                <div tw="grid justify-items-center  ">
                    <div tw="flex w-full items-center">
                        <div tw="w-12 flex-shrink-0 mr-2 sm:mr-3">
                            <FallbackImage  src={quickswapActions.token.logo}/>
                        </div>
                        <div tw="text-gray-800">{quickswapActions.token.name}</div>
                        <div tw="flex">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"
                                  height="1.1em" width="1.1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M128 192l128 128 128-128z"></path>
                            </svg>
                        </div>
                    </div>

                </div>
                <div tw="mt-8">
                    <form action="#" autoComplete="off">
                        <div tw="flex flex-col mb-2">
                            <div tw="flex relative ">
                    <span
                        tw="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        {quickswapActions.token.symbol}
                    </span>
                                <input value={quickswapActions.chosenAmount} onChange={e => {
                                    quickswapActions.changeAmount(e.target.value);
                                }} type="text" id="amount"
                                       tw=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                       placeholder="0.0"/>
                            </div>
                        </div>
                        <div tw="flex w-full grid justify-items-center mt-4">
                            {activeButton()}
                        </div>
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
    )
}