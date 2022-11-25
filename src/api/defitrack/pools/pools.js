import axios from "axios";
import defitrack from "@defitrack/js-client";

export const poolingPositions = async (address, protocol) => {
    return await defitrack.pooling().positions(protocol.slug, address)
}

export const fetchPoolingMarketsForToken = async (network, protocol, address) => {
    return await defitrack.pooling().marketsForToken(protocol.slug, address, network)
}

export const fetchPoolingMarketAlternativesForToken = async (network, protocol, address) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol.slug}/pooling/markets/alternatives?network=${network}&token=${address}`);
    return result.data;
}

export const fetchPoolingMarketById = async (network, protocol, poolingMarketId) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol}/pooling/markets/${poolingMarketId}?network=${network}`);
    return result.data;
}