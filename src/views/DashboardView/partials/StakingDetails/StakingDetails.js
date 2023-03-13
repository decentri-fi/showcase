import React, {useContext, useState} from "react";
import DollarLabel from "../../../../components/Label/DollarLabel";
import tw from "twin.macro";
import AssetTable from "../../../../components/AssetTable/AssetTable";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import {Button} from "@mui/material";
import {DashboardContext} from "../../../../App";
import {useExitPosition} from "../../../../hooks/useExitPosition";
import useWeb3 from "../../../../hooks/web3";

const Header = tw.div`w-full flex items-center mb-2`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-indigo-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Hidden = tw.span`hidden lg:block`

const CloseContainer = tw.div`grid w-full justify-items-center`
const CloseIcon = tw.div`p-4 w-full`
const ActionContainer = tw.div`w-full grid justify-items-center mb-4`

export default function StakingDetails({protocol}) {

    const web3 = useWeb3()
    const {
        exit
    } = useExitPosition(web3);
    const [open, setOpen] = useState(false);
    const [popupData, setPopupData] = useState(<></>);
    const closeModal = () => setOpen(false);


    const {
        stakings,
        totalStakingForProtocol
    } = useContext(DashboardContext)

    const elements = stakings.filter(staking => {
        return staking.protocol.slug === protocol.slug
    }).map(element => {

        const single = {
            name: element.name,
            amount: element.amountDecimal,
            apr: element.apr,
            logo: element.protocol.logo,
            networkLogo: element.network.logo,
            dollarValue: element.dollarValue
        }

        const rewards = element.rewardTokens.map(reward => {
            return {
                name: reward.name,
                logo: reward.logo,
                networkLogo: element.network.logo,
                dollarValue: null,
            }
        });

        return {
            symbol: element.stakedToken.symbol,
            onClick: () => {
                console.log(element)
                setPopupData(
                    <>
                        <AssetTable
                            entries={[single]}
                            header={
                                <Header>
                                    <HeaderTextContainer>
                                        <HeaderText>Breakdown</HeaderText>
                                    </HeaderTextContainer>
                                    <BalanceText>
                                        <Hidden>
                                            <PullRight>
                                                <HeaderText>
                                                    <DollarLabel
                                                        amount={totalStakingForProtocol(protocol)}/>
                                                </HeaderText>
                                            </PullRight>
                                        </Hidden>
                                    </BalanceText>
                                </Header>
                            }
                        />

                        <AssetTable
                            entries={rewards}
                            header={
                                <Header>
                                    <HeaderTextContainer>
                                        <HeaderText>Rewards</HeaderText>
                                    </HeaderTextContainer>
                                </Header>
                            }
                        />

                        <ActionContainer>
                            {
                                element.exitPositionSupported &&
                                <Button onClick={
                                    async () => {
                                        await exit(element);
                                    }
                                } variant={"contained"}>Exit Position</Button>
                            }
                        </ActionContainer>
                    </>
                )
                setOpen(true);
            },
            name: element.name,
            amount: element.amountDecimal,
            apr: element.apr,
            logo: element.protocol.logo,
            networkLogo: element.network.logo,
            dollarValue: element.dollarValue
        }
    })


    if (elements.length === 0) {
        return (
            <>
            </>
        );
    }

    return (
        <>
            <Popup modal open={open} onClose={closeModal}>
                <CloseContainer>
                    <CloseIcon>
                        <a className="close" onClick={closeModal}>
                            &times;
                        </a>
                    </CloseIcon>
                    <div tw="w-full px-4">
                        {popupData}
                    </div>
                </CloseContainer>
            </Popup>
            <AssetTable
                entries={elements}
                header={
                    <Header>
                        <HeaderTextContainer>
                            <HeaderText>Farming</HeaderText>
                        </HeaderTextContainer>
                        <BalanceText>
                            <Hidden>
                                <PullRight>
                                    <HeaderText>
                                        <DollarLabel
                                            amount={totalStakingForProtocol(protocol)}/>
                                    </HeaderText>
                                </PullRight>
                            </Hidden>
                        </BalanceText>
                    </Header>
                }
            />
        </>

    );
}