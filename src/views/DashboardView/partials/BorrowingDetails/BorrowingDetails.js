import React from "react";
import DollarLabel from "../../../../components/Label/DollarLabel";
import tw from "twin.macro";
import AssetTable from "../../../../components/AssetTable/AssetTable"; //eslint-disable-line

const Header = tw.div`w-full flex items-center mb-2`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-red-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Hidden = tw.span`hidden lg:block`

export default function BorrowingDetails({protocol, dashboardHooks}) {

    const elements = dashboardHooks.borrowings.filter(borrow => {
        return borrow.protocol.slug === protocol.slug
    }).map(element => {
        return {
            symbol: '',
            detailUrl: `#`,
            name: element.name,
            amount: element.amount,
            apr: element.rate,
            logo: element.protocol.logo,
            networkLogo: element.network.logo,
            dollarValue: element.dollarValue,
        }
    })


    if (elements.length === 0) {
        return (
            <></>
        )
    }
    return (
        <AssetTable
            entries={elements}
            header={
                <Header>
                    <HeaderTextContainer>
                        <HeaderText>Debt</HeaderText>
                    </HeaderTextContainer>
                    <BalanceText>
                        <Hidden>
                            <PullRight>
                                <HeaderText>
                                    <DollarLabel
                                        amount={dashboardHooks.totalBorrowingForProtocol(protocol)}/>
                                </HeaderText>
                            </PullRight>
                        </Hidden>
                    </BalanceText>
                </Header>
            }
        />
    )
};