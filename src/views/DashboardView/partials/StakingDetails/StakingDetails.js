import React from "react";
import NumberFormat from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import APYLabel from "../../../../components/Label/APYLabel";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
import FallbackImage from "../../../../components/Image/FallbackImage";
import AssetTable from "../../../../components/AssetTable/AssetTable";

const Header = tw.div`w-full flex items-center mb-2`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-indigo-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Hidden = tw.span`hidden lg:block`

export default function StakingDetails({protocol, dashboardHooks}) {

    const elements = dashboardHooks.stakings.filter(staking => {
        return staking.protocol.slug === protocol.slug
    }).map(element => {
        return {
            symbol: element.stakedToken.symbol,
            detailUrl: `/staking/${element.network.name}/${element.protocol.slug}/${element.id}`,
            name: element.name,
            amount: element.amount,
            apr: element.apr,
            logo: element.protocol.logo,
            networkLogo: element.network.logo,
            dollarValue: element.dollarValue,
        }
    })


    if (elements.length === 0) {
        return (
            <>
            </>
        );
    }

    return (
        <AssetTable
            entries={elements}
            header = {
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
    );
}