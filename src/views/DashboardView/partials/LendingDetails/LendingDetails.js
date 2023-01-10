import React from "react";
import tw from "twin.macro";

import NumberFormat from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import FallbackImage from "../../../../components/Image/FallbackImage";
import APYLabel from "../../../../components/Label/APYLabel"; //eslint-disable-line

const Container = tw.div`w-full my-4`
const Header = tw.div`w-full flex items-center mb-2`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-yellow-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`
const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white dark:bg-gray-800`
const List = tw.ul`flex flex-col w-full`

const ListItem = tw.li`flex flex-row hover:bg-indigo-100`
const Row = tw.div`select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b`

const IconColumn = tw.div`flex flex-col w-1/12 justify-center items-center mr-4 lg:block`;
const IconBlock = tw.div`block relative`
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 lg:h-8 lg:w-8`
const OverlayImage = tw.div`lg:h-4 lg:w-4 h-2 w-2 -mx-2 `

const NameColumn = tw.div`pl-1 lg:w-1/4 w-3/4 flex-1 font-medium text-orange-600 dark:text-gray-200 text-xs`
const AmountColumn = tw.div`hidden lg:block text-sm text-left text-gray-600 dark:text-gray-200 lg:w-1/3 w-0`
const TwoColumns = tw.div`grid grid-cols-2`

const ThinGreen = tw.span`text-green-500 font-thin`

const TotalColumn = tw.div`text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5 justify-items-end grid`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Bold = tw.span`font-bold text-sm`
const Hidden = tw.span`hidden lg:block`


function LendingElement({lending}) {
    return (
        <ListItem>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <FallbackImage src={lending.protocol.logo}/>
                            </Image>
                            <OverlayImage>
                                <FallbackImage src={lending.network.logo}/>
                            </OverlayImage>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    {lending.name}
                </NameColumn>
                <AmountColumn>
                   <Hidden>
                       <TwoColumns>
                           <NumberFormat
                               value={lending.amount} displayType={'text'} decimalScale={4}
                               thousandSeparator={true}/>
                           <ThinGreen>{lending.token.symbol}</ThinGreen>
                       </TwoColumns>
                       <div>
                           {
                               lending.rate && <div>
                                   <APYLabel amount={lending.rate * 100}/>
                                   <span>% APR</span>
                               </div>
                           }
                       </div>
                   </Hidden>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                            <DollarLabel amount={lending.dollarValue}/>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    )
}

function LendingList({lendings}) {
    return (
        <ListContainer>
            <List>
                    {
                        lendings.map((lending, i) => {
                            return (<LendingElement key={i} lending={lending}/>)
                        })
                    }
            </List>
        </ListContainer>
    )
}

export default function LendingDetails({protocol, dashboardHooks}) {

    const elements = dashboardHooks.lendings.filter(lending => {
        return lending.protocol.slug === protocol.slug
    })


    if (elements.length === 0) {
        return (
            <>
            </>
        );
    }
    return (
        <Container>
            <Header>
                <HeaderTextContainer>
                    <HeaderText>Deposits</HeaderText>
                </HeaderTextContainer>
                <BalanceText>
                   <Hidden>
                       <PullRight>
                           <HeaderText>
                               <DollarLabel
                                   amount={dashboardHooks.totalLendingForProtocol(protocol)}/>
                           </HeaderText>
                       </PullRight>
                   </Hidden>
                </BalanceText>
            </Header>
            <LendingList lendings={elements}/>
        </Container>
    );
}