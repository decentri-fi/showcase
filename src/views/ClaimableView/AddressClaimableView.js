import React, {useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import useDashboardHooks from "../DashboardView/hooks/dashboard-hooks";
import ClaimableView from "./ClaimableView";
import CustomHeader from "../../components/Header/CustomHeader";

export default function AddressClaimableView() {

    const params = useParams();
    const address = params.user;
    const history = useHistory();

    useEffect(() => {
        document.title = `Claimables for ${address} - Decentrifi`;
    }, []);

    const onAddressChange = (address) => {
        history.push(`/${address}/claimables`);
    };

    const dashboardHooks = useDashboardHooks(address, {
        supportsPooling: false,
        supportsLending: false,
        supportsStaking: false,
        supportsClaimables: true,
        supportsBalances: false,
        supportsDebt: false
    });

    return (
        <>
            <CustomHeader onAddressChange={onAddressChange}></CustomHeader>
            <ClaimableView dashboardHooks={dashboardHooks}/>
        </>
    )
};