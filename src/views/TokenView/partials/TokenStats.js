import FallbackImage from "../../../components/Image/FallbackImage";
import DollarLabel from "../../../components/Label/DollarLabel";
import tw from "twin.macro";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchHistoricalData} from "../../../hooks/useCoinGecko";

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
const TokenLogo = tw.div`text-primary-300 w-3/12 text-center items-center grid justify-items-center`
const StatsContainer = tw.div`lg:w-2/3 w-full lg:grid lg:grid-cols-4 mt-4 gap-2`


const Green = tw.span`text-green-500`
const Bold = tw.b`text-black`

const ChartBackground = tw.div`w-2/3 bg-gray-900 rounded-lg p-4`
const ChartTitle = tw.div`text-white font-display text-lg p-4`

const TitleContainer = tw.div`w-2/3 text-2xl font-display text-gray-900 mt-4`

export default function TokenStats({token, userBalance, network}) {

    const userDollarBalance = userBalance * token.dollarValue

    const tokenDescription = () => {
        if (token !== null && token.type === 'SINGLE') {
            return 'This is a normal ERC20 token that can be traded anywhere.'
        } else {
            const underlying = token.underlyingTokens.map((u) => {
                return u.symbol
            }).join(', ')
            return `This is a liquidity pool token, consisting of: ${underlying}`
        }
    }

    const dataQuery = useQuery({
        queryKey: ['token', token.address, 'historical-data'],
        queryFn: async () => {
            return await fetchHistoricalData(token.address, token.network.slug);
        },
        enabled: !!token
    })

    const data = dataQuery.data?.prices.map((price) => {
        return {
            date: price[0],
            price: price[1]
        }
    })

    return (
        <Center>
            <StatsContainer>
                <DoubleStat>
                    <TokenInfo>
                        <StatTitle>{token.symbol} on {network.toLowerCase()}</StatTitle>
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
                                    <DollarLabel amount={userDollarBalance}/>
                                </StatCenterText>
                                <StatDescription>Your wallet contains <Bold>{userBalance}</Bold>
                                    <Green> {token.symbol}</Green>.</StatDescription>
                            </StatLeft>
                        </SingleStat>
                    </>
                }


            </StatsContainer>

            {
                data &&
                <>
                    <TitleContainer>
                        Overview
                    </TitleContainer>
                    <ChartBackground>
                        <ChartTitle>{token.name}</ChartTitle>
                        <ResponsiveContainer width={"100%"} height={300}>
                            <LineChart data={data}>
                                <Line dot={false} strokeWidth={3} dataKey="price" stroke="#A020F0"></Line>
                                <XAxis hide={true} dataKey={'date"'}/>
                                <YAxis hide={true} domain={['dataMin', 'dataMax']}/>
                                <Tooltip/>
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartBackground>
                </>
            }
        </Center>
    )

}