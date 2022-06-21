import React from 'react';
import {useParams} from "react-router-dom";
import useDashboardHooks from "./hooks/dashboard-hooks";
import DashboardView from "./DashboardView";

export default function AddressDashboardView() {

    const params = useParams();
    const address = params.user;
    const dashboardHooks = useDashboardHooks(address);

    return (
        <DashboardView dashboardHooks={dashboardHooks}/>
    )
};