import {SiweMessage} from "siwe";
import useWeb3 from "../hooks/web3";
import {Button} from "@mui/material";

const domain = window.location.host;
const origin = window.location.origin;

export default function SignInWithEthereumView() {

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

    return (
        <>
            <Button onClick={async () => {
                const signer = web3.web3React.provider.getSigner();

                const message = createSiweMessage(
                    await signer.getAddress(),
                    'Sign in with Ethereum to the app.'
                );
                const signature = await signer.signMessage(message)
                console.log(JSON.stringify({
                    message, signature
                }));
            }}>Test</Button>
        </>
    )
}