import defihub from '@decentri.fi/defi-hub'

export const lendingPositions = async (address, protocol) => {
    try {
        return await defihub.lending().positions(protocol.slug, address);
    } catch (ex) {
        console.log(`unable to fetch lending positions for ${protocol.slug} for address ${address}`);
        return [];
    }
}

export const fetchLendingMarketsForToken = async (network, address, protocol) => {
    return await defihub.lending().marketsForToken(protocol.slug, address, network)
}