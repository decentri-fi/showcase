import React from 'react';
import tw from "twin.macro";
import {useHistory} from "react-router-dom";
import FallbackImage from "../Image/FallbackImage";
import NumberFormat from "react-number-format";
import APYLabel from "../Label/APYLabel";
import DollarLabel from "../Label/DollarLabel";

const Container = tw.div`w-full my-4`
const Header = tw.div`w-full flex items-center mb-2`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-sm font-medium mb-2 bg-indigo-600 rounded-r  text-white`
const BalanceText = tw.div`w-9/12 text-right`

const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white dark:bg-gray-800`
const List = tw.ul`flex flex-col w-full`

const ListItem = tw.li`flex flex-row`
const Row = tw.div`select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b`
const IconColumn = tw.div`flex flex-col w-1/12 justify-center items-center mr-4 lg:block`;
const IconBlock = tw.div`block relative`
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 lg:h-8 lg:w-8`
const OverlayImage = tw.div`lg:h-4 lg:w-4 h-2 w-2 -mx-2 `

const NameColumn = tw.div`pl-1 lg:w-1/4 w-3/4 flex-1 font-medium text-indigo-600 dark:text-gray-200 text-xs`
const AmountColumn = tw.div`hidden lg:block text-sm text-left text-gray-600 dark:text-gray-200 lg:w-1/3 w-0`
const TwoColumns = tw.div`grid grid-cols-2`

const ThinGreen = tw.span`text-green-500 font-thin`

const TotalColumn = tw.div`text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5 justify-items-end grid`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Bold = tw.span`font-bold text-sm`
const Hidden = tw.span`hidden lg:block`


export default function ({entries = [], header}) {
    return (
        <Container>
            {header}
            <ListContainer>
                <List>
                    {
                        entries.map((entry) => {
                            return (
                                <ListEntry key={Math.random().toString(36).substring(7)} entry={entry}/>
                            )
                        })
                    }
                </List>
            </ListContainer>
        </Container>

    );
};

function ListEntry({entry}) {

    const history = useHistory();

    return (
        <ListItem onClick={() => {
            history.push(entry.detailUrl)
        }}>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <FallbackImage src={entry.logo}/>
                            </Image>
                            <OverlayImage>
                                <FallbackImage src={entry.networkLogo}/>
                            </OverlayImage>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    {entry.name}
                </NameColumn>
                <AmountColumn>
                    <Hidden>
                        <TwoColumns>
                            <NumberFormat
                                value={entry.amount} displayType={'text'} decimalScale={4}
                                thousandSeparator={true}/>
                            <ThinGreen> {entry.symbol}</ThinGreen>
                        </TwoColumns>
                        <div>
                            {
                                entry.apr && <div>
                                    <APYLabel amount={entry.apr * 100}/>
                                    <span>% APR</span>
                                </div>
                            }
                        </div>
                    </Hidden>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                            <DollarLabel amount={entry.dollarValue}/>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    )
}