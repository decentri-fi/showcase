import React from 'react';
import NumberFormat from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import FallbackImage from "../../../../components/Image/FallbackImage";
import Toggle from "../../../../components/Toggle/Toggle";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";

function BalanceRow({balance}) {

    const history = useHistory()

    return (
        <li onClick={() => {
            history.push(`/tokens/${balance.network.name}/${balance.token.address}`)
        }} tw="flex flex-row ">
            <div tw="select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b">
                <div tw="flex flex-col lg:w-1/12 w-1/5 justify-center items-center mx-4 lg:block">
                    <a href="#" tw="block relative">
                        <div tw="flex flex-nowrap">
                            <div tw="h-5 w-5 lg:h-8 lg:w-8">
                                <FallbackImage src={balance.token.logo}/>
                            </div>
                            <div tw="lg:h-4 lg:w-4 h-2 w-2 -mx-2 ">
                                <FallbackImage src={balance.network.logo}/>
                            </div>
                        </div>
                    </a>
                </div>
                <div tw="pl-1 w-1/4 flex-1">
                    <div tw="font-medium text-blue-600 dark:text-gray-200 text-xs">
                        {balance.token.name}
                    </div>
                </div>
                <div tw="text-sm text-left text-gray-600 dark:text-gray-200 w-1/2 lg:w-1/3">
                    <div tw="flex flex-col">
                        <div tw="grid grid-cols-2">
                                <span tw="text-gray-600 text-sm">
                             <NumberFormat
                                 value={balance.amount} displayType={'text'} decimalScale={4} thousandSeparator={true}/>
                            </span>
                            <DollarLabel amount={balance.price}/>
                        </div>
                    </div>
                </div>
                <div tw="text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5 justify-items-end grid">
                    <div tw="flex flex-col grid justify-items-end">
                        <div tw="font-bold text-sm">
                            <DollarLabel amount={balance.dollarValue}/>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

function BalanceList({balances}) {

    return (
        <div
            tw="flex flex-col w-full mx-auto items-center justify-center bg-white">
            <ul tw="flex flex-col w-full ">
                {
                    balances.map((balance, idx) => {
                        return <BalanceRow key={idx} balance={balance}/>
                    })
                }
            </ul>
        </div>
    )
}

export default function BalanceDetails({dashboardHooks}) {

    if (dashboardHooks.balanceElements.length === 0) {
        return (
            <></>
        )
    } else {
        return (
            <div tw="grid w-full justify-items-center mb-4">
                <div tw="w-full lg:w-1/2  bg-white py-4">
                    <div tw="flex items-center mb-2 ">
                        <h3 tw="text-sm font-medium mb-2 bg-gray-600 rounded-r p-1 text-white">Wallet Overview (<DollarLabel
                            amount={dashboardHooks.totalWalletBalance}/>)</h3>
                    </div>
                    <div tw="w-full px-4">
                        <BalanceList balances={dashboardHooks.balanceElements}/>
                    </div>
                </div>
            </div>
        );
    }
};