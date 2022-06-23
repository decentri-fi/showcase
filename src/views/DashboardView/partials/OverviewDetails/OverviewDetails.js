import React from "react";
import DollarLabel from "../../../../components/Label/DollarLabel";
import {CurrencyDollarIcon} from "@heroicons/react/outline";
import DetailCard from "../../../../components/Card/DetailCard"; //eslint-disable-line
import tw from 'twin.macro';

const Container = tw.div`w-full flex flex-wrap`
const Header = tw.h3`text-lg font-medium mb-2 px-4 `
const Table = tw.div`mb-8 flex flex-wrap grid grid-cols-2 lg:grid-cols-6`

const GreenDollarIcon = tw(CurrencyDollarIcon)`text-green-400 h-8 w-8`
const YellowDollarIcon = tw(CurrencyDollarIcon)`text-yellow-400 h-8 w-8`
const BlueDollarIcon = tw(CurrencyDollarIcon)`text-blue-400 h-8 w-8`
const OrangeDollarIcon = tw(CurrencyDollarIcon)`text-orange-400 h-8 w-8`
const RedDollarIcon = tw(CurrencyDollarIcon)`text-red-400 h-8 w-8`

const ProgressBar = tw.div`text-xs leading-none h-1 text-center text-white rounded`
const BlueProgressBar = tw(ProgressBar)`bg-blue-500`
const YellowProgressBar = tw(ProgressBar)`bg-yellow-500`
const GreenProgressBar = tw(ProgressBar)`bg-green-500`
const OrangeProgressBar = tw(ProgressBar)`bg-orange-500`

const Logo = tw.img`h-8 w-8`

function Protocols({dashboardHooks}) {
    return (
        <>
            {dashboardHooks.usedProtocols.map(protocol => {
                return <ProtocolElement dashboardHooks={dashboardHooks} protocol={protocol} key={protocol.name}/>
            })}
        </>
    )
}

function ProtocolElement({protocol}) {
    return (
        <DetailCard title={protocol.name}
                    centerHtml={<DollarLabel amount={protocol.totalDollarValue}/>}
                    icon={
                        <Logo alt="logo" src={protocol.logo}/>
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
            <Container>
                <Header>Account Overview</Header>
                <Table>
                    {totalWalletBalance > 0 &&
                        <DetailCard title="Wallet"
                                    centerHtml={<DollarLabel amount={totalWalletBalance}/>}
                                    bottomHtml={
                                        <GreenProgressBar
                                            style={{
                                                width: assetAllocation.balance + '%'
                                            }}>
                                        </GreenProgressBar>
                                    }
                                    icon={<GreenDollarIcon/>}
                        />
                    }
                    {totalLending > 0 &&
                        <DetailCard title="Lending"
                                    centerHtml={<DollarLabel amount={totalLending}/>}
                                    bottomHtml={
                                        <YellowProgressBar
                                            style={{
                                                width: assetAllocation.lending + '%'
                                            }}>
                                        </YellowProgressBar>
                                    }
                                    icon={<YellowDollarIcon/>}
                        />
                    }
                    {totalBorrowing > 0 && <DetailCard title="Borrowing"
                                                       centerHtml={<DollarLabel amount={totalBorrowing}/>}
                                                       icon={<RedDollarIcon/>}/>}
                    {totalPooling > 0 && <DetailCard title="Pooling"
                                                     icon={<OrangeDollarIcon/>}
                                                     centerHtml={<DollarLabel amount={totalPooling}/>}
                                                     bottomHtml={<OrangeProgressBar
                                                         style={{
                                                             width: assetAllocation.pooling + '%'
                                                         }}></OrangeProgressBar>}/>
                    }
                    {totalStaking > 0 &&
                        <DetailCard title="Farming"
                                    icon={<BlueDollarIcon/>}
                                    centerHtml={<DollarLabel amount={totalStaking}/>}
                                    bottomHtml={
                                        <BlueProgressBar
                                            style={{
                                                width: assetAllocation.staking + '%'
                                            }}>
                                        </BlueProgressBar>}
                        />}

                    <Protocols dashboardHooks={dashboardHooks}/>
                </Table>
            </Container>
        </>
    );
}
