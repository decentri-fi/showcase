import {withContract} from "../../withContract";
import YeetInBeefy from "../../../constants/abis/defitrack/YeetInBeefy.json";

export const useBeefyYeet = (web3ReactContextInterface) => {

    const beefyYeetInAddress = "0x862EdCec8bD1e356b3923fd8Ebf7Ac38da4418B1"

    const yeetIn = async (fromToken, amount, beefyVault, underlyingYeet) => {
        console.log(`Calling ${beefyYeetInAddress} : FROM: ${fromToken} ->  amount: ${amount} -> Moo: ${beefyVault} -> (using underlying yeet: ${underlyingYeet})`)
        const contract = withContract(beefyYeetInAddress, YeetInBeefy, web3ReactContextInterface)
        return await contract.PerformYeetIn(
            fromToken, amount, 0, beefyVault, underlyingYeet
        )
    }

    return {
        yeetIn: yeetIn,
        beefyYeetInAddress: beefyYeetInAddress
    }
}