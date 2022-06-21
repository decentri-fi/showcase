import React, {useState} from 'react';
import swal from 'sweetalert'
import NumberFormat from "react-number-format";
import {useClaims} from "../../../../hooks/useClaims";
import useWeb3, {useActiveWeb3React} from "../../../../hooks/web3";
import DollarLabel from "../../../../components/Label/DollarLabel";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import FallbackImage from "../../../../../src/components/Image/FallbackImage";
import tw from "twin.macro";

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

function ClaimableRow({claimable, claimHook}) {

    return (
        <li tw="flex flex-row hover:bg-indigo-100">
            <div tw="select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b">
                <div
                    tw="flex flex-col w-1/12 h-10 justify-center items-center mr-4 hidden lg:block lg:visible">
                    <a href="#" tw="block relative">
                        <div tw="flex flex-nowrap">
                            <div tw="h-10 w-10">
                                <FallbackImage src={claimable.protocol.logo}/>
                            </div>
                            <div tw="h-4 w-4 -mx-2 ">
                                <FallbackImage src={claimable.network.logo}/>
                            </div>
                        </div>
                    </a>
                </div>
                <div tw="flex-1 pl-1 mr-16 w-1/3 lg:w-2/5">
                    <div tw="font-medium text-xs text-green-600 dark:text-white">
                        {claimable.name}
                    </div>
                </div>
                <div tw="flex flex-col lg:flex-row text-left text-gray-600 dark:text-gray-200 w-1/3 lg:w-2/5">
                    <div tw="lg:w-1/2 w-full">
                        <div>
                            <span tw="text-gray-600  text-sm">
                                        <NumberFormat
                                            value={claimable.claimableToken.amount} displayType={'text'} decimalScale={4}
                                            thousandSeparator={true}/>
                            </span> <span
                                tw="text-green-500 font-thin text-xs">{claimable.claimableToken.symbol}</span>
                        </div>
                        <div tw="font-bold">
                            <DollarLabel amount={claimable.claimableToken.dollarValue}/>
                        </div>
                    </div>
                    <div tw="grid w-full  lg:w-1/2 justify-items-center lg:justify-items-end">
                        <ClaimButton claimHook={claimHook} claimable={claimable}/>
                    </div>
                </div>
            </div>
        </li>
    );
}

function ClaimableList({claimables, activeWeb3}) {

    const claimHook = useClaims(activeWeb3);

    return (
        <div
            tw="flex flex-col w-full mx-auto items-center justify-center bg-white">
            <ul tw="flex flex-col w-full ">
                {
                    claimables.map((claimable, idx) => {
                        return <ClaimableRow key={idx} claimHook={claimHook} claimable={claimable}/>
                    })
                }
            </ul>
        </div>
    )
}

export default function ClaimableDetails({claimables, dashboardHooks}) {

    const activeWeb3 = useActiveWeb3React()

    if (claimables.length === 0) {
        return (
            <></>
        )
    } else {

        return (
        <div tw="grid w-full justify-items-center mb-4">
            <div tw="w-full lg:w-1/2  bg-white py-4">
                <div tw="flex items-center mb-2 ">
                    <h3 tw="text-sm font-medium mb-2 bg-gray-600 rounded-r p-1 text-white">Claimable Rewards (<DollarLabel
                        amount={dashboardHooks.totalClaimables}/>)</h3>
                </div>
                <div tw="w-full px-4">
                    <ClaimableList activeWeb3={activeWeb3} claimables={claimables}/>
                </div>
            </div>
        </div>
        );
    }
};