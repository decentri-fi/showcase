import React, {useEffect} from 'react';
import ConnectWalletSection from "../../components/ConnectWalletSection/ConnectWalletSection";
import useDashboardHooks from "./hooks/dashboard-hooks";
import useWeb3 from "../../hooks/web3";
import DashboardView from "./DashboardView";
import ReactGA from "react-ga4";

import tw from 'twin.macro';
import NoWeb3Browser from "../../components/ConnectWalletSection/NoWeb3Browser";
import CustomHeader from "../../components/Header/CustomHeader";
import {useHistory} from "react-router-dom";

const Container = tw.div`px-2 flex pt-8 lg:pt-24 bg-defaultBackground`
const Center = tw.div`w-full grid justify-items-center`;

export default function Web3DashboardView() {

    const web3 = useWeb3();
    const history = useHistory();
    const dashboardHooks = useDashboardHooks(web3.account, {
        supportsClaimables: true,
    });

    const onAddressChange = (address) => {
        history.push(`/${address}/profile`);
    };

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }, [])

    if (web3.account != null) {
        return (
            <>
                <CustomHeader onAddressChange={onAddressChange} showSearch={true}></CustomHeader>
                <DashboardView dashboardHooks={dashboardHooks}/>
            </>
        );
    } else {
        return (
            <>
                <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
                <Container>
                    <Center>
                        {
                            web3.supported && <ConnectWalletSection login={web3.login}/>
                        }
                        {
                            !web3.supported && <NoWeb3Browser/>
                        }
                    </Center>
                </Container>
            </>
        )
    }
};