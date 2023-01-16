import React, {useState} from "react";
import DollarLabel from "../../../../components/Label/DollarLabel";
import tw from "twin.macro";
import AssetTable from "../../../../components/AssetTable/AssetTable";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

const Header = tw.div`w-full flex items-center mb-2`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-indigo-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Hidden = tw.span`hidden lg:block`


export default function StakingDetails({protocol, dashboardHooks}) {

    const [open, setOpen] = useState(false);
    const [popupData, setPopupData] = useState(<></>);
    const closeModal = () => setOpen(false);

    const elements = dashboardHooks.stakings.filter(staking => {
        return staking.protocol.slug === protocol.slug
    }).map(element => {

        const single = {
            name: element.name,
            amount: element.amount,
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
                dollarValue: 0,
            }
        });

        return {
            symbol: element.stakedToken.symbol,
            onClick: () => {
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
                                                        amount={dashboardHooks.totalStakingForProtocol(protocol)}/>
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
                    </>
                )
                setOpen(true);
            },
            name: element.name,
            amount: element.amount,
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
                <div tw="grid w-full justify-items-center">
                    <div tw="p-4 w-full">
                        <a className="close" onClick={closeModal}>
                            &times;
                        </a>
                    </div>
                    {popupData}
                </div>
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
                                            amount={dashboardHooks.totalStakingForProtocol(protocol)}/>
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