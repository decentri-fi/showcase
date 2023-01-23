import React, {useEffect, useState} from 'react';
import DollarLabel from "../../components/Label/DollarLabel";
import useTokenviewHooks from "./hooks/tokenview-hooks";
import FarmingOpportunities from "../../components/FarmingOpportunities/FarmingOpportunities";
import LendingOpportunities from "../../components/LendingOpportunities/LendingOpportunities";
import PoolingOpportunities from "../../components/PoolingOpportunities/PoolingOpportunities";
import FallbackImage from "../../components/Image/FallbackImage";
import {useParams} from "react-router-dom";
import tw from "twin.macro";
import ReactGA from "react-ga4";
import Navbar from "../../components/Navbar/Navbar";

const TokenLogo = tw.div`text-primary-300 w-3/12 text-center items-center grid justify-items-center`
const StatsContainer = tw.div`lg:w-2/3 w-full lg:grid lg:grid-cols-4 mt-4 gap-2`
const DefaultStat = tw.div`flex flex-nowrap shadow p-2`
const DoubleStat = tw(DefaultStat)`col-span-2`
const SingleStat = tw(DefaultStat)`col-span-1`
const StatLeft = tw.div`w-full flex flex-col`
const TokenInfo = tw.div`w-full flex flex-col`
const StatTitle = tw.span`text-gray-600`
const StatCenterText = tw.div`text-primary-300 font-bold text-4xl`
const StatDescription = tw.span`text-gray-400`
const StatLogo = tw.div`w-12 h-12`
const Center = tw.div`w-full grid justify-items-center`

const Wrapper = tw.div`flex grid justify-items-center flex-wrap lg:flex-nowrap pt-4`;
const NavbarWrapper = tw.div`lg:w-2/3`
const Green = tw.span`text-green-500`


const Bold = tw.b`text-black`

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
        <Center>
            <StatsContainer>
                <DoubleStat>
                    <TokenInfo>
                        <StatTitle>{token.symbol} on {network.slug}</StatTitle>
                        <StatCenterText>{token.name}</StatCenterText>
                        <StatDescription>{tokenDescription()}</StatDescription>
                    </TokenInfo>
                    <TokenLogo>
                        <StatLogo>
                            <FallbackImage src={token.logo}/>
                        </StatLogo>
                    </TokenLogo>
                </DoubleStat>

                <SingleStat>
                    <StatLeft>
                        <StatTitle>Token Value</StatTitle>
                        <StatCenterText><DollarLabel amount={token.dollarValue}/></StatCenterText>
                        <StatDescription>(Approximate value for <Green>{token.symbol}</Green>).</StatDescription>
                    </StatLeft>

                </SingleStat>
                {userBalance !== null &&
                    <>
                        <SingleStat>
                            <StatLeft>
                                <StatTitle>Your Balance</StatTitle>
                                <StatCenterText>
                                    <DollarLabel amount={getUserDollarBalance()}/>
                                </StatCenterText>
                                <StatDescription>Your wallet contains <Bold>{getUserTokenBalance()}</Bold> <Green>{token.symbol}</Green>.</StatDescription>
                            </StatLeft>
                        </SingleStat>
                    </>
                }
            </StatsContainer>

        </Center>
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
        tabs,
        userBalance,
        token,
        poolingOpportunities,
        farmingOpportunities,
        lendingOpportunities,
        network,
    } = tokenViewHooks;

    const poolingOpportunitiesTitle = () => {
        if (token.type === 'SINGLE') {
            return 'Pooling Opportunities'
        } else {
            return 'Alternative Pooling Opportunities'
        }
    }

    function LendingTab() {
        if (tabs.find(element => element.id === 'Lending' && element.selected === true)) {
            return <>
                {
                    (lendingOpportunities.length > 0) &&
                    <LendingOpportunities
                        lendingOpportunities={lendingOpportunities}></LendingOpportunities>
                }
            </>;
        } else {
            return <></>
        }
    }

    function PoolingTab() {
        if (tabs.find(element => element.id === 'Pooling' && element.selected === true)) {
            return <>
                {
                    (poolingOpportunities.length > 0) &&
                    <PoolingOpportunities
                        title={poolingOpportunitiesTitle()}
                        poolingOpportunities={poolingOpportunities}></PoolingOpportunities>
                }
            </>;
        } else {
            return <></>
        }
    }

    function FarmingTab() {
        if (tabs.find(element => element.id === 'Farming' && element.selected === true)) {
            return (
                <>
                    {
                        (farmingOpportunities.length > 0) &&
                        <FarmingOpportunities
                            farmingOpportunities={farmingOpportunities}></FarmingOpportunities>
                    }
                </>
            )
        } else {
            return <></>
        }
    }




    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, [])


    const detail = function () {
        if (token == null) {
            return <></>
        } else {
            return (
                <>
                    <TokenStats network={network} token={token} userBalance={userBalance}/>

                    <Wrapper>
                        <NavbarWrapper>
                            <Navbar items={
                                tabs
                            }/>
                        </NavbarWrapper>
                    </Wrapper>

                    <FarmingTab />
                    <PoolingTab />
                    <LendingTab />
                </>
            );
        }
    }();

    if (token !== null) {
        return <>
            <div>
                {detail}
            </div>
        </>;
    } else {
        return (
            <></>
        )
    }
};