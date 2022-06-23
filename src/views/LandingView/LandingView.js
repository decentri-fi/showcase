import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import tw from "twin.macro";
import MainFeature2 from "../../components/features/TwoColWithTwoHorizontalFeaturesAndButton";
import prototypeIllustrationImageSrc from "../../images/prototype-illustration.svg";
import {ReactComponent as BriefcaseIcon} from "feather-icons/dist/icons/share.svg";
import {ReactComponent as ChainIcon} from "feather-icons/dist/icons/link.svg";
import ReactGA from "react-ga";
import TwoColSingleFeatureWithStats2 from "../../components/features/TwoColSingleFeatureWithStats2";
import GetStartedLight from "../../components/cta/GetStartedLight";

const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
const HighlightedText = tw.span`text-primary-500`;

export default function LandingView() {

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    return (
        <>
            <TwoColSingleFeatureWithStats2 statistics={
                [
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
                ]
            }
                                           primaryButtonText="Explore Defi Hub"
                                           primaryButtonUrl="https://docs.defitrack.io"
                                           subheading="Defi Hub"
                                           heading="Decentralized Finance. Simplified. Open Source."
                                           description="Defi Hub is the easiest way to integrate with existing defi protocols without having to know the inner workings of platform or chain-specific models."

            />

            <section tw="bg-defaultBackground">
                <MainFeature2
                    subheading={<Subheading>Defitrack Track</Subheading>}
                    heading={
                        <>
                            Track your ongoing <HighlightedText>DeFi Investments</HighlightedText>
                        </>
                    }
                    description={
                        <>
                            Tracking funds requires specific know-how about underlying protocols and projects.
                            We keep track of all the major <HighlightedText><a target="_blank"
                                                                               href="https://docs.defitrack.io">lending,
                            farming, pool and staking providers</a></HighlightedText> and the current, relevant markets.
                        </>
                    }
                    primaryButtonText={"EXPLORE THE SHOWCASE"}
                    primaryButtonUrl={"/dashboard"}
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
            </section>

            <section tw="bg-defaultBackground">
                <GetStartedLight
                    primaryLinkUrl="https://docs.defitrack.io"
                    secondaryLinkUrl="https://docs.defitrack.io"
                    subheading="Buidling in the space?"
                    heading="Explore our developer-friendly docs."
                />
            </section>
        </>
    )
};