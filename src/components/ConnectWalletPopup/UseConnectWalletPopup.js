import Popup from "reactjs-popup";
import React, {useState} from "react";

import tw from "twin.macro";
import useWeb3 from "../../hooks/web3";

const Container = tw.div`grid w-full justify-items-center`;
const CloseContainer = tw.div`p-4 w-full`
const Header = tw.h1`text-lg font-black text-purple-600`
const ConnectList = tw.div`flex flex-col w-full mx-2 mb-8`
const ConnectListItem = tw.div`my-2 hover:border-blue-200 border-2 hover:border-2 w-full flex flex-row rounded rounded-lg p-4`

export default function useConnectWalletPopup() {

    const web3 = useWeb3();

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return {
        html: (
            <Popup modal open={open} onClose={closeModal}>
                <Container>
                    <CloseContainer>
                        <a className="close" onClick={closeModal}>
                            &times;
                        </a>
                    </CloseContainer>
                    <Header>Connect Wallet</Header>
                    <ConnectList>
                        <ConnectListItem onClick={() => web3.metamaskLogin()}>Metamask</ConnectListItem>
                        <ConnectListItem>Trust Wallet</ConnectListItem>
                    </ConnectList>
                </Container>
            </Popup>
        ),
        open: () => setOpen(true)
    }

}