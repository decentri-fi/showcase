import defitrack from "@defitrack/js-client";

export const lendingPositions = async (address, protocol) => {
    return await defitrack.lending().positions(protocol.slug, address);
}

export const fetchLendingMarketsForToken = async (network, address, protocol) => {
    return await defitrack.lending().marketsForToken(protocol.slug, address, network)
}