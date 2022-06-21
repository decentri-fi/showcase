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

export default function DashboardView({dashboardHooks}) {

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    const sections = dashboardHooks.usedProtocols.map((proto, index) => {
        return (
            <div tw="w-full lg:w-1/2 grid justify-items-start mb-6 rounded py-4" key={index}>

                <div tw="flex text-sm flex-row mb-2">
                    <img alt="logo" src={proto.logo} tw="h-6 w-6 mr-2"/>
                    <h3>{proto.name} (<DollarLabel amount={proto.totalDollarValue} />)</h3>
                </div>

                <div tw="w-full bg-white">
                    <StakingDetails protocol={proto} dashboardHooks={dashboardHooks}/>
                    <PoolingDetails protocol={proto} dashboardHooks={dashboardHooks}/>
                    <LendingDetails protocol={proto} dashboardHooks={dashboardHooks}/>
                    <BorrowingDetails protocol={proto} dashboardHooks={dashboardHooks}/>
                </div>
            </div>
        )
    })


    return <Container>
        <div tw="grid justify-items-center">
            <div tw="w-full lg:w-1/2">
                <Search dashboardHooks={dashboardHooks}/>

                <div tw="flex flex-wrap">
                    <DashboardHeader dashboardHooks={dashboardHooks}/>
                    <OverviewDetails dashboardHooks={dashboardHooks}/>
                </div>
            </div>

            <ClaimableDetails dashboardHooks={dashboardHooks}
                              claimables={dashboardHooks.claimables}/>
            <BalanceDetails dashboardHooks={dashboardHooks}/>

            {sections}
        </div>
    </Container>;
}

