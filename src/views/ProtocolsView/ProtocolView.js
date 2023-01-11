import React from 'react';
import useProtocolViewHooks from "./hooks/protocolview-hooks";
import PoolingOpportunities from "../../components/PoolingOpportunities/PoolingOpportunities";
import LendingOpportunities from "../../components/LendingOpportunities/LendingOpportunities";
import FarmingOpportunities from "../../components/FarmingOpportunities/FarmingOpportunities";
import tw from "twin.macro";
import FallbackImage from "../../components/Image/FallbackImage";
import DollarLabel from "../../components/Label/DollarLabel";
import {Button} from "@mui/material";

const Container = tw.div`w-full lg:w-1/2`

const Address = tw.span`hidden lg:block font-bold text-base text-black dark:text-white ml-2`
const ShortAddress = tw.span`lg:hidden block font-bold text-base text-black dark:text-white ml-2 border-b`
const ENS = tw.span`text-sm text-gray-500 dark:text-white ml-2`
const Blockie = tw.span`hidden lg:block rounded-xl relative p-2 w-24 `;
const GeneralInfo = tw.div`grid flex items-center mb-3 flex-col lg:flex-row w-full`

const LeftColumn = tw.div` w-full p-4 bg-white dark:bg-gray-700`

const AddressInfo = tw.div`flex items-center`
const AddressText = tw.div`flex flex-col`
const Wrapper = tw.div`flex grid justify-items-center flex-wrap lg:flex-nowrap p-4`;
const Center = tw.div`w-full lg:w-2/3 border rounded-xl`
const PortfolioValue = tw.div`lg:justify-items-end justify-items-center grid text-xs w-full`
const PortfolioValueContainer = tw.div`bg-gray-200 p-4 flex flex-col rounded-xl w-2/3 lg:w-1/2`
const RefreshContainer = tw.div`text-3xl font-bold flex flex-col lg:flex-row`;
const PortfolioTitle = tw.span`text-center lg:text-left`
const HorizontalCenter = tw.div`pl-1 flex items-center justify-items-center grid w-full lg:ml-8`

export default () => {

    const protocolHooks = useProtocolViewHooks();
    let protocol = protocolHooks.protocol;

    if (protocol == null) {
        return <></>
    } else {
        return (
            <>
                <Wrapper>
                    <Center>
                        <LeftColumn>
                            <GeneralInfo>
                                {
                                    <AddressInfo>
                                        <Blockie><FallbackImage src={protocol.logo}/></Blockie>
                                        <AddressText>
                                            <Address>{protocol.name}</Address>
                                        </AddressText>
                                    </AddressInfo>
                                }

                                <PortfolioValue>
                                    <PortfolioValueContainer>
                                        <PortfolioTitle>Networks</PortfolioTitle>
                                        <RefreshContainer>
                                            <PortfolioTitle>{protocolHooks.networks.length}</PortfolioTitle>
                                            {
                                                true &&
                                                <HorizontalCenter>
                                                    <Button
                                                        variant={"contained"}
                                                        color={"primary"}
                                                        size={"small"} onClick={() => console.log('refresh')}>
                                                        <svg viewBox="0 0 25 25" height={"24px"} width="24px"
                                                             fill="none">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                                               strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <circle cx="12.5" cy="12.5" r="1.5" fill="#47ffa9"
                                                                        stroke="#47ffa9" strokeWidth="1.2"></circle>
                                                            </g>
                                                        </svg>
                                                        Synced
                                                        <svg tw={"ml-5"} fill="#ffffff" height="8px" width="8px"
                                                             version="1.1"
                                                             id="Capa_1" viewBox="0 0 489.645 489.645">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                                               strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <g>
                                                                    <path
                                                                        d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3 c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5 c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8 c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2 C414.856,432.511,548.256,314.811,460.656,132.911z"></path>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </Button>
                                                </HorizontalCenter>
                                            }
                                        </RefreshContainer>
                                    </PortfolioValueContainer>
                                </PortfolioValue>
                            </GeneralInfo>
                        </LeftColumn>
                    </Center>
                </Wrapper>

                {
                    (!protocolHooks.scannedFarmingOpportunities || protocolHooks.farmingOpportunities.length > 0) &&
                    <FarmingOpportunities farmingOpportunities={protocolHooks.farmingOpportunities}></FarmingOpportunities>
                }

                {
                    !protocolHooks.scannedPoolingOpportunities || protocolHooks.poolingOpportunities.length > 0 &&
                    <PoolingOpportunities poolingOpportunities={
                        protocolHooks.poolingOpportunities
                    } title={"Pooling Opportunities"}></PoolingOpportunities>
                }

                {
                    (!protocolHooks.scannedLendingOpportunities || protocolHooks.lendingOpportunities.length > 0) &&
                    <LendingOpportunities lendingOpportunities={protocolHooks.lendingOpportunities}></LendingOpportunities>
                }
            </>
        )
    }

};