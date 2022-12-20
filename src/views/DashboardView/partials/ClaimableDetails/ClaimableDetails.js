import React, {useState} from 'react';
import swal from 'sweetalert'
import NumberFormat from "react-number-format";
import {useClaims} from "../../../../hooks/useClaims";
import useWeb3, {useActiveWeb3React} from "../../../../hooks/web3";
import DollarLabel from "../../../../components/Label/DollarLabel";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import FallbackImage from "../../../../../src/components/Image/FallbackImage";
import tw from "twin.macro";
import PlaceholderLoading from "react-placeholder-loading";
import FAQ from "../../../../components/faqs/SingleCol";



const Container = tw.div`w-full my-4`
const Header = tw.div`w-full flex items-center mb-2`
const HeaderTextContainer = tw.div`lg:w-3/12 w-full`
const HeaderText = tw.h3`shadow px-4 py-1 text-lg font-medium mb-2 bg-green-600 rounded-r  text-white`
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

const NameColumn = tw.div`pl-1 lg:w-1/4 w-3/4 flex-1 font-medium text-green-600 dark:text-gray-200 text-xs`
const AmountColumn = tw.div`hidden lg:block text-sm text-left text-gray-600 dark:text-gray-200 lg:w-1/3 w-0`
const TwoColumns = tw.div`grid grid-cols-2`

const ThinGreen = tw.span`text-green-500 font-thin`

const TotalColumn = tw.div`text-sm text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-1/5 justify-items-end grid`
const PullRight = tw.div`flex flex-col grid justify-items-end`
const Bold = tw.span`font-bold text-sm`

const Center = tw.div`grid w-full justify-items-center mb-4`
const Section = tw.div`w-full bg-white py-4`
const Hidden = tw.span`hidden lg:block`


function doClaim(claimHook, claimable) {

    const claim = async (e) => {
        e.stopPropagation();
        try {
            const result = await claimHook.claim(claimable);
            result.wait().then((receipt) => {
                swal({
                    text: "Your rewards were successfully claimed",
                    icon: "success"
                });
            }).catch((err) => {
                swal({
                    text: err.message,
                    icon: "error"
                })
            })
        } catch (err) {
            swal({
                text: err.message,
                icon: "error"
            })
        }
    };
    return claim;
}

function ClaimButton({claimable, claimHook}) {
    const claim = doClaim(claimHook, claimable);

    return (
        <PrimaryButton onClick={claim} label="Claim"/>
    );
}

function DummyRow() {
    return (
        <ListItem>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <PlaceholderLoading width={30} height={30} shape={"circle"} />
                            </Image>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    <PlaceholderLoading width={50} height={10} shape={"rect"} />
                </NameColumn>
                <AmountColumn>
                    <TwoColumns>
                        <div>
                            <PlaceholderLoading width={50} height={10} shape={"rect"} />
                        </div>
                        <ThinGreen>
                            <PlaceholderLoading width={50} height={10} shape={"rect"} />
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


function ClaimableRow({claimable, claimHook}) {

    return (
        <ListItem>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <FallbackImage src={claimable.protocol.logo}/>
                            </Image>
                            <OverlayImage>
                                <FallbackImage src={claimable.network.logo}/>
                            </OverlayImage>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    {claimable.name}
                </NameColumn>
                <AmountColumn>
                    <TwoColumns>
                        <div>
                            <NumberFormat
                                value={claimable.amount} displayType={'text'} decimalScale={4}
                                thousandSeparator={true}/><br />
                            <DollarLabel amount={claimable.dollarValue}/>
                        </div>

                        <ThinGreen>{claimable.token.symbol}</ThinGreen>
                    </TwoColumns>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                            <ClaimButton claimHook={claimHook} claimable={claimable}/>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    );
}

function ClaimableList({claimables, activeWeb3}) {

    const claimHook = useClaims(activeWeb3);

    return (
        <ListContainer>
            <List>
                {
                    claimables.map((claimable, idx) => {
                        return <ClaimableRow key={idx} claimHook={claimHook} claimable={claimable}/>
                    })
                }
            </List>
        </ListContainer>
    )
}

function DummyList() {
    return (
        <ListContainer>
            <List>
                <DummyRow key={1} />
            </List>
        </ListContainer>
    )
}

const HighlightedText = tw.span`text-primary-500`

function PlaceHolder() {
    return (
        <>
            <Center>
                <Section>
                    <Container>
                        <Header>
                            <HeaderTextContainer>
                                <HeaderText>Claimable</HeaderText>
                            </HeaderTextContainer>
                            <BalanceText>
                                <Hidden>
                                    <PullRight>
                                        <HeaderText>
                                            <DollarLabel
                                                amount={0.00}/>
                                        </HeaderText>
                                    </PullRight>
                                </Hidden>
                            </BalanceText>
                        </Header>
                        <DummyList />
                    </Container>
                </Section>
            </Center>
        </>
    )
}

export default function ClaimableDetails({dashboardHooks, showPlaceholder = false}) {

    const activeWeb3 = useActiveWeb3React()

    const claimables = dashboardHooks.claimables;

    if (claimables.length === 0) {
        return (
            showPlaceholder && <PlaceHolder />
        )
    } else {
        return (
            <Center>
                <Section>
                    <Container>
                        <Header>
                            <HeaderTextContainer>
                                <HeaderText>Claimable</HeaderText>
                            </HeaderTextContainer>
                            <BalanceText>
                                <Hidden>
                                    <PullRight>
                                        <HeaderText>
                                            <DollarLabel
                                                amount={dashboardHooks.totalClaimables}/>
                                        </HeaderText>
                                    </PullRight>
                                </Hidden>
                            </BalanceText>
                        </Header>
                        <ClaimableList activeWeb3={activeWeb3} claimables={claimables}/>
                    </Container>
                </Section>
            </Center>
        );
    }
};