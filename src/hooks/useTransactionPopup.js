import Popup from "reactjs-popup";
import React, {useState} from "react";
import tw from "twin.macro";
import ClipLoader from "react-spinners/ClipLoader";

const Container = tw.div`grid w-full justify-items-center`;
const NextStepIcon = tw.div`w-8 h-8 mr-4`
const TransactionSteps = tw.div`flex flex-col w-full mx-2 mb-8`

const TransactionStep = tw.div`items-center my-2 hover:border-blue-500 border-2 font-bold text-gray-700 hover:text-blue-500 hover:border-2 w-full flex flex-row rounded rounded-lg p-4`
const CloseContainer = tw.div`p-4 w-full`
const Header = tw.h1`text-lg font-black text-purple-600`

export default function useTransactionPopup() {

    const [open, setOpen] = useState(false);
    const [transactionState, setTransactionState] = useState(null);

    function getStateIcon(loadingState, finishedStates = []) {
        if (transactionState === loadingState) {
            return (
                <NextStepIcon> <ClipLoader
                    color={'rgb(36, 195, 163)'}
                    loading={true}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                </NextStepIcon>
            )
        } else if (finishedStates.includes(transactionState)) {
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

    const closeModal = () => setOpen(false);

    const html = (
        <Popup modal open={open} onClose={closeModal}>
            <Container>
                <CloseContainer>
                    <a className="close" onClick={closeModal}>
                        &times;
                    </a>
                </CloseContainer>
                <Header>Transaction Progress</Header>
                <TransactionSteps>
                    <TransactionStep>
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
    )

    return {
        html,
        setTransactionState,
        open: () => setOpen(true)
    }
};

