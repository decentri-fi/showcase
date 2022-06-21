import React, {useEffect} from 'react';
import DollarLabel from "../../components/Label/DollarLabel";
import useTokenviewHooks from "./hooks/tokenview-hooks";
import FarmingOpportunities from "./partials/FarmingOpportunities";
import LendingOpportunities from "./partials/LendingOpportunities";
import PoolingOpportunities from "../../components/PoolingOpportunities/PoolingOpportunities";
import FallbackImage from "../../components/Image/FallbackImage";
import {useParams} from "react-router-dom";
import tw from "twin.macro";
import {CurrencyDollarIcon} from "@heroicons/react/solid";
import ReactGA from "react-ga";

const StatsContainer = tw.div`w-full lg:grid lg:grid-cols-4 mt-4 gap-2`
const DefaultStat = tw.div`flex flex-nowrap shadow p-2`
const DoubleStat = tw(DefaultStat)`col-span-2`
const SingleStat = tw(DefaultStat)`col-span-1`
const StatLeft = tw.div`w-9/12 flex flex-col`
const StatRight = tw.div`text-primary-300 w-3/12 text-center items-center grid justify-items-center`
const StatTitle = tw.span`text-gray-600`
const StatCenterText = tw.div`text-primary-300 font-bold text-4xl`
const StatDescription = tw.span`text-gray-400`
const StatLogo = tw.div`w-12 h-12`

function TokenStats({token, userBalance, network}) {

    function getUserDollarBalance() {
        return (
            userBalance * token.dollarValue
        )
    }

    function getUserTokenBalance() {
        return (
            userBalance
        )
    }

    const tokenDescription = () => {
        if (token !== null && token.type === 'SINGLE') {
            return 'This is a normal ERC20 token that can be traded anywhere.'
        } else {
            return `This is a liquidity pool token, consisting of ${token.token0.name} & ${token.token1.name}`
        }
    }

    return (
        <StatsContainer>
            <DoubleStat>
                <StatLeft>
                    <StatTitle>{token.symbol} on {network.slug}</StatTitle>
                    <StatCenterText>{token.name}</StatCenterText>
                    <StatDescription>{tokenDescription()}</StatDescription>
                </StatLeft>
                <StatRight>
                    <StatLogo>
                        <FallbackImage src={token.logo}/>
                    </StatLogo>
                </StatRight>
            </DoubleStat>

            <SingleStat>
                <StatLeft>
                    <StatTitle>Token Value</StatTitle>
                    <StatCenterText><DollarLabel amount={token.dollarValue}/></StatCenterText>
                    <StatDescription>(Approximate value for {token.symbol}).</StatDescription>
                </StatLeft>
                <StatRight>
                    <div tw="text-blue-600 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             tw="inline-block w-8 h-8 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                </StatRight>
            </SingleStat>
            {userBalance !== null &&
            <>
                <SingleStat>
                    <StatLeft>
                        <StatTitle>Token Balance</StatTitle>
                        <StatCenterText>
                            <DollarLabel amount={getUserDollarBalance()}/>
                        </StatCenterText>
                        <StatDescription>Your wallet contains <b tw="text-black">{getUserTokenBalance()}</b> <span tw="text-green-500">{token.symbol}</span>.</StatDescription>
                    </StatLeft>
                    <StatRight>
                        <div tw="text-blue-600 ">
                            <CurrencyDollarIcon tw="h-12" />
                        </div>
                    </StatRight>
                </SingleStat>
            </>
            }
        </StatsContainer>
    )

}

export default function TokenView() {
    const params = useParams();
    const networkName = params.network;
    const tokenAddress = params.token;

    const tokenViewHooks = useTokenviewHooks(
        networkName, tokenAddress
    );

    const {
        userBalance,
        token,
        poolingOpportunities,
        network,
    } = tokenViewHooks;

    const poolingOpportunitiesTitle = () => {
        if (token.type === 'SINGLE') {
            return 'Pooling Opportunities'
        } else {
            return 'Alternative Pooling Opportunities'
        }
    }

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])


    const detail = function () {
        if (token == null) {
            return <></>
        } else {
            return (
                <>
                    <TokenStats network={network} token={token} userBalance={userBalance}/>
                    <FarmingOpportunities token={token}
                                          network={network}/>

                    <PoolingOpportunities poolingOpportunities={poolingOpportunities}
                                          title={poolingOpportunitiesTitle()}/>
                    {
                        token.type === 'SINGLE' &&
                        <LendingOpportunities token={token} network={network}/>
                    }
                </>
            );
        }
    }();

    if (token !== null) {
        return <>
            <div tw="lg:mx-64">
                {detail}
            </div>
        </>;
    } else {
        return (
            <></>
        )
    }
};