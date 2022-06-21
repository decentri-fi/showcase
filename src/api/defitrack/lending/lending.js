import axios from "axios";

export const fetchLendingsV2 = async (address, protocol) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/lending/${address}/positions`);
    return result.data;
}

export const fetchLendingMarketsV2 = async (protocol) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/lending/markets`);
    return result.data;
}

export const fetchLendingMarketsForToken = async (network, address, protocol) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/lending/markets?network=${network}&token=${address}`);
    return result.data;
}