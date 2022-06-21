import React from 'react';
import BigNumber from "bignumber.js";
import OrDivider from "../../../components/Divider/OrDivider";
import RequiresApprovalInformation from "./RequiresApprovalInformation";
import BeefyVaultActions from "./actions/BeefyVaultActions";
import HasApprovalInformation from "./HasApprovalInformation";
import {Box, Button, Step, StepLabel, Stepper, Tab, Tabs} from "@mui/material";
import PropTypes from 'prop-types';
import tw from "twin.macro";

const ButtonContainer = tw.div`grid h-20 place-items-center`
const DepositAndWithdrawContainer = tw.div`flex flex-col w-full`

function DepositOrWithdraw({farmingViewHooks}) {

    const canWithdraw = () => {
        return farmingViewHooks.staking !== null && new BigNumber(0).isLessThan(new BigNumber(farmingViewHooks.staking.stakedToken.amount))
    }

    return (
        <>
            <div tw="w-full grid justify-items-center mt-10">
                <DepositAndWithdrawContainer>
                    {
                        canWithdraw() && <ButtonContainer>

                            <Button variant={"contained"} color="warning"
                                    onClick={farmingViewHooks.withdrawAll}>Withdraw</Button>
                            <OrDivider/>
                        </ButtonContainer>
                    }
                    <ButtonContainer>
                        <Button variant={"contained"} color="success" onClick={farmingViewHooks.depositAll}>Deposit
                            Everything
                        </Button>
                    </ButtonContainer>
                </DepositAndWithdrawContainer>
                <HasApprovalInformation/>
            </div>
        </>
    );
}

function ApprovalSection({farmingViewHooks}) {

    return (
        <div tw="w-full grid justify-items-center mt-10">
            <Button onClick={farmingViewHooks.approve} color="secondary"
                    variant={"contained"}>
                Approve
            </Button>
            <RequiresApprovalInformation/>
        </div>
    );
}


function StatusHeader({farmingViewHooks}) {
    const steps = [
        'approve',
        'deposit',
    ];
    return (
        <div tw="w-full mt-8">
            <Stepper activeStep={farmingViewHooks.approved ? 2 : 1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}

function NativeDepositActions({farmingViewHooks}) {
    if (!farmingViewHooks.approved) {
        return <ApprovalSection farmingViewHooks={farmingViewHooks}/>
    } else {
        return <DepositOrWithdraw farmingViewHooks={farmingViewHooks}/>
    }
}

function FarmSpecificActions({token, farmingElement}) {
    if (farmingElement.vaultType === 'beefyVaultV6') {
        return (
            <BeefyVaultActions token={token} farmingElement={farmingElement}/>
        )
    } else {
        return (
            <>
                <p>There are currently no specific actions for this farm</p>
            </>
        );
    }
}

/*

 */

function DefaultActions({farmingViewHooks}) {
    return (
        <>
            <StatusHeader farmingViewHooks={farmingViewHooks}/>
            <NativeDepositActions farmingViewHooks={farmingViewHooks}/>
        </>
    )
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function Actions({farmingViewHooks, token, farmingElement}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <>
            <div tw="flex w-full grid justify-items-center">
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="farm actions">
                        <Tab label="Default Actions"/>
                        <Tab label="Farm Specific Actions"/>
                    </Tabs>
                </Box>
            </div>

            <div tw="w-full mt-8">
                <TabPanel value={value} index={0}>
                    <DefaultActions farmingViewHooks={farmingViewHooks}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FarmSpecificActions token={token} farmingElement={farmingElement}/>
                </TabPanel>
            </div>
        </>
    )
};