import axios from "axios";
import defihub from "@decentri.fi/defi-hub";

export const poolingPositions = async (address, protocol) => {
    try {
        return await defihub.pooling().positions(protocol.slug, address)
    } catch (ex) {
        console.log(`unable to fetch pooling positions for ${protocol.slug} for address ${address}`);
        return [];
    }
}

export const fetchPoolingMarketsForToken = async (network, protocol, address) => {
    return await defihub.pooling().marketsForToken(protocol.slug, address, network)
}

export const fetchPoolingMarketAlternativesForToken = async (network, protocol, address) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol.slug}/pooling/markets/alternatives?network=${network}&token=${address}`);
    return result.data;
}

export const fetchPoolingMarketById = async (network, protocol, poolingMarketId) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol}/pooling/markets/${poolingMarketId}?network=${network}`);
    return result.data;
}