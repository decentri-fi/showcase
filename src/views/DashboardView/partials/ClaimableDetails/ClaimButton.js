import useWeb3 from "../../../../hooks/web3";
import {useClaims} from "../../../../hooks/useClaims";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import React from "react";
import swal from "sweetalert";
import tw from "twin.macro";
import useTransactionPopup from "../../../../hooks/useTransactionPopup";

const TransactionSteps = tw.div`flex flex-col w-full mx-2 mb-8`
const CloseContainer = tw.div`p-4 w-full`
const TransactionStep = tw.div`items-center my-2 hover:border-blue-500 border-2 font-bold text-gray-700 hover:text-blue-500 hover:border-2 w-full flex flex-row rounded rounded-lg p-4`
const ConnectItemLogo = tw.img`w-8 h-8 mr-4`
const Container = tw.div`grid w-full justify-items-center`;

const NextStepIcon = tw.div`w-8 h-8 mr-4`

export default function ClaimButton({refreshClaimables, claimable}) {
    const web3 = useWeb3();
    const claim = useClaims(web3)

    const {
        html: transactionPopup,
        setTransactionState,
        open,
    } = useTransactionPopup();

    const claimFn = claimingFunction(claim, claimable, refreshClaimables, setTransactionState);

    return (
        <>
            <PrimaryButton onClick={async (e) => {
                open();
                await claimFn(e);
            }} label="Claim"/>
            {transactionPopup}
        </>
    );
};

function claimingFunction(claimHook, claimable, refreshClaimables, setState) {

    const claim = async (e) => {
        e.stopPropagation();
        try {
            setState("signing");
            const result = await claimHook.claim(claimable);
            setState("pending")
            result.wait().then(() => {
                swal({
                    text: "Your rewards were successfully claimed, refreshing them.",
                    icon: "success"
                });
                setState("mined")
                refreshClaimables();
            });
        } catch (err) {
            swal({
                text: err.message,
                icon: "error"
            })
        }
    };

    return claim;
}