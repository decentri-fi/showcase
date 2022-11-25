import React, {useEffect} from 'react';
import tw from "twin.macro";
import MainFeature2 from "../../components/features/TwoColWithTwoHorizontalFeaturesAndButton";
import prototypeIllustrationImageSrc from "../../images/prototype-illustration.svg";
import {ReactComponent as BriefcaseIcon} from "feather-icons/dist/icons/share.svg";
import {ReactComponent as ChainIcon} from "feather-icons/dist/icons/link.svg";
import ReactGA from "react-ga4";
import TwoColSingleFeatureWithStats2 from "../../components/features/TwoColSingleFeatureWithStats2";
import GetStartedLight from "../../components/cta/GetStartedLight";

const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
const HighlightedText = tw.span`text-primary-500`;

const Container = tw.div`w-full`

const Dark = tw.section`bg-defaultBackground`

export default function LandingView() {

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, [])

    let statistics = [
        {
            key: "Protocols",
            value: "21+"
        },
        {
            key: "Networks",
            value: "7+"
        },
        {
            key: "Markets",
            value: "550+"
        }
    ];

    return (
        <Container>
            <TwoColSingleFeatureWithStats2 statistics={statistics}
                                           primaryButtonText="Explore Defi Hub"
                                           primaryButtonUrl="https://docs.decentri.fi"
                                           subheading="Defi Hub"
                                           heading="Decentralized Finance. Simplified. Open Source."
                                           description="Defi Hub is the easiest way to integrate with existing defi protocols without having to know the inner workings of protocols or chain-specific models."
            />

            <Dark>
                <MainFeature2
                    subheading={<Subheading>Defitrack Track</Subheading>}
                    heading={
                        <>
                            Track your ongoing <HighlightedText>DeFi Investments</HighlightedText>
                        </>
                    }
                    description={
                        <>
                            Tracking positions requires specific know-how about underlying protocols and projects.
                            We keep track of all the major <HighlightedText><a target="_blank"
                                                                               href="https://docs.decentri.fi">lending,
                            farming, pool and staking providers</a></HighlightedText> and the current, relevant markets.
                            <br />
                            We pour all this data into a unified model, which lets you easily <b>compare different positions.</b>
                        </>
                    }
                    primaryButtonText={"EXPLORE THE SHOWCASE"}
                    primaryButtonUrl={"/account/0x26fcbd3afebbe28d0a8684f790c48368d21665b5"}
                    imageSrc={prototypeIllustrationImageSrc}
                    showDecoratorBlob={false}
                    features={[
                        {
                            Icon: ChainIcon,
                            title: "Chain Agnostic",
                            description: "We integrate with a variety of EVM-compatible or equivalent chains, like Ethereum, Polygon, Optimism, etc...",
                            iconContainerCss: tw`bg-purple-300 text-purple-800`
                        },
                        {
                            Icon: BriefcaseIcon,
                            title: "Unified Model",
                            description: "We reduce protocol markets to a unified domain based on defi principals and building blocks.",
                            iconContainerCss: tw`bg-green-300 text-green-800`
                        }
                    ]}
                />
            </Dark>

            <section tw="bg-defaultBackground">
                <GetStartedLight
                    primaryLinkUrl="https://docs.decentri.fi"
                    secondaryLinkUrl="https://docs.decentri.fi"
                    subheading="Buidling in the space?"
                    heading="Explore our developer-friendly docs."
                />
            </section>
        </Container>
    )
};