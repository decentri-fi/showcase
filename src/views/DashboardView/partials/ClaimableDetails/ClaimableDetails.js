import React from 'react';
import DollarLabel from "../../../../components/Label/DollarLabel";
import tw from "twin.macro";
import AssetTable from "../../../../components/AssetTable/AssetTable";
import {Subheading} from "../../../../components/misc/Headings";
import SadWhalePic from "../../../../images/sad_whale.png";
import ClaimButton from "./ClaimButton";

const Container = tw.div`w-full items-center grid`
const Header = tw.div`w-full flex text-lg font-medium mb-2 grid justify-items-center`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-green-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`

const PullRight = tw.div`flex flex-col grid justify-items-end`

const Center = tw.div`grid w-full justify-items-center mb-4 border p-4 rounded-lg`
const Section = tw.div`w-full bg-white`
const Hidden = tw.span`hidden lg:block`

const Hero = tw.div`justify-self-center bg-gray-100 w-full border p-4 mb-4 text-center w-full`
const CenterImage = tw.div`w-full flex justify-center my-2`
const SadWhaleImage = tw.img`w-10 h-10`
const HeroDescription = tw.p`text-purple-400 text-lg`


export default function ClaimableDetails({dashboardHooks, showPlaceholder = false, showNothingFoundMessage = false}) {
    const claimables = dashboardHooks.claimables;

    if (claimables.length === 0 && !dashboardHooks.claimableLoading) {
        if (showNothingFoundMessage) {
            return <>
                <Container>
                    <Hero>
                        <Header>We couldn't find any <Subheading>Claimables</Subheading></Header>
                        <CenterImage>
                            <SadWhaleImage src={SadWhalePic}/>
                        </CenterImage>
                        <HeroDescription>Unfortunately, we couldn't locate any claimables for this
                            account.</HeroDescription>
                    </Hero>
                </Container>
            </>
        } else {
            return <></>
        }
    } else {
        if (claimables.length === 0) {
            return <></>
        } else {
            const assetEntries = claimables.map(element => {
                return {
                    symbol: element.token.symbol,
                    detailUrl: `#`,
                    name: element.name,
                    amount: element.amount,
                    apr: element.apr,
                    logo: element.protocol.logo,
                    networkLogo: element.network.logo,
                    dollarValue: element.dollarValue,
                    actionButton: (
                        <ClaimButton refreshClaimables={dashboardHooks.refreshClaimables} claimable={element}/>
                    )
                }
            });


            return (
                <Center>
                    <Section>
                        <Container>
                            <AssetTable
                                showPlaceholder={showPlaceholder}
                                entries={assetEntries}
                                header={
                                    <Header>
                                        <HeaderTextContainer>
                                            <HeaderText>CLAIMABLE</HeaderText>
                                        </HeaderTextContainer>
                                        <BalanceText>
                                            <Hidden>
                                                <PullRight>
                                                    <HeaderText>
                                                        <DollarLabel
                                                            amount={dashboardHooks.totalClaimables}/>
                                                    </HeaderText>
                                                </PullRight>
                                            </Hidden>
                                        </BalanceText>
                                    </Header>
                                }
                            />
                        </Container>
                    </Section>
                </Center>
            );
        }
    }
};