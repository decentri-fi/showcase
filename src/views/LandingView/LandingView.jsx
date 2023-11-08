import React, {useEffect, useMemo} from 'react';
import tw from "twin.macro";
import Feature from "../../components/features/TwoColWithTwoHorizontalFeaturesAndButton";
import BriefcaseIcon from "feather-icons/dist/icons/share.svg?react";
import ChainIcon from "feather-icons/dist/icons/link.svg?react";
import DollarSign from "feather-icons/dist/icons/dollar-sign.svg?react";
import ReactGA from "react-ga4";
import TwoColSingleFeatureWithStats2 from "../../components/features/TwoColSingleFeatureWithStats2";
import UnicornsReading from '../../images/unicorns/uni_looking_at_charts.png'

import BookkeeperUniPic from "../../images/bookkeperuni.png";
import CodeOrDash from "../../images/code_or_dash.png";
import OurWork from "../DefiHubView/our-work";
import {useLandingView} from "./hooks/useLandingView";
import ShieldIconImage from "../../images/shield-icon.svg";
import SupportIconImage from "../../images/support-icon.svg";
import CustomizeIconImage from "../../images/customize-icon.svg";
import BuildingBlocks from "./BuildingBlocks";

const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
const HighlightedText = tw.span`text-primary-500`;

const Container = tw.div`w-full`

const Dark = tw.section`bg-defaultBackground`


export default function LandingView() {

    const {statistics: stats} = useLandingView();

    useEffect(() => {
        window.title = 'Decentrifi | Decentralized Finance. Simplified. Open Source';
        ReactGA.send({
            hitType: "pageview", page: window.location.pathname + window.location.search
        });
    }, []);

    let statistics = useMemo(() => {
        return [{
            key: "Protocols", value: `${stats['protocols']}+`
        }, {
            key: "Networks", value: `${stats['networks']}+`
        }, {
            key: "Markets", value: `${stats['markets']}+`
        }]
    }, [stats]);

    return (<Container>
        <TwoColSingleFeatureWithStats2
            imageSrc={UnicornsReading}
            statistics={statistics}
            primaryButtonText="EXPLORE"
            primaryButtonUrl="https://docs.decentri.fi"
            subheading="DeFi. Simplified. Open Source"
            heading="Decentralized Finance API"
            description="Explore the world of decentralized finance with Decentrifi. We provide a unified, aggregated API the DeFi landscape, so you can focus on everything else."
        />

        <Dark>
            <BuildingBlocks
                heading={"Your Building Blocks"}
                description={"We index protocols, aggregate contracts, transform data and present defi native building blocks."}
                cards={
                    [
                        {
                            imageSrc: ShieldIconImage,
                            title: "Liquidity Pools",
                            description: "Uniswap, Balancer, Curve? These pools are used as liquidity for token swaps.",
                            url: "https://timerse.com"
                        },
                        {
                            imageSrc: SupportIconImage,
                            title: "Farming Opportunities",
                            description: "Any Farm, Token Staking or Yield Opportunity",
                            url: "https://google.com"
                        },
                        {
                            imageSrc: CustomizeIconImage,
                            title: "Lending & Borrowing",
                            description: "Borrow vaults? Debt tokens? Compound or Aave? We index it.",
                            url: "https://reddit.com"
                        },
                        {
                            imageSrc: CustomizeIconImage,
                            title: "Tokens",
                            description: "Borrow vaults? Debt tokens? Compound or Aave? We index it.",
                            url: "https://reddit.com"
                        }
                    ]
                }/>
        </Dark>


        <Feature
            textOnLeft={false}
            subheading={<Subheading>Claim your rewards</Subheading>}
            heading={<>
                Explore <HighlightedText>your yield</HighlightedText>
            </>}
            description={<>
                The land of defi is vast and full of opportunities. We help you to <HighlightedText>keep
                track of your yield</HighlightedText> and
                <HighlightedText> claim your rewards</HighlightedText> in a timely manner.
            </>}
            primaryButtonText={"EXPLORE DECENTRIFI TRACKER"}
            primaryButtonUrl={"https://track.decentri.fi/claimables"}
            imageSrc={CodeOrDash}
            showDecoratorBlob={false}
            features={[{
                Icon: DollarSign,
                title: "Farming Rewards",
                description: "Easily find and claim your farming rewards from all the major protocols. We support a variety of chains and protocols.",
                iconContainerCss: tw`bg-purple-300 text-purple-800`
            },
                {
                    Icon: DollarSign,
                    title: "Airdrops",
                    description: "Missed an airdrop? We'll notify you when you qualify for a pending airdrop.",
                    iconContainerCss: tw`bg-purple-300 text-purple-800`
                }]}
        />


        <Dark>
            <Feature
                subheading={<Subheading>Decentrifi Accounting</Subheading>}
                heading={<>
                    Track your ongoing <HighlightedText>DeFi Investments</HighlightedText>
                </>}
                description={<>
                    Tracking positions requires specific know-how about underlying protocols and projects.
                    We keep track of all the major <HighlightedText><a target="_blank"
                                                                       href="https://docs.decentri.fi">lending,
                    farming, pool and staking providers</a></HighlightedText> and the current, relevant markets.
                    <br/>
                    We pour all this data into a unified model, which lets you easily <b>compare different
                    positions.</b>
                </>}
                primaryButtonText={"EXPLORE DECENTRIFI TRACKER"}
                primaryButtonUrl={"https://track.decentri.fi/account/0x26fcbd3afebbe28d0a8684f790c48368d21665b5"}
                imageSrc={BookkeeperUniPic}
                showDecoratorBlob={false}
                features={[{
                    Icon: ChainIcon,
                    title: "Chain Agnostic",
                    description: "We integrate with a variety of EVM-compatible or equivalent chains, like Ethereum, Polygon, Optimism, etc...",
                    iconContainerCss: tw`bg-purple-300 text-purple-800`
                }, {
                    Icon: BriefcaseIcon,
                    title: "Unified Model",
                    description: "We reduce protocol markets to a unified domain based on defi principals and building blocks.",
                    iconContainerCss: tw`bg-green-300 text-green-800`
                }]}
            />
        </Dark>
    </Container>)
};