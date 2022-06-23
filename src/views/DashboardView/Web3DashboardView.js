import React, {useEffect} from 'react';
import ConnectWalletSection from "../../components/ConnectWalletSection/ConnectWalletSection";
import useDashboardHooks from "./hooks/dashboard-hooks";
import useWeb3 from "../../hooks/web3";
import DashboardView from "./DashboardView";
import Search from "./partials/Search/Search";
import ReactGA from "react-ga";

export default function Web3DashboardView() {

    const web3 = useWeb3();
    const dashboardHooks = useDashboardHooks(web3.account);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    if (web3.account != null) {
        return (
            <DashboardView dashboardHooks={dashboardHooks}/>
        );
    } else {
        return (
            <>
                <div tw="flex flex-wrap lg:mx-64">
                    <Search dashboardHooks={dashboardHooks}/>
                    <ConnectWalletSection login={web3.login}/>
                </div>
            </>
        )
    }
};