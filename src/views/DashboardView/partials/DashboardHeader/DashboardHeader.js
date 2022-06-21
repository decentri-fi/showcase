import React from "react";

import Toggle from "../../../../components/Toggle/Toggle";
import FallbackImage from "../../../../components/Image/FallbackImage";
import makeBlockie from "ethereum-blockies-base64";

import tw from "twin.macro";
import DollarLabel from "../../../../components/Label/DollarLabel";
import DetailCard from "../../../../components/Card/DetailCard";
import {CurrencyDollarIcon} from "@heroicons/react/outline";

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
            return (100 * doneScanning / (totalScanning)) + '%'
        }
    }

    function updateSmallValues(newValue) {
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

    const Address = tw.span`hidden lg:block font-bold text-base text-black dark:text-white ml-2`
    const ShortAddress = tw.span`lg:hidden block font-bold text-base text-black dark:text-white ml-2 border-b`
    const ENS = tw.span`text-sm text-gray-500 dark:text-white ml-2`
    const Blockie = tw.span`hidden lg:block rounded-xl relative p-2 w-32 `;
    const AddressInformation = tw.div`flex items-center mb-6 flex-col lg:flex-row`

    const LeftColumn = tw.div` w-full m-4 shadow-md p-4 bg-white dark:bg-gray-700`
    const RightColumn = tw.div`lg:w-3/12 lg:block hidden  m-4  p-4 bg-white dark:bg-gray-700`

    return (
        <>
            <div tw="flex w-full flex-wrap lg:flex-nowrap">
                <LeftColumn>
                    <AddressInformation>
                        <div tw="flex items-center">
                            <Blockie><FallbackImage src={makeABlockie(address)}/></Blockie>
                            <div tw="flex flex-col">
                                <Address>{address}</Address>
                                <ShortAddress>{sliceAccount(address)}</ShortAddress>
                                {/*<ENS>No ENS name linked.</ENS>*/}
                            </div>
                        </div>

                        <div tw="w-full grid">
                            <div tw=" lg:justify-self-end">
                                <DetailCard
                                    icon={
                                        <CurrencyDollarIcon tw="text-purple-400 h-8 w-8"/>
                                    }
                                    centerHtml={<DollarLabel amount={dashboardHooks.totalBalance}/>}
                                    title={"Portfolio Value"} />
                            </div>
                        </div>
                    </AddressInformation>
                    <div tw="block m-auto">
                        <div>
            <span tw="text-sm inline-block text-gray-500 dark:text-gray-100">
                Progress :<span
                tw="text-gray-700 dark:text-white font-bold"> {doneScanning}</span> / {totalScanning}
            </span>
                        </div>
                        <div tw="w-full h-2 bg-gray-200 rounded-full mt-2">
                            <div style={{
                                width: percentageDone
                            }}
                                 tw="h-full text-center text-xs text-white bg-purple-500 rounded-full">
                            </div>
                        </div>
                    </div>
                </LeftColumn>
            </div>
        </>
    )
};