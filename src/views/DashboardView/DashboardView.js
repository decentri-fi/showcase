import React, {useEffect} from "react";
import DashboardHeader from "./partials/DashboardHeader";
import AccountBreakdown from "./partials/OverviewDetails";
import BalanceDetails from "./partials/BalanceDetails";

import tw from 'twin.macro';
import DefiPositions from "./partials/DefiPositions";
import {useHistory} from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import TwoColWithSteps from "../../components/features/TwoColWithSteps";
import TwoColWithButton from "../../components/features/TwoColWithButton";
import VerticalWithAlternateImageAndText from "../../components/features/VerticalWithAlternateImageAndText";
import TwoColWithTwoFeaturesAndButtons from "../../components/features/TwoColWithTwoFeaturesAndButtons";
import TwoColSingleFeatureWithStats2 from "../../components/features/TwoColSingleFeatureWithStats2";
import TabCardGrid from "../../components/cards/TabCardGrid";
import TwoTrendingPreviewCardsWithImage from "../../components/cards/TwoTrendingPreviewCardsWithImage";
import GetStarted from "../../components/cta/GetStarted";
import GetStartedLight from "../../components/cta/GetStartedLight";
import DownloadApp from "../../components/cta/DownloadApp";
import FullWidthWithImage from "../../components/hero/FullWidthWithImage";
import TwoColumnWithPrimaryBackground from "../../components/hero/TwoColumnWithPrimaryBackground";
import ClaimableTeaser from "./ClaimableTeaser";

const Container = tw.div`flex pt-5 grid`
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

    useEffect(() => {
        document.title = "Dashboard - Decentrifi"
    }, [])


    return <Container>
        <DashboardWrapper>
            <Center>
                <DashboardNavbar address={dashboardHooks.address} selected={"profile"}/>
            </Center>

            <DashboardHeader dashboardHooks={dashboardHooks}/>
            <ClaimableTeaser owner={dashboardHooks.address} amount={dashboardHooks.totalClaimables} />
            <Full>
                <Column>

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

