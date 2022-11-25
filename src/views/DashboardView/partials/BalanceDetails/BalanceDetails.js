import React from 'react';
import NumberFormat from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import FallbackImage from "../../../../components/Image/FallbackImage";
import {useHistory} from "react-router-dom";

import tw from "twin.macro"

const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white`
const List = tw.ul`flex flex-col w-full `

const ListItem = tw.li`flex flex-row`
const Row = tw.div`select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b`
const IconColumn = tw.div`flex flex-col lg:w-1/12 w-1/5 justify-center items-center mx-4 lg:block`;
const IconBlock = tw.div`block relative`
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 lg:h-8 lg:w-8`
const OverlayImage = tw.div`lg:h-4 lg:w-4 h-2 w-2 -mx-2 `


const TwoColumns = tw.div`grid grid-cols-2`

const NameColumn = tw.div`pl-1 lg:w-1/4 w-3/4 flex-1 font-medium text-green-600 dark:text-gray-200 text-xs`
const AmountColumn = tw.div`hidden lg:block text-sm text-left text-gray-600 dark:text-gray-200 lg:w-1/3 w-0`

const TotalColumn = tw.div`text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5 justify-items-end grid`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Bold = tw.span`font-bold text-sm`

const Center = tw.div`grid w-full justify-items-center mb-4`
const Section = tw.div`w-full lg:w-1/2  bg-white py-4`
const Header = tw.div`w-full flex items-center mb-2 `
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-green-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`
const ThinGreen = tw.span`text-green-500 font-thin`
const Hidden = tw.span`hidden lg:block`


function BalanceRow({balance}) {

    const history = useHistory()

    return (
        <ListItem onClick={() => {
            history.push(`/tokens/${balance.network.name}/${balance.token.address}`)
        }}>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <FallbackImage src={balance.token.logo}/>
                            </Image>
                            <OverlayImage>
                                <FallbackImage src={balance.network.logo}/>
                            </OverlayImage>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    {balance.token.name}
                </NameColumn>
                <AmountColumn>
                    <TwoColumns>
                        <NumberFormat
                            value={balance.amount} displayType={'text'} decimalScale={4} thousandSeparator={true}/>
                        <ThinGreen>
                            {balance.token.symbol}
                        </ThinGreen>
                    </TwoColumns>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                            <DollarLabel amount={balance.dollarValue}/>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    );
}

function BalanceList({balances}) {

    return (
        <ListContainer>
            <List>
                {
                    balances.map((balance, idx) => {
                        return <BalanceRow key={idx} balance={balance}/>
                    })
                }
            </List>
        </ListContainer>
    )
}

export default function BalanceDetails({dashboardHooks}) {

    if (dashboardHooks.balanceElements.length === 0) {
        return (
            <></>
        )
    } else {
        return (
            <Center>
                <Section>
                    <Header>
                        <HeaderTextContainer>
                            <HeaderText>Assets</HeaderText>
                        </HeaderTextContainer>
                        <BalanceText>
                            <Hidden>
                                <PullRight>
                                    <HeaderText>
                                        <DollarLabel
                                            amount={dashboardHooks.totalWalletBalance}/></HeaderText>
                                </PullRight>
                            </Hidden>
                        </BalanceText>
                    </Header>
                    <BalanceList balances={dashboardHooks.balanceElements}/>
                </Section>
            </Center>
        );
    }
};