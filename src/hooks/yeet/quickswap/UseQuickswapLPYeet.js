import {withContract} from "../../withContract";
import YeetInQuickswap from "../../../constants/abis/defitrack/YeetInQuickswap.json";

export const useQuickswapLPYeet = (web3ReactContextInterface) => {

    const quickswapYeetInAddress = "0xf369F7b3610FCC8886482d123aFa71CB1EA67335"

    const yeetIn = async (fromToken, toLP, amount) => {
        console.log(`yeet in ${fromToken} -> ${toLP} amount: ${amount}`)
        const contract = withContract(quickswapYeetInAddress, YeetInQuickswap, web3ReactContextInterface)
        return await contract.PerformYeetIn(
            fromToken, toLP, amount, 0
        )
    }

    return {
        yeetIn: yeetIn,
        quickswapYeetInAddress: quickswapYeetInAddress
    }
}