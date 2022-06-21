import axios from "axios";

export const fetchPoolingsV2 = async (address, protocol) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/pooling/${address}/positions`);
    return result.data;
}

export const fetchPoolingMarketsV2 = async (protocol) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/pooling/markets`);
    return result.data;
}

export const fetchPoolingMarketsForToken = async (network, protocol, address) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/pooling/markets?network=${network}&token=${address}`);
    return result.data;
}

export const fetchPoolingMarketAlternativesForToken = async (network, protocol, address) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/pooling/markets/alternatives?network=${network}&token=${address}`);
    return result.data;
}

export const fetchPoolingMarketById = async (network, protocol, poolingMarketId) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol}/pooling/markets/${poolingMarketId}?network=${network}`);
    return result.data;
}