import React from 'react';
import NumberFormat from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
import FallbackImage from "../../../../components/Image/FallbackImage";

function PoolingList({poolings}) {
    return (
        <div tw="mx-4">
            <div
                tw="flex flex-col w-full mx-auto items-center justify-center bg-white dark:bg-gray-800">
                <ul tw="flex flex-col w-full ">
                    {
                        poolings.map((pooling, i) => {
                            return (<PoolingEntry key={i} pooling={pooling}/>)
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

function PoolingEntry({pooling}) {
    const history = useHistory();

    return (
        <li onClick={() => {
            history.push(`/pooling/${pooling.network.name}/${pooling.protocol.slug}/${pooling.id}`)
        }} tw="flex flex-row hover:bg-indigo-100">
            <div tw="select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b">
                <div
                    tw="flex flex-col lg:w-1/12 w-1/5 justify-center items-center mx-4 lg:block">
                    <a href="#" tw="block relative">
                        <div tw="flex flex-nowrap">
                            <div tw="h-5 w-5 lg:h-8 lg:w-8">
                                <FallbackImage src={pooling.protocol.logo}/>
                            </div>
                            <div tw="lg:h-4 lg:w-4 h-2 w-2 -mx-2 ">
                                <FallbackImage src={pooling.network.logo}/>
                            </div>
                        </div>
                    </a>
                </div>
                <div tw="flex-1 pl-1 mr-16 w-1/3 lg:w-2/5">
                    <div tw="text-orange-600 text-xs overflow-auto">
                        {pooling.name}
                    </div>
                </div>
                <div tw="text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5">
                    <div tw="flex flex-col">
                        <div tw="grid grid-cols-3">
                        <span tw="text-gray-600 text-sm">
                              <NumberFormat
                                  value={pooling.amount} displayType={'text'} decimalScale={4}
                                  thousandSeparator={true}/>
                            </span>
                            <span tw="col-span-2 text-green-500 font-thin">{pooling.symbol}</span>
                        </div>
                    </div>
                </div>
                <div tw="text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5 grid justify-items-end">
                    <div tw="flex flex-col">
                        <div tw="font-bold text-sm">
                            <DollarLabel amount={pooling.dollarValue}/>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}


export default function PoolingDetails({protocol, dashboardHooks}) {


    const elements = dashboardHooks.lps.filter(pooling => {
        return pooling.protocol.slug === protocol.slug
    })


    if (elements.length === 0) {
        return (
            <>
            </>
        );
    } else {
        return (
            <div tw="w-full my-4">
                <div tw="w-full flex items-center mb-2">
                    <h3 tw="text-sm font-medium mb-2 bg-gray-600 rounded-r p-1 text-white">Pooling Overview (<DollarLabel
                        amount={dashboardHooks.totalStakingForProtocol(protocol)}/>)</h3>
                </div>
                <PoolingList poolings={elements}/>
            </div>
        );
    }
}