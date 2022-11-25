import React, {useEffect} from 'react';
import ConnectWalletSection from "../../components/ConnectWalletSection/ConnectWalletSection";
import useDashboardHooks from "./hooks/dashboard-hooks";
import useWeb3 from "../../hooks/web3";
import DashboardView from "./DashboardView";
import Search from "./partials/Search/Search";
import ReactGA from "react-ga4";

import tw from 'twin.macro';
import NoWeb3Browser from "../../components/ConnectWalletSection/NoWeb3Browser";

const Container = tw.div`px-2 flex pt-8 lg:pt-24 bg-defaultBackground`
const Center = tw.div`w-full grid justify-items-center`;

export default function Web3DashboardView() {

    const web3 = useWeb3();
    const dashboardHooks = useDashboardHooks(web3.account);

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, [])

    if (web3.account != null) {
        return (
            <DashboardView dashboardHooks={dashboardHooks}/>
        );
    } else {
        return (
            <Container>
                <Center>
                    <Search dashboardHooks={dashboardHooks}/>
                    {
                        web3.supported &&  <ConnectWalletSection login={web3.login}/>
                    }
                    {
                        !web3.supported &&  <NoWeb3Browser />
                    }
                </Center>
            </Container>
        )
    }
};