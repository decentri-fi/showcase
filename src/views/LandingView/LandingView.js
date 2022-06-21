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

    const history = useHistory();

    const [address, setAddress] = useState("")

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])


    const updateAddress = (element) => {
        setAddress(element.target.value)
    }

    function search() {
        if (address != null) {
            history.push(`/account/${address}`);
        }
    }

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
                                           primaryButtonText="Explore Connect"
                                           primaryButtonUrl="https://docs.defitrack.io"
                                           subheading="Defitrack Connect"
                                           heading="Decentralized Finance. Simplified. Open Source."
                                           description="Defitrack connect is the easiest way to integrate with existing defi protocols without having to know the inner workings of platform or chain-specific models."

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

            <div
                tw="max-w-screen-xl p-4 bg-white dark:bg-gray-800 mx-auto px-4 sm:px-6 lg:px-8 relative py-24">
                <div tw="relative">
                    <div tw="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                        <div tw="lg:col-start-2 lg:max-w-2xl ml-auto">
                            <p tw="text-base leading-6 text-indigo-500 font-semibold uppercase">
                                Inclusive
                            </p>
                            <h4 tw="mt-2 text-2xl leading-8 font-extrabold text-gray-900 dark:text-white sm:text-3xl sm:leading-9">
                                Dozens of protocols and networks.
                            </h4>
                            <p tw="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                                We're building views and aggregate data for various applications and chains. Integrate
                                third party
                                data into your apps.
                            </p>
                            <ul tw="mt-8 md:grid md:grid-cols-2 gap-6">
                                <li tw="mt-6 lg:mt-0">
                                    <div tw="flex">
                            <span
                                tw="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 dark:bg-transparent">
                                <svg tw="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd">
                                    </path>
                                </svg>
                            </span>
                                        <span
                                            tw="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                                Various chains and L2s.
                            </span>
                                    </div>
                                </li>
                                <li tw="mt-6 lg:mt-0">
                                    <div tw="flex">
                            <span
                                tw="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 dark:bg-transparent">
                                <svg tw="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd">
                                    </path>
                                </svg>
                            </span>
                                        <span
                                            tw="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                                Smart Contract integration.
                            </span>
                                    </div>
                                </li>
                                <li tw="mt-6 lg:mt-0">
                                    <div tw="flex">
                            <span
                                tw="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 dark:bg-transparent">
                                <svg tw="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd">
                                    </path>
                                </svg>
                            </span>
                                        <span
                                            tw="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                                Opportunity Finders.
                            </span>
                                    </div>
                                </li>
                                <li tw="mt-6 lg:mt-0">
                                    <div tw="flex">
                            <span
                                tw="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 dark:bg-transparent">
                                <svg tw="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clip-rule="evenodd">
                                    </path>
                                </svg>
                            </span>
                                        <span
                                            tw="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                                Defi Start Page.
                            </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div tw="mt-10 lg:-mx-4 relative lg:mt-0 lg:col-start-1">
                            <div tw="relative space-y-4">
                                <div tw="flex items-end justify-center lg:justify-start space-x-4">
                                    <img tw="rounded-lg w-32 md:w-56" width="200"
                                         src="https://static.defitrack.io/images/networks/ethereum.png" alt="1"/>
                                    <img tw="rounded-lg w-40 md:w-64" width="260"
                                         src="https://static.defitrack.io/images/protocols/aave.png" alt="2"/>
                                </div>
                                <div tw="flex items-start justify-center lg:justify-start space-x-4 ml-12">
                                    <img tw="rounded-lg w-24 md:w-40" width="170"
                                         src="https://static.defitrack.io/images/networks/arbitrum.png" alt="3"/>
                                    <img tw="rounded-lg w-32 md:w-56" width="200"
                                         src="https://static.defitrack.io/images/protocols/beefy.png" alt="4"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};