import useWeb3 from "../../../../hooks/web3";
import {useClaims} from "../../../../hooks/useClaims";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import React, {useState} from "react";
import swal from "sweetalert";
import Popup from "reactjs-popup";
import tw from "twin.macro";
import ClipLoader from "react-spinners/ClipLoader";


const Header = tw.h1`text-lg font-black text-purple-600`
const TransactionSteps = tw.div`flex flex-col w-full mx-2 mb-8`
const CloseContainer = tw.div`p-4 w-full`
const TransactionStep = tw.div`items-center my-2 hover:border-blue-500 border-2 font-bold text-gray-700 hover:text-blue-500 hover:border-2 w-full flex flex-row rounded rounded-lg p-4`
const ConnectItemLogo = tw.img`w-8 h-8 mr-4`
const Container = tw.div`grid w-full justify-items-center`;

const NextStepIcon = tw.div`w-8 h-8 mr-4`

export default function ClaimButton({refreshClaimables, claimable}) {

    const web3 = useWeb3();
    const claim = useClaims(web3)

    const [claimState, setClaimState] = useState(null);

    const claimFn = claimingFunction(claim, claimable, refreshClaimables, setClaimState);


    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    function getStateIcon(loadingState, finishedStates = []) {
        if (claimState === loadingState) {
            return (
                <NextStepIcon> <ClipLoader
                    color={'rgb(36, 195, 163)'}
                    loading={true}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                </NextStepIcon>
            )
        } else if (finishedStates.includes(claimState)) {
            return (
                <NextStepIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M5 13l4 4L19 7"/>
                    </svg>
                </NextStepIcon>
            )
        }
        return (
            <NextStepIcon>
                ...
            </NextStepIcon>
        )
    }

    return (
        <>
            <PrimaryButton onClick={async (e) => {
                setOpen(true);
                await claimFn(e);
            }} label="Claim"/>
            <Popup modal open={open} onClose={closeModal}>
                <Container>
                    <CloseContainer>
                        <a className="close" onClick={closeModal}>
                            &times;
                        </a>
                    </CloseContainer>
                    <Header>Transaction Progress</Header>
                    <TransactionSteps>
                        <TransactionStep onClick={() => web3.metamaskLogin()}>
                            {getStateIcon("signing", ["pending", "mined"])}
                            <p>Sign and submit your transaction</p>
                        </TransactionStep>
                        <TransactionStep>
                            {getStateIcon("pending", ["mined"])}
                            <p>Await your transaction to be mined</p>
                        </TransactionStep>
                    </TransactionSteps>
                </Container>
            </Popup>
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