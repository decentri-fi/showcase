import React from "react";
import NumberFormat from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import Toggle from "../../../../components/Toggle/Toggle";
import APYLabel from "../../../../components/Label/APYLabel";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
import FallbackImage from "../../../../components/Image/FallbackImage";

const Container = tw.div`w-full my-4`
const Header = tw.div`w-full flex items-center mb-2`
const HeaderText = tw.div`text-sm font-medium mb-2 bg-gray-600 rounded-r p-1 text-white`
const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white dark:bg-gray-800`
const List = tw.ul`flex flex-col w-full`

const ListItem = tw.li`flex flex-row hover:bg-indigo-100`
const Row = tw.div`select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b`

const IconColumn = tw.div`flex flex-col lg:w-1/12 w-1/5 justify-center items-center mx-4 lg:block`;
const IconBlock = tw.div`block relative`
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 lg:h-8 lg:w-8`
const OverlayImage = tw.div`lg:h-4 lg:w-4 h-2 w-2 -mx-2 `

const NameColumn = tw.div`pl-1 w-1/4 flex-1 font-medium text-indigo-600 dark:text-gray-200 text-xs`
const AmountColumn=tw.div`text-sm text-left text-gray-600 dark:text-gray-200 w-1/2 lg:w-1/3`
const TwoColumns = tw.div`grid grid-cols-2`

const ThinGreen = tw.span`text-green-500 font-thin`

const TotalColumn = tw.div`text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5 justify-items-end grid`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Bold = tw.span`font-bold text-sm`

function StakingList({stakings}) {
    return (
        <ListContainer>
            <List>
                {
                    stakings.map((staking) => {
                        return (
                            <StakingEntry key={Math.random().toString(36).substring(7)} staking={staking}/>
                        )
                    })
                }
            </List>
        </ListContainer>
    )
}

export default function StakingDetails({protocol, dashboardHooks}) {

    const elements = dashboardHooks.stakings.filter(staking => {
        return staking.protocol.slug === protocol.slug
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
                    <HeaderText>Farming Overview (<DollarLabel
                        amount={dashboardHooks.totalStakingForProtocol(protocol)}/>)</HeaderText>
                </Header>
                <StakingList stakings={elements}/>
        </Container>
    );
}

function StakingEntry({staking}) {

    const history = useHistory();
    return (
        <ListItem onClick={() => {
            history.push(`/staking/${staking.network.name}/${staking.protocol.slug}/${staking.id}`)
        }}>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <FallbackImage src={staking.protocol.logo}/>
                            </Image>
                            <OverlayImage>
                                <FallbackImage src={staking.network.logo}/>
                            </OverlayImage>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    {staking.name}
                </NameColumn>
                <AmountColumn>
                        <TwoColumns>
                            <NumberFormat
                                          value={staking.amount} displayType={'text'} decimalScale={4}
                                          thousandSeparator={true}/>
                            <ThinGreen> {staking.stakedToken.symbol}</ThinGreen>
                        </TwoColumns>
                        <div>
                            {
                                staking.apr && <div>
                               <APYLabel amount={staking.apr}/>
                                <span>% APR</span>
                            </div>
                            }
                        </div>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                            <DollarLabel amount={staking.dollarValue}/>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    )
}