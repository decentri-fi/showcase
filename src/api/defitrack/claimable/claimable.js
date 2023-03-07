import defitrack from "@defitrack/js-client";

export const fetchClaimables = async (address, protocol) => {
    try {
        return await defitrack.claiming().getClaimables(protocol.slug, address)
    } catch(_) {
        console.log(`unable to fetch claimables for ${protocol.slug} for address ${address}`);
        return [];
    }
}