import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import tw from "twin.macro";
import erc20ImageSrc from "../../images/erc20_carbon.png";
import ReactGA from "react-ga";
import MainFeature from "../../components/features/TwoColWithButton";
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import FAQ from "../../components/faqs/TwoColumnPrimaryBackground";

export default function ConnectView() {

    const history = useHistory();

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    return (
        <>
           <AnimationRevealPage>
               <MainFeature
                   subheading="Developer Friendly"
                   heading="Open Source. High Standards."
                   description="Although fully open source, our developers main focus is code clean architecture.
                   Our team has a history of shipping high quality code in different markets.
                   Defitrack is open source code at industrial level standards."
                   imageSrc={erc20ImageSrc}
                   buttonRounded={false}
                   primaryButtonUrl="https://docs.defitrack.io"
                   textOnLeft={false}
               />
               <FAQ faqs={
                   [
                       {
                           question: "Can we request protocols to be added?",
                           answer: "Yes, absolutely! You can request your implementation at https://docs.defitrack.io/general/supported-protocols#request-a-protocol."
                       },
                       {
                           question: "Is Defitrack a decentralized application?",
                           answer: "Defitrack is not a decentralized application. It's a gateway to web3 protocols. You don't need any blockchain or cryptocurrency knowledge to integrate with decentralized finance."
                       }
                   ]
               } description={"🔥This might contain an answer to your burning questions.🔥"}   />

           </AnimationRevealPage>
        </>
    )
};