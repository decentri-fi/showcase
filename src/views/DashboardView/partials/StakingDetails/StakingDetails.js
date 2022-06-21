import React from "react";
import NumberFormat from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import Toggle from "../../../../components/Toggle/Toggle";
import APYLabel from "../../../../components/Label/APYLabel";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
import FallbackImage from "../../../../components/Image/FallbackImage";

function StakingList({stakings}) {
    return <div tw="mx-4">
        <div
            tw="flex flex-col w-full mx-auto items-center justify-center bg-white dark:bg-gray-800">
            <ul tw="flex flex-col w-full ">
                {
                    stakings.map((staking) => {
                        return (
                            <StakingEntry key={Math.random().toString(36).substring(7)} staking={staking}/>
                        )
                    })
                }
            </ul>
        </div>
    </div>
}

export default function StakingDetails({protocol, dashboardHooks}) {

    const elements = dashboardHooks.stakings.filter(staking => {
        return staking.protocol.slug === protocol.slug
    })


    if (elements.length === 0) {
        return (
            <>
            </>
        );
    }

    return (
        <div tw="w-full my-4">
                <div tw="w-full flex items-center mb-2">
                    <h3 tw="text-sm font-medium mb-2 bg-gray-600 rounded-r p-1 text-white">Farming Overview (<DollarLabel
                        amount={dashboardHooks.totalStakingForProtocol(protocol)}/>)</h3>
                </div>
                <StakingList stakings={elements}/>
        </div>
    );
}

function StakingEntry({staking}) {

    const history = useHistory();
    return (
        <li onClick={() => {
            history.push(`/staking/${staking.network.name}/${staking.protocol.slug}/${staking.id}`)
        }} tw="flex flex-row hover:bg-indigo-100">
            <div tw="select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b">
                <div
                    tw="flex flex-col lg:w-1/12 w-1/5 justify-center items-center mx-4 lg:block">
                    <a href="#" tw="block relative">
                        <div tw="flex flex-nowrap">
                            <div tw="h-5 w-5 lg:h-8 lg:w-8">
                                <FallbackImage src={staking.protocol.logo}/>
                            </div>
                            <div tw="lg:h-4 lg:w-4 h-2 w-2 -mx-2 ">
                                <FallbackImage src={staking.network.logo}/>
                            </div>
                        </div>
                    </a>
                </div>
                <div tw="flex-1 pl-1 mr-16 w-1/3 lg:w-2/5">
                    <div tw="text-indigo-600 text-xs">
                        {staking.name}
                    </div>
                </div>
                <div tw="text-sm text-left text-gray-600 dark:text-gray-200 w-1/4 lg:w-1/5">
                    <div tw="flex flex-col">
                        <div tw="grid grid-cols-3">
                            <span tw="text-gray-600 text-sm">
                                      <NumberFormat
                                          value={staking.amount} displayType={'text'} decimalScale={4}
                                          thousandSeparator={true}/>
                            </span>
                            <span tw="col-span-2 text-green-500 font-thin"> {staking.stakedToken.symbol}</span>
                        </div>
                        <div>
                            {staking.apr && <div>
                                <span tw="font-medium"><APYLabel amount={staking.apr}/></span>
                                <span>% APR</span>
                            </div>}
                        </div>
                    </div>
                </div>
                <div tw="text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5 grid justify-items-end">
                    <div tw="font-bold text-sm">
                        <DollarLabel amount={staking.dollarValue}/>
                    </div>
                </div>
            </div>
        </li>
    )
}