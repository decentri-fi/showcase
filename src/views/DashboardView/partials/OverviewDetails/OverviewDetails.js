import React from "react";
import DollarLabel from "../../../../components/Label/DollarLabel";
import {CurrencyDollarIcon} from "@heroicons/react/outline";
import DetailCard from "../../../../components/Card/DetailCard"; //eslint-disable-line
import tw from 'twin.macro';
import PlaceholderLoading from "react-placeholder-loading";
import {Subheading} from "../../../../components/misc/Headings";
import SadWhalePic from "../../../../images/sad_whale.png";


const CenterImage = tw.div`w-full flex justify-center my-2`
const SadWhaleImage = tw.img`w-10 h-10`
const Container = tw.div`w-full mr-4 flex flex-wrap border p-4 rounded-lg mb-2`
const Header = tw.h3`text-lg font-medium mb-2  `
const Table = tw.div`w-full flex flex-wrap mb-2`

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

const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-green-600 rounded-r  text-white`

const Logo = tw.img`h-8 w-8`
const FullRow = tw.div`w-full`

const AccountOverviewWrapper = tw.div`mb-2`

function Protocols({dashboardHooks}) {

    const getElements = () => {
        if (dashboardHooks.usedProtocols.length > 0) {
            return dashboardHooks.usedProtocols.map(protocol => {
                return <ProtocolElement dashboardHooks={dashboardHooks} protocol={protocol} key={protocol.name}/>
            })
        } else if(dashboardHooks) {
            return <DummyCard/>
        }
    }

    return (
        <>
            {getElements()}
        </>
    )
}

function ProtocolElement({protocol}) {
    return (
        <FullRow>
            <DetailCard title={protocol.name}
                        centerHtml={<DollarLabel amount={protocol.totalDollarValue}/>}
                        icon={
                            <Logo alt="logo" src={protocol.logo}/>
                        }/>
        </FullRow>
    )
}

function DummyCard() {
    return (
        <FullRow>
            <DetailCard title={<PlaceholderLoading width={'100%'} height={20} shape={"rect"}/>}
                        icon={<PlaceholderLoading width={30} height={30} shape={"circle"}/>}
            />
        </FullRow>
    )
}

export default function OverviewDetails(
    {
        dashboardHooks
    }
) {


    return (
        <>
            <Container>
                <AccountOverview dashboardHooks={dashboardHooks} />
                <DefiOverview dashboardHooks={dashboardHooks}/>
            </Container>
        </>
    );
}

function AccountOverview({dashboardHooks}) {

    const {
        hasFinishedScanning,
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

    if (hasFinishedScanning && totalDollarValue() === 0) {
        return <></>
    }

    const assetAllocation = calculateAssetAllocation();
    return (
        <>
            <HeaderText>Account Breakdown</HeaderText>
            <Table>
                {totalWalletBalance > 0 &&
                    <FullRow>
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
                    </FullRow>
                }
                {
                    totalDollarValue() === 0 &&
                    <DummyCard/>
                }
                {totalLending > 0 &&
                    <FullRow>
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
                    </FullRow>
                }
                {totalBorrowing > 0 &&
                    <FullRow>
                        <DetailCard title="Borrowing"
                                    centerHtml={<DollarLabel amount={totalBorrowing}/>}
                                    icon={<RedDollarIcon/>}/>
                    </FullRow>
                }
                {totalPooling > 0 &&
                    <FullRow>
                        <DetailCard title="Pooling"
                                    icon={<OrangeDollarIcon/>}
                                    centerHtml={<DollarLabel amount={totalPooling}/>}
                                    bottomHtml={<OrangeProgressBar
                                        style={{
                                            width: assetAllocation.pooling + '%'
                                        }}></OrangeProgressBar>}/>
                    </FullRow>
                }
                {totalStaking > 0 &&
                    <FullRow>
                        <DetailCard title="Farming"
                                    icon={<BlueDollarIcon/>}
                                    centerHtml={<DollarLabel amount={totalStaking}/>}
                                    bottomHtml={
                                        <BlueProgressBar
                                            style={{
                                                width: assetAllocation.staking + '%'
                                            }}>
                                        </BlueProgressBar>}
                        />
                    </FullRow>
                }

            </Table>
        </>
    )
}

const Hero = tw.div`justify-self-center bg-gray-100 w-full border p-4 mb-4 text-center`
const HeroDescription = tw.p`text-gray-500 text-lg`

function DefiOverview({dashboardHooks}) {
    if (dashboardHooks.usedProtocols.length === 0 && dashboardHooks.hasFinishedScanning) {
        return <>
            <Container>
                <Hero>
                    <Header>We couldn't find any <Subheading>Active Defi Application</Subheading></Header>
                    <CenterImage>
                        <SadWhaleImage src={SadWhalePic} />
                    </CenterImage>
                    <HeroDescription>Unfortunately, we couldn't identify any participation in a defi application for this specific address. It might be a fresh account or simply not exist at all.</HeroDescription>
                </Hero>
            </Container>
        </>
    }

    return (
        <>
            <HeaderText>Defi Positions</HeaderText>
            <Table>
                <Protocols dashboardHooks={dashboardHooks}/>
            </Table>
        </>
    );
}
