import useWeb3 from "../web3";
import {SiweMessage} from "siwe";

export default function useSiwe() {
    const domain = window.location.host;
    const origin = window.location.origin;

    const web3 = useWeb3();

    function createSiweMessage(address, statement) {
        const message = new SiweMessage({
            domain,
            address,
            statement,
            uri: origin,
            version: '1',
            chainId: '1'
        });
        return message.prepareMessage();
    }

    async function createMessage() {
        const signer = web3.web3React.provider.getSigner();
        let s = createSiweMessage(
            signer.getAddress(),
            'Sign in with Ethereum to https://decentri.fi.'
        );
        console.log(s);
        return s;
    }

    async function createSignature() {
        const signer = web3.web3React.provider.getSigner();
        return await signer.signMessage(await createMessage());
    }

    async function getMessage(address) {
        if (localStorage.getItem(`siwe_message`) == null) {
            localStorage.setItem(`siwe_message`, await createMessage(address));
        }
        return localStorage.getItem(`siwe_message`);
    }

    async function getSignature() {
        if (localStorage.getItem(`siwe_signature`) == null) {
            localStorage.setItem(`siwe_signature`, await createSignature());
        }
        return localStorage.getItem(`siwe_signature`);
    }

    return {
        getMessage,
        getSignature
    }
}