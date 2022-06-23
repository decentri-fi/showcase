import axios from "axios";
import defitrack from "@defitrack/js-client";

export const fetchWrappedToken = async (network) => {
    const result = await axios.get(`https://api.defitrack.io/erc20/${network}/wrapped`)
    return result.data
}

export const fetchTokenInformation = async (address, network) => {
    return await defitrack.erc20().info(network, address)
}

export const fetchTokenBalance = async (tokenAddress, userAddress, network) => {
    const result = await axios.get(`https://api.defitrack.io/erc20/${network}/${tokenAddress}/${userAddress}`)
    return result.data
}
