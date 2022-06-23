import React, {useEffect} from "react";
import ReactGA from "react-ga";
import DashboardHeader from "./partials/DashboardHeader";
import OverviewDetails from "./partials/OverviewDetails";
import ClaimableDetails from "./partials/ClaimableDetails";
import BalanceDetails from "./partials/BalanceDetails";
import StakingDetails from "./partials/StakingDetails";
import PoolingDetails from "./partials/PoolingDetails";
import LendingDetails from "./partials/LendingDetails";
import BorrowingDetails from "./partials/BorrowingDetails";

import tw from 'twin.macro';
import Search from "./partials/Search/Search";
import DollarLabel from "../../components/Label/DollarLabel";

const Container = tw.div`w-full pt-8 lg:pt-24 bg-defaultBackground`

const ProtocolSection = tw.section`w-full lg:w-1/2 grid justify-items-start mb-6 rounded py-4`
const ProtocolSectionHeader = tw.div`flex text-sm flex-row mb-2`;
const ProtocolSectionHeaderLogo = tw.img`h-6 w-6 mr-2`;
const ProtocolDetails = tw.div`w-full bg-white`

const DashboardWrapper = tw.div`grid justify-items-center`
const DashboardHeaderContainer = tw.div`w-full lg:w-1/2`
const FlexWrap = tw.div`flex flex-wrap`

export default function DashboardView({dashboardHooks}) {

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    const sections = dashboardHooks.usedProtocols.map((proto, index) => {
        return (
            <ProtocolSection key={index}>
                <ProtocolSectionHeader>
                    <ProtocolSectionHeaderLogo alt="logo" src={proto.logo}/>
                    <h3>{proto.name} (<DollarLabel amount={proto.totalDollarValue} />)</h3>
                </ProtocolSectionHeader>

                <ProtocolDetails>
                    <StakingDetails protocol={proto} dashboardHooks={dashboardHooks}/>
                    <PoolingDetails protocol={proto} dashboardHooks={dashboardHooks}/>
                    <LendingDetails protocol={proto} dashboardHooks={dashboardHooks}/>
                    <BorrowingDetails protocol={proto} dashboardHooks={dashboardHooks}/>
                </ProtocolDetails>
            </ProtocolSection>
        )
    })


    return <Container>
        <DashboardWrapper>
            <DashboardHeaderContainer>
                <Search dashboardHooks={dashboardHooks}/>

                <FlexWrap>
                    <DashboardHeader dashboardHooks={dashboardHooks}/>
                    <OverviewDetails dashboardHooks={dashboardHooks}/>
                </FlexWrap>
            </DashboardHeaderContainer>

            <ClaimableDetails dashboardHooks={dashboardHooks}
                              claimables={dashboardHooks.claimables}/>
            <BalanceDetails dashboardHooks={dashboardHooks}/>

            {sections}
        </DashboardWrapper>
    </Container>;
}

