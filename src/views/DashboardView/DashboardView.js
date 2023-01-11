import React from "react";
import DashboardHeader from "./partials/DashboardHeader";
import AccountBreakdown from "./partials/OverviewDetails";
import BalanceDetails from "./partials/BalanceDetails";

import tw from 'twin.macro';
import ClaimableDetails from "./partials/ClaimableDetails";
import Navbar from "../../components/Navbar/Navbar";
import DefiPositions from "./partials/DefiPositions";
import {useHistory} from "react-router-dom";

const Container = tw.div`flex`
const DashboardWrapper = tw.div`w-full`
const HorizontalCenter = tw.div`pl-1 flex items-center w-full`
const HideSmallValueFilter = tw.p`text-xs`

const Full = tw.div`flex flex-wrap w-full`;
const Column = tw.div`w-full lg:w-1/2 px-4`

const CenterText = tw.div`text-center w-full`
const Center = tw.div`w-full flex grid justify-items-center mt-3 mb-1`

export default function DashboardView({dashboardHooks}) {

    const history = useHistory();

    function showSmallValues() {
        dashboardHooks.setHideSmallValues(false);
    }

    function hideSmallValues() {
        dashboardHooks.setHideSmallValues(true);
    }


    return <Container>
        <DashboardWrapper>
            <Center>
                <Navbar items={
                    [
                        {
                            name: "Profile",
                            selected: true,
                            url: '#'
                        },
                        {
                            name: "Claimables",
                            selected: false,
                            url: '/claimables',
                            onClick: () => {
                                history.push('/claimables');
                            }
                        }
                    ]
                }/>
            </Center>

            <DashboardHeader dashboardHooks={dashboardHooks}/>

            <Full>
                <Column>
                    <ClaimableDetails dashboardHooks={dashboardHooks}/>
                    <BalanceDetails dashboardHooks={dashboardHooks}/>

                    <HorizontalCenter>
                        <CenterText>
                            {
                                dashboardHooks.hideSmallValues &&
                                <HideSmallValueFilter>Positions with small deposits are not displayed (&lt;$0.01). <u><a
                                    onClick={showSmallValues}>show
                                    everything</a></u></HideSmallValueFilter>
                            }

                            {
                                !dashboardHooks.hideSmallValues &&
                                <HideSmallValueFilter>Positions with small deposits are included (&lt;$0.01). <u><a
                                    onClick={hideSmallValues}>hide
                                    small values</a></u></HideSmallValueFilter>
                            }
                        </CenterText>
                    </HorizontalCenter>
                </Column>
                <Column>
                    <AccountBreakdown dashboardHooks={dashboardHooks}/>
                    <DefiPositions dashboardHooks={dashboardHooks}/>
                </Column>

            </Full>
        </DashboardWrapper>
    </Container>;
}

