import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import useDashboardHooks from "./hooks/dashboard-hooks";
import DashboardView from "./DashboardView";
import CustomHeader from "../../components/Header/CustomHeader";

export default function AddressDashboardView() {

    const params = useParams();
    const address = params.user;
    const history = useHistory();
    const dashboardHooks = useDashboardHooks(address, {
        supportsClaimables: true,
    });

    const onAddressChange = (address) => {
        history.push(`/${address}/profile`);
    };

    return (
        <>
            <CustomHeader onAddressChange={onAddressChange} showSearch={true}></CustomHeader>
            <DashboardView dashboardHooks={dashboardHooks}/>
        </>
    )
};