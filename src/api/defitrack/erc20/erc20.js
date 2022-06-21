import axios from "axios";

export const fetchWrappedToken = async (network) => {
    const result = await axios.get(`https://api.defitrack.io/erc20/${network}/wrapped`)
    return result.data
}

export const fetchERC20Information = async (address, network) => {
    return await fetchTokenInformation(address, network);
}

export const fetchTokenInformation = async (address, network) => {
    const result = await axios.get(`https://api.defitrack.io/erc20/${network}/${address}/token`)
    return result.data
}

export const fetchTokenBalance = async (tokenAddress, userAddress, network) => {
    const result = await axios.get(`https://api.defitrack.io/erc20/${network}/${tokenAddress}/${userAddress}`)
    return result.data
}
