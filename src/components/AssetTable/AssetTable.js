import React from 'react';
import tw from "twin.macro";
import {useHistory} from "react-router-dom";
import FallbackImage from "../Image/FallbackImage";
import NumberFormat from "react-number-format";
import APYLabel from "../Label/APYLabel";
import DollarLabel from "../Label/DollarLabel";
import PlaceholderLoading from "react-placeholder-loading";
import {Pagination} from "../Pagination/Pagination";

const Container = tw.div`w-full my-4`

const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white dark:bg-gray-800`
const List = tw.ul`flex flex-col w-full`

const ListItem = tw.li`flex flex-row`
const Row = tw.div`select-none cursor-pointer flex flex-1 items-center py-2 border-b hover:bg-indigo-100`
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
const PullRight = tw.div`flex items-center justify-items-end`
const Bold = tw.span`font-bold text-sm`
const Hidden = tw.span`hidden lg:block`

const ActionButton = tw.div`ml-4`

const PaginationSection = tw.div`mt-4 flex flex-row justify-center w-full`
const Center = tw.div`flex`

function DummyList() {
    return (
        <ListContainer>
            <List>
                <DummyRow key={1}/>
            </List>
        </ListContainer>
    )
}


export default function ({entries = [], header, showPlaceholder = false, usePagination = false}) {
    let filteredEntries = entries;
    let pagination = null;

    if (usePagination) {
        const {
            pagination: paginationSection,
            elements
        } = Pagination(entries);
        filteredEntries = elements;
        pagination = paginationSection;
    }

    const list = () => {
        if (entries.length === 0 && showPlaceholder) {
            return <DummyList/>
        } else {
            return (
                <>
                    <ListContainer>
                        <List>
                            {
                                filteredEntries.map((entry) => {
                                    return (
                                        <ListEntry key={Math.random().toString(36).substring(7)} entry={entry}/>
                                    )
                                })
                            }
                        </List>

                    </ListContainer>
                    <PaginationSection>
                        <Center>
                            {pagination}
                        </Center>
                    </PaginationSection>
                </>

            )
        }
    };

    return (
        <Container>
            {header}
            {list()}
        </Container>
    );
};

function ListEntry({entry}) {


    return (
        <ListItem onClick={entry.onClick}>
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
                        <ActionButton>
                            {
                                entry.actionButton &&
                                entry['actionButton']
                            }
                        </ActionButton>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    )
}

function DummyRow() {
    return (
        <ListItem>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <PlaceholderLoading width={30} height={30} shape={"circle"}/>
                            </Image>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    <PlaceholderLoading width={50} height={10} shape={"rect"}/>
                </NameColumn>
                <AmountColumn>
                    <TwoColumns>
                        <div>
                            <PlaceholderLoading width={50} height={10} shape={"rect"}/>
                        </div>
                        <ThinGreen>
                            <PlaceholderLoading width={50} height={10} shape={"rect"}/>
                        </ThinGreen>
                    </TwoColumns>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    );
}