import React from "react";
import ClaimableDetails from "../DashboardView/partials/ClaimableDetails";

import tw from 'twin.macro';
import {SectionHeading, Subheading as SubheadingBase} from "../../components/misc/Headings";
import {SectionDescription} from "../../components/misc/Typography";
import FAQ from "../../components/faqs/SingleCol";
import Navbar from "../../components/Navbar/Navbar";

const Container = tw.div`flex pt-8`

const DashboardWrapper = tw.div`w-full grid justify-items-center`
const HideSmallValueFilter = tw.p`text-xs`

const HighlightedText = tw.span`text-primary-500`
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center mb-4`;

const Center = tw.div`w-full flex grid justify-items-center mb-3`

const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`

const ClaimableSection = tw.div`py-4 lg:w-2/3 w-full px-4 mt-4`
const FAQSection = tw.div`w-full px-4  bg-defaultBackground`

export default function ClaimableView({dashboardHooks}) {

    function showSmallValues() {
        dashboardHooks.setHideSmallValues(false);
    }

    function hideSmallValues() {
        dashboardHooks.setHideSmallValues(true);
    }

    const faqs = [
        {
            question: "How do we know what is claimable for your address?",
            answer: "We keep an index of a vast amount of web3 applications. By surfing to this page, " +
                "we query the blockchain to see if you have any unclaimed or outstanding rewards."
        },
        {
            question: "Can I claim things straight from this app?",
            answer: "At often times, you can. When we find an unclaimed reward, a button will appear. Clicking that button will popup metamask with the correct transaction prefilled."
        },
        {
            question: "Why does it take a while to load this page?",
            answer: "We keep track of thousands of farms, pools and applications. In order to ensure we find everything, we scan for very possible reward."
        }
    ]

    return <Container>
        <DashboardWrapper>
            <Center>
                <Navbar items={
                    [
                        {
                            name: "Profile",
                            selected: false,
                            url: '/dashboard'
                        },
                        {
                            name: "Claimables",
                            selected: true,
                            url: '#'
                        }
                    ]
                } />
            </Center>

            <SectionWithBackground>
                <Subheading>Don't forget your rewards</Subheading>
                <Heading>Outstanding <HighlightedText>Claims</HighlightedText></Heading>
                <Description>Find out if you have any unclaimed yields, rewards, NFTs or airdrops!
                    We automatically check your wallet for any unclaimed reward.</Description>
            </SectionWithBackground>

            <ClaimableSection>
                <ClaimableDetails showPlaceholder={true} dashboardHooks={dashboardHooks}/>
            </ClaimableSection>
            <FAQSection>
                <FAQ
                    description={""}
                    faqs={faqs}
                    subheading={"Frequently asked claiming questions"}
                    heading={<>Any <HighlightedText>Questions ?</HighlightedText></>}
                />
            </FAQSection>

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
        </DashboardWrapper>
    </Container>;
}

