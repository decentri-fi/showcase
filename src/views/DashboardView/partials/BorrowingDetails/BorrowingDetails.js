import React from "react";
import NumberFormat from "react-number-format";
import DollarLabel from "../../../../components/Label/DollarLabel";
import tw from "twin.macro";
import FallbackImage from "../../../../components/Image/FallbackImage"; //eslint-disable-line

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
const AmountColumn = tw.div`text-sm text-left text-gray-600 dark:text-gray-200 w-1/2 lg:w-1/3`
const TwoColumns = tw.div`grid grid-cols-2`

const ThinGreen = tw.span`text-green-500 font-thin`

const TotalColumn = tw.div`text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5 justify-items-end grid`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Bold = tw.span`font-bold text-sm`

function BorrowList({borrowings}) {
    return <ListContainer>
        <List>
            {
                borrowings.map((borrow, i) => {
                    return (<BorrowElement key={i} borrow={borrow}/>)
                })
            }
        </List>
    </ListContainer>
}

function BorrowElement({borrow}) {
    return (
        <ListItem>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <FallbackImage src={borrow.protocol.logo}/>
                            </Image>
                            <OverlayImage>
                                <FallbackImage src={borrow.network.logo}/>
                            </OverlayImage>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    {borrow.name}
                </NameColumn>
                <AmountColumn>
                    <TwoColumns>
                        <NumberFormat
                            value={borrow.amount} displayType={'text'} decimalScale={4}
                            thousandSeparator={true}/>
                        <ThinGreen>{borrow.symbol}</ThinGreen>
                    </TwoColumns>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                            <DollarLabel amount={borrow.dollarValue}/>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    )
}

export default function BorrowingDetails({protocol, dashboardHooks}) {

    const elements = dashboardHooks.borrowings.filter(borrow => {
        return borrow.protocol.slug === protocol.slug
    })


    if (elements.length === 0) {
        return (
            <></>
        )
    }
    return (
        <Container>
            <Header>
                <HeaderText>Borrowing Overview (<DollarLabel
                    amount={dashboardHooks.totalBorrowingForProtocol(protocol)}/>)</HeaderText>
            </Header>
            <BorrowList borrowings={elements}/>
        </Container>
    )
};