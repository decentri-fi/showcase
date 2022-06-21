import axios from "axios";

export const fetchStakingsV2 = async (address, protocol) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/staking/${address}/positions`);
    return result.data;
}

export const fetchStakingById = async (address, protocol, network,  id) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/staking/${address}/positions?stakingElementId=${id}&network=${network.name}`);
    return result.data;
}

export const fetchStakingMarketsForToken = async (network, protocol, tokenAddress) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/staking/markets?network=${network}&token=${tokenAddress}`);
    return result.data;
}

export const fetchStakingMarketById = async (network, protocol, stakingId) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol}/staking/markets/${stakingId}?network=${network}`);
    return result.data;
}