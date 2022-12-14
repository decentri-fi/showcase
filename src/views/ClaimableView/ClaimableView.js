import React from "react";
import OverviewDetails from "../DashboardView/partials/OverviewDetails";
import ClaimableDetails from "../DashboardView/partials/ClaimableDetails";

import tw from 'twin.macro';
import PlaceholderLoading from "react-placeholder-loading";
import Features from "../../components/features/ThreeColWithSideImage";
import {SectionHeading, Subheading as SubheadingBase} from "../../components/misc/Headings";
import {SectionDescription} from "../../components/misc/Typography";

const Container = tw.div`px-2 flex pt-8 bg-defaultBackground`

const DashboardWrapper = tw.div`w-full grid justify-items-center`
const HideSmallValueFilter = tw.p`text-xs`

const HighlightedText = tw.span`text-primary-500`
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center mb-4`;

export default function ClaimableView({dashboardHooks}) {

    function showSmallValues() {
        dashboardHooks.setHideSmallValues(false);
    }

    function hideSmallValues() {
        dashboardHooks.setHideSmallValues(true);
    }


    return <Container>
        <DashboardWrapper>
            <Subheading>Don't forget your rewards</Subheading>
            <Heading>Outstanding <HighlightedText>Claims</HighlightedText></Heading>
            <Description>Find out if you have any unclaimed yields, rewards, NFTs or airdrops!
                We automatically check your wallet for any unclaimed reward.</Description>

            <div tw="lg:w-2/3 px-4">
                <ClaimableDetails showPlaceholder={true} dashboardHooks={dashboardHooks} />

            </div>

            {
                dashboardHooks.hideSmallValues &&
                <HideSmallValueFilter>Positions with small deposits are not displayed (&lt;$1). <u><a
                    onClick={showSmallValues}>show
                    everything</a></u></HideSmallValueFilter>
            }

            {
                !dashboardHooks.hideSmallValues &&
                <HideSmallValueFilter>Positions with small deposits are included (&lt;$1). <u><a
                    onClick={hideSmallValues}>hide
                    small values</a></u></HideSmallValueFilter>
            }
        </DashboardWrapper>
    </Container>;
}

