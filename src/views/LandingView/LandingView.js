import React, {useEffect} from 'react';
import tw from "twin.macro";
import Feature from "../../components/features/TwoColWithTwoHorizontalFeaturesAndButton";
import {ReactComponent as BriefcaseIcon} from "feather-icons/dist/icons/share.svg";
import {ReactComponent as ChainIcon} from "feather-icons/dist/icons/link.svg";
import {ReactComponent as DollarSign} from "feather-icons/dist/icons/dollar-sign.svg";
import ReactGA from "react-ga4";
import TwoColSingleFeatureWithStats2 from "../../components/features/TwoColSingleFeatureWithStats2";
import GetStartedLight from "../../components/cta/GetStartedLight";
import TwoColWithButton from "../../components/features/TwoColWithButton";

import MoneyUnicornPic from "images/moneyunicorns.png";
import UnicornsReading from "images/unicornsreading.png";
import BookkeeperUniPic from "images/bookkeperuni.png";
import CodeOrDash from "images/code_or_dash.png";
import {fetchNetworks} from "../../api/defitrack/networks/networks";
import {fetchProtocols} from "../../api/defitrack/protocols/protocols";
import {getStatistics} from "../../api/defitrack/statistics/Statistics";
import OurWork from "../DefiHubView/our-work";

const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
const HighlightedText = tw.span`text-primary-500`;

const Container = tw.div`w-full`

const Dark = tw.section`bg-defaultBackground`


export default function LandingView() {

    const [stats, setStats] = React.useState({
        "protocols": 21, "networks": 7, "markets": 550
    });

    useEffect(async () => {
        ReactGA.send({
            hitType: "pageview", page: window.location.pathname + window.location.search
        });

        window.title = 'Decentrifi | Decentralized Finance. Simplified. Open Source';

        fetchNetworks().then((networks) => {
            setStats(prevState => {
                return {
                    ...prevState, "networks": networks.length,
                }
            })
        })

        getStatistics().then((statistics) => {
            setStats(prevState => {
                return {
                    ...prevState, "markets": statistics.marketCount,
                }
            })
        })


        fetchProtocols().then((protocols) => {
            setStats(prevState => {
                return {
                    ...prevState, "protocols": protocols.length,
                }
            })
        })
    }, [])

    let statistics = [{
        key: "Protocols", value: `${stats['protocols']}+`
    }, {
        key: "Networks", value: `${stats['networks']}+`
    }, {
        key: "Markets", value: `${stats['markets']}+`
    }];

    return (<Container>
        <TwoColSingleFeatureWithStats2
            imageSrc={UnicornsReading}
            statistics={statistics}
            primaryButtonText="EXPLORE"
            primaryButtonUrl="https://track.decentri.fi/explore"
            subheading="DeFi. Simplified. Open Source"
            heading="Demistifying Decentralized Finance"
            description="Explore the world of decentralized finance with Decentrifi. We provide a unified view of the DeFi landscape, so you can focus on what matters."
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
            primaryButtonUrl={"https://track.decentri.fi/account/0x26fcbd3afebbe28d0a8684f790c48368d21665b5"}
            imageSrc={CodeOrDash}
            showDecoratorBlob={false}
            features={[{
                Icon: DollarSign,
                title: "Farming Rewards",
                description: "We integrate with a variety of EVM-compatible or equivalent chains, like Ethereum, Polygon, Optimism, etc...",
                iconContainerCss: tw`bg-purple-300 text-purple-800`
            }]}
        />

        <Dark>
            <OurWork/>
        </Dark>
    </Container>)
};