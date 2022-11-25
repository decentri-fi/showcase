import React from "react";

import Toggle from "../../../../components/Toggle/Toggle";
import FallbackImage from "../../../../components/Image/FallbackImage";
import makeBlockie from "ethereum-blockies-base64";

import tw from "twin.macro";
import DollarLabel from "../../../../components/Label/DollarLabel";
import DetailCard from "../../../../components/Card/DetailCard";
import {CurrencyDollarIcon} from "@heroicons/react/outline";

const Address = tw.span`hidden lg:block font-bold text-base text-black dark:text-white ml-2`
const ShortAddress = tw.span`lg:hidden block font-bold text-base text-black dark:text-white ml-2 border-b`
const ENS = tw.span`text-sm text-gray-500 dark:text-white ml-2`
const Blockie = tw.span`hidden lg:block rounded-xl relative p-2 w-32 `;
const GeneralInfo = tw.div`flex items-center mb-6 flex-col lg:flex-row`

const LeftColumn = tw.div` w-full mb-4 shadow-md p-4 bg-white dark:bg-gray-700`

const AddressInfo = tw.div`flex items-center`
const AddressText = tw.div`flex flex-col`
const Wrapper = tw.div`flex w-full flex-wrap lg:flex-nowrap`;

const PortfolioValue = tw.div`lg:justify-self-end text-xs`
const PortfolioValueContainer = tw.div`w-full grid`

const ScanningContainer = tw.div`block m-auto`;
const ProgressText = tw.span`text-sm inline-block text-gray-500 dark:text-gray-100`
const DoneScanningText = tw.span`text-gray-700 dark:text-white font-bold`

const PercentageContainer = tw.div`w-full h-2 bg-gray-200 rounded-full mt-2`;
const Percentage = tw.div`h-full text-center text-xs text-white bg-purple-500 rounded-full`

const DetailCardIcon = tw(CurrencyDollarIcon)`text-purple-400 h-8 w-8`


export default function DashboardHeader({dashboardHooks}) {

    const {
        doneScanning,
        totalScanning,
        address
    }
        = dashboardHooks;

    const sliceAccount = function (address) {
        return `${address.slice(0, 6)}...${address.slice(-6, address.length)}`;
    };

    const percentageDone = calculate(doneScanning, totalScanning);

    function calculate() {
        if (doneScanning === 0 || totalScanning === 0) {
            return "0%"
        } else {
            return (100 * doneScanning / (totalScanning)).toFixed(2) + '%'
        }
    }

    function updateSmallValues(newValue) {
        console.log(newValue)
        dashboardHooks.setHideSmallValues(newValue ? 'true' : 'false');
    }

    function makeABlockie(address) {
        if (address !== null
        ) {
            return makeBlockie(address);
        } else {
            return null;
        }
    }


    return (
            <Wrapper>
                <LeftColumn>
                    <PortfolioValueContainer>
                        <PortfolioValue>
                            <Toggle checkedLabel={"show small values"} uncheckedLabel={"hide small values"} checked={dashboardHooks.hideSmallValues} onChange={updateSmallValues} />
                        </PortfolioValue>
                    </PortfolioValueContainer>
                    <GeneralInfo>
                        <AddressInfo>
                            <Blockie><FallbackImage src={makeABlockie(address)}/></Blockie>
                            <AddressText>
                                <Address>{address}</Address>
                                <ShortAddress>{sliceAccount(address)}</ShortAddress>
                                {/*<ENS>No ENS name linked.</ENS>*/}
                            </AddressText>
                        </AddressInfo>

                        <PortfolioValueContainer>
                            <PortfolioValue>
                                <DetailCard
                                    icon={
                                        <DetailCardIcon />
                                    }
                                    centerHtml={<DollarLabel amount={dashboardHooks.totalBalance}/>}
                                    title={"Portfolio Value"} />
                            </PortfolioValue>
                        </PortfolioValueContainer>
                    </GeneralInfo>
                    <ScanningContainer>
                        <ProgressText>
                            {percentageDone}
                        </ProgressText>
                        <PercentageContainer>
                            <Percentage style={{
                                width: percentageDone
                            }}></Percentage>
                        </PercentageContainer>
                    </ScanningContainer>
                </LeftColumn>
            </Wrapper>
    )
};