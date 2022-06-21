import React from "react";
import DollarLabel from "../../../../components/Label/DollarLabel";
import {CurrencyDollarIcon} from "@heroicons/react/outline";
import DetailCard from "../../../../components/Card/DetailCard"; //eslint-disable-line
import tw from 'twin.macro';

function Networks({networks, dashboardHooks}) {
    const title = function () {
        if (networks.length === 0) {
            return (
                <p tw="text-gray-600 font-light dark:text-white text-xl text-center font-medium">
                    No networks were found for this address.
                </p>
            )
        } else {
            return (
                <p tw="text-gray-600 font-light dark:text-white text-xl text-center font-medium mb-6">
                    Active networks
                </p>
            )
        }
    }();

    return (
        <>
            {title}
            <div tw="grid grid-cols-3 gap-2">
                {networks.map(network => {
                    return <NetworkElement network={network} key={network.name}/>
                })}
            </div>
        </>
    )
}

function NetworkElement({network}) {
    return (
        <>
            <div tw="flex flex-col items-center">
                <div tw="relative">
                    <a onClick={() => {
                    }} href="#" tw="block relative">
                        <img alt="logo" src={network.logo}
                             tw="mx-auto object-cover rounded-full h-16 w-10 "/>
                    </a>
                </div>
            </div>
        </>
    )
}

function Protocols({dashboardHooks}) {
    return (
        <>
                { dashboardHooks.usedProtocols.map(protocol => {
                    return <ProtocolElement dashboardHooks={dashboardHooks} protocol={protocol} key={protocol.name}/>
                })}
        </>
    )
}

function ProtocolElement({protocol}) {
    return (
        <DetailCard title={protocol.name}
                    centerHtml={<DollarLabel amount={protocol.totalDollarValue} />}
                    icon={
                        <img alt="logo" src={protocol.logo} tw="h-8 w-8"/>
                    }/>
    )
}

export default function OverviewDetails(
    {
        dashboardHooks
    }
) {

    const {
        totalWalletBalance,
        totalLending,
        totalStaking,
        totalPooling,
        totalBorrowing,
    } = dashboardHooks

    function totalDollarValue() {
        return ((totalWalletBalance)
            + (totalLending)
            + (totalStaking) + (totalPooling)
        )
    }

    function calculateAssetAllocation() {
        const total = totalDollarValue();
        if (total === 0) {
            return {
                lending: 0,
                staking: 0,
                balance: 0,
                pooling: 0
            }
        }

        return {
            lending: (totalLending / total) * 100,
            staking: (totalStaking / total) * 100,
            pooling: (totalPooling / total) * 100,
            balance: ((totalWalletBalance) / total) * 100
        };
    }

    const assetAllocation = calculateAssetAllocation()

    return (
        <>
            <div tw="w-full flex flex-wrap">
                <div tw="w-full">
                    <h3 tw="text-lg font-medium mb-2 px-4 ">Account Overview</h3>
                    <div tw="mb-8 flex flex-wrap grid grid-cols-2 lg:grid-cols-6">
                        {totalWalletBalance > 0 &&
                            <DetailCard title="Wallet"
                                        centerHtml={ <DollarLabel amount={totalWalletBalance}/>}
                                        bottomHtml={
                                            <div tw="bg-green-300 text-xs leading-none h-1 text-center text-white rounded"
                                                 style={{
                                                     width: assetAllocation.balance + '%'
                                                 }}></div>
                                        }
                                        icon={<CurrencyDollarIcon tw="text-green-400 h-8 w-8"/>}
                            />
                        }
                        {totalLending > 0 &&
                        <DetailCard title="Lending"
                                    centerHtml={<DollarLabel amount={totalLending}/>}
                                    bottomHtml={
                                        <div tw="bg-yellow-600 text-xs leading-none h-1 text-center text-white rounded"
                                             style={{
                                                 width: assetAllocation.lending + '%'
                                             }}></div>
                                    }
                                    icon={<CurrencyDollarIcon tw="text-yellow-400 h-8 w-8"/>}
                        />
                        }
                        {totalBorrowing > 0 && <DetailCard title="Borrowing"
                                                           centerHtml={<DollarLabel amount={totalBorrowing}/>}
                                                           icon={<CurrencyDollarIcon tw="text-red-400 h-8 w-8"/>}/>}
                        {totalPooling > 0 && <DetailCard title="Pooling"
                                                         icon={<CurrencyDollarIcon tw="text-orange-400 h-8 w-8"/>}
                                                         centerHtml={<DollarLabel amount={totalPooling}/>}
                                                         bottomHtml={<div
                                                             tw="bg-orange-500 text-xs leading-none h-1 text-center text-white rounded"
                                                             style={{
                                                                 width: assetAllocation.pooling + '%'
                                                             }}></div>}/>
                        }
                        {totalStaking > 0 &&
                        <DetailCard title="Farming"
                                    icon={<CurrencyDollarIcon tw="text-blue-400 h-8 w-8"/>}
                                    centerHtml={<DollarLabel amount={totalStaking}/>}
                                    bottomHtml={<div
                                        tw="bg-blue-500 text-xs leading-none h-1 text-center text-white rounded"
                                        style={{
                                            width: assetAllocation.staking + '%'
                                        }}></div>}
                        />}

                        <Protocols dashboardHooks={dashboardHooks}/>
                    </div>
                </div>
            </div>
        </>
    );
}
