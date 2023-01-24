import {Button} from "@mui/material";
import useSiwe from "../hooks/siwe/useSiwe";

export default function SignInWithEthereumView() {

    const {getMessage, getSignature} = useSiwe();

    return (
        <>
            <Button onClick={async () => {
                console.log(JSON.stringify({
                    message: await getMessage(), signature: await getSignature()
                }));
            }}>Test</Button>
        </>
    )
}