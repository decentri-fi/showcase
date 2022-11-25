import React from 'react';
import NumberFormat from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
import FallbackImage from "../../../../components/Image/FallbackImage";

const Container = tw.div`w-full my-4`
const Header = tw.div`w-full flex items-center mb-2`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow  py-1 px-4 text-sm font-medium mb-2 bg-orange-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`
const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white dark:bg-gray-800`
const List = tw.ul`flex flex-col w-full`

const ListItem = tw.li`flex flex-row hover:bg-indigo-100`
const Row = tw.div`select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b`

const IconColumn = tw.div`flex flex-col lg:w-1/12 w-1/5 justify-center items-center mx-4 lg:block`;
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


function PoolingList({poolings}) {
    return (
        <ListContainer>
            <List>
                {
                    poolings.map((pooling, i) => {
                        return (<PoolingEntry key={i} pooling={pooling}/>)
                    })
                }
            </List>
        </ListContainer>
    )
}

function PoolingEntry({pooling}) {
    const history = useHistory();

    return (
        <ListItem onClick={() => {
            history.push(`/pooling/${pooling.network.name}/${pooling.protocol.slug}/${pooling.id}`)
        }}>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <FallbackImage src={pooling.protocol.logo}/>
                            </Image>
                            <OverlayImage>
                                <FallbackImage src={pooling.network.logo}/>
                            </OverlayImage>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    {pooling.name}
                </NameColumn>
                <AmountColumn>
                        <TwoColumns>
                            <NumberFormat
                                value={pooling.amount} displayType={'text'} decimalScale={4}
                                thousandSeparator={true}/>
                            <ThinGreen>{pooling.symbol}</ThinGreen>
                        </TwoColumns>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                            <DollarLabel amount={pooling.dollarValue}/>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    )
}


export default function PoolingDetails({protocol, dashboardHooks}) {


    const elements = dashboardHooks.lps.filter(pooling => {
        return pooling.protocol.slug === protocol.slug
    })


    if (elements.length === 0) {
        return (
            <>
            </>
        );
    } else {
        return (
        <Container>
            <Header>
                <HeaderTextContainer><HeaderText>Liquidity Pooling</HeaderText></HeaderTextContainer>
                <BalanceText>
                    <Hidden>
                        <PullRight>
                            <HeaderText>
                                <DollarLabel
                                    amount={dashboardHooks.totalPoolingForProtocol(protocol)}/>
                            </HeaderText>
                        </PullRight>
                    </Hidden>
                </BalanceText>
            </Header>
            <PoolingList poolings={elements}/>
        </Container>
        );
    }
}