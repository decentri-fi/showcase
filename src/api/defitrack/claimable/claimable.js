import defitrack from "@defitrack/js-client";

export const fetchClaimables = async (address, protocol) => {
    return defitrack.claiming().getClaimables(protocol.slug, address)
}