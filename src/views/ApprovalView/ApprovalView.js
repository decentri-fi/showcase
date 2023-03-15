import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useApprovalHooks} from "./hooks/useApprovalHooks";
import RequiresMembership from "../../components/RequiresMembership";
import CustomHeader from "../../components/Header/CustomHeader";
import tw from "twin.macro";
import DashboardNavbar from "../../components/DashboardNavbar";
import {ApprovalTable} from "./ApprovalTable";

const Container = tw.div`flex pt-8 grid`
const DashboardWrapper = tw.div`w-full grid justify-items-center`
const Center = tw.div`w-full flex grid justify-items-center mb-3`

const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`
const TableContainer = tw.div`w-2/3 my-8`

export function ApprovalView() {
    const history = useHistory();
    const params = useParams();
    const address = params.user;

    const approvalHooks = useApprovalHooks(address);

    const onAddressChange = (address) => {
        history.push(`/${address}/allowance`);
    };

    return (
        <>
            <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
            <Container>
                <DashboardWrapper>
                    <Center>
                        <DashboardNavbar address={address} selected={"allowance"}/>
                    </Center>
                </DashboardWrapper>
                <RequiresMembership target={`/${address}/allowance`}>
                    <SectionWithBackground>
                        <TableContainer>
                            <ApprovalTable isLoading={approvalHooks.isLoading} allowances={approvalHooks.allowances}/>
                        </TableContainer>
                    </SectionWithBackground>
                </RequiresMembership>
            </Container>

        </>
    )
}