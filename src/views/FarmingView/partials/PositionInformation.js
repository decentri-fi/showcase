import React from 'react';
import DollarLabel from "../../../components/Label/DollarLabel";
import FallbackImage from "../../../components/Image/FallbackImage";
import tw from "twin.macro"
import {Step, StepLabel, Stepper} from "@mui/material";

const StatTitle = tw.span`text-gray-600`
const StatDescription = tw.span`text-gray-400`

function FarmingMarketInfo({farmingElement}) {

    return (
        <div tw="w-full flex flex-nowrap shadow p-2">
            <div tw="w-9/12 flex flex-col">
                <StatTitle>{farmingElement.name} on {farmingElement.network.name}</StatTitle>
                <div tw="text-primary-300 font-bold text-4xl">{farmingElement.name}</div>
                <StatDescription>{farmingElement.name} has a market size of <span tw="text-green-500">
                    <DollarLabel
                        amount={farmingElement.marketSize}/>
                </span></StatDescription>
            </div>
            <div tw="text-primary-300 w-3/12 text-center items-center grid justify-items-center">
                <div tw="w-12 h-12">
                    <FallbackImage src={farmingElement.protocol.logo}/>
                </div>
            </div>
        </div>
    );
}

function BalanceInformation({
                                farmingViewHooks,
                                farmingElement,
                            }) {

    function getPercentage() {
        if (farmingViewHooks.staking !== null) {
            let stakingAmount = farmingViewHooks.staking.stakedToken.amount;
            return (stakingAmount * 100 / (stakingAmount + farmingViewHooks.wantBalance));
        } else {
            return 0;
        }
    }

    function getWalletDollarBalance() {
        return farmingViewHooks.wantPrice
    }

    function getStakingDollarBalance() {
        if (farmingViewHooks.staking !== null) {
            return farmingViewHooks.staking.dollarValue;
        }
        return 0
    }

    const FarmStats = tw.div`flex grid gap-2 grid-cols-3 w-full mb-4 mt-4`

    return (
        <FarmStats>
            <div tw="w-full flex flex-nowrap shadow p-2">
                <div tw="w-9/12 flex flex-col">
                    <StatTitle>Wallet Balance</StatTitle>
                    <div tw="text-primary-300 font-bold text-4xl">{farmingViewHooks.getWantBalance()}</div>
                    <StatDescription>That's around <span tw="text-green-500 font-medium"><DollarLabel
                        amount={getWalletDollarBalance()}/> </span> in {farmingElement.stakedToken.symbol}
                    </StatDescription>
                </div>
                <div tw="text-primary-300 w-3/12 text-center items-center grid justify-items-center">
                    <div tw="w-12 h-12">
                        <FallbackImage src={farmingElement.protocol.logo}/>
                    </div>
                </div>
            </div>

            <div tw="w-full flex flex-nowrap shadow p-2">
                <div tw="w-9/12 flex flex-col">
                    <StatTitle>Farming Balance</StatTitle>
                    <div tw="text-primary-300 font-bold text-4xl">{farmingViewHooks.getWantBalance()}</div>
                    <StatDescription>That's around <span tw="text-green-500 font-medium"><DollarLabel
                        amount={getStakingDollarBalance()}/> </span> in {farmingElement.stakedToken.symbol}
                    </StatDescription>
                </div>
                <div tw="text-primary-300 w-3/12 text-center items-center grid justify-items-center">
                    <div tw="w-12 h-12">
                        <FallbackImage src={farmingElement.protocol.logo}/>
                    </div>
                </div>
            </div>


            <div tw="w-full flex flex-nowrap shadow p-2">
                <div tw="w-9/12 flex flex-col">
                    <StatTitle>Staking Power</StatTitle>
                    <div tw="text-primary-300 font-bold text-4xl">{getPercentage()}%</div>
                    <StatDescription>
                        <div
                            tw="text-blue-300">{farmingViewHooks.getWantBalance()} {farmingElement.stakedToken.symbol} left
                        </div>
                    </StatDescription>
                </div>
                <div tw="text-primary-300 w-3/12 text-center items-center grid justify-items-center">
                    <div tw="w-12 h-12">
                        <FallbackImage src={farmingElement.protocol.logo}/>
                    </div>
                </div>
            </div>
        </FarmStats>
    )
}

export default function PositionInformation({farmingElement, farmingViewHooks}) {
    const Center = tw.div`w-full grid justify-items-center mt-4`

    return (
        <Center>
            <FarmingMarketInfo farmingElement={farmingElement}/>
            <BalanceInformation
                farmingViewHooks={farmingViewHooks}
                farmingElement={farmingElement}/>
        </Center>
    );
};