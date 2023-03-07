import AnimationRevealPage from "../helpers/AnimationRevealPage";
import MainFeature1 from "../components/features/TwoColWithButton";
import Features from "../components/features/ThreeColSimple";
import SupportIconImage from "../images/support-icon.svg";
import ShieldIconImage from "../images/shield-icon.svg";
import CustomerLoveIconImage from "../images/simple-icon.svg";
import React from "react";
import tw from "twin.macro";
import CustomHeader from "../components/Header/CustomHeader";
import FooterV2 from "../components/Footer/FooterV2";

import MembershipNft from "../images/membership_nft.png";

const Subheading = tw.span`uppercase tracking-wider text-sm`;


export default function MembershipView() {
    return (
        <>
            <AnimationRevealPage>
                <CustomHeader showSearch={false} showUserLink={false}/>
                <MainFeature1
                    description={
                        <p>
                            You want to be a member? Awesome! Becoming an early member of Decentri.fi will grant you
                            access to
                            a number of benefits, such as full access to the platform, early access to new features, and
                            more.
                        </p>
                    }
                    subheading={<Subheading>Membership</Subheading>}
                    heading="Become a member"
                    buttonRounded={false}
                    primaryButtonText="Explore the benefits"
                    imageSrc={MembershipNft}
                />
                <MainFeature1
                    subheading={<Subheading>The Membership NFT</Subheading>}
                    heading="Hold this NFT and get access to the platform"
                    buttonRounded={false}
                    primaryButtonText="Buy the NFT"
                    description="
                            Holding our membership NFT in your wallet grants you access to our exclusive features and
                            insights. Not using the membership? The NFT can be resold on the open market. Be one of the first supporters and get access to the platform.
                            "
                    imageSrc={MembershipNft}
                    textOnLeft={false}
                />
                <Features
                    subheading={<Subheading>Our Values</Subheading>}
                    heading="We follow these."
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    cards={[
                        {
                            imageSrc: SupportIconImage,
                            title: "24/7 Support",
                            description: "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport"
                        },
                        {
                            imageSrc: ShieldIconImage,
                            title: "Strong Teams",
                            description: "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport"
                        },
                        {
                            imageSrc: CustomerLoveIconImage,
                            title: "Customer Satisfaction",
                            description: "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport"
                        },
                    ]}
                    linkText=""
                />
                <FooterV2/>
            </AnimationRevealPage>
            );
        </>
    )
};