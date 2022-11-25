import axios from "axios";
import defitrack from "@defitrack/js-client";

export const farmingPositions = async (address, protocol) => {
    return await defitrack.farming().positions(protocol.slug, address);
}

export const fetchStakingById = async (address, protocol, network, id) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol.slug}/staking/${address}/positions?stakingElementId=${id}&network=${network.name}`);
    return result.data;
}

export const fetchStakingMarketsForToken = async (network, protocol, tokenAddress) => {
    return await defitrack.farming().marketsForToken(protocol.slug, tokenAddress, network)
}

export const fetchStakingMarketById = async (network, protocol, stakingId) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol}/staking/markets/${stakingId}?network=${network}`);
    return result.data;
}