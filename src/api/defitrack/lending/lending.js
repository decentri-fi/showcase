import defitrack from "@defitrack/js-client";

export const lendingPositions = async (address, protocol) => {
    try {
        return await defitrack.lending().positions(protocol.slug, address);
    } catch (ex) {
        console.log(`unable to fetch lending positions for ${protocol.slug} for address ${address}`);
        return [];
    }
}

export const fetchLendingMarketsForToken = async (network, address, protocol) => {
    return await defitrack.lending().marketsForToken(protocol.slug, address, network)
}