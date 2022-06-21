import axios from "axios";

export const fetchClaimables = async (address, protocol) => {
    const result = await axios.get(`https://api.defitrack.io/${protocol.slug}/${address}/claimables`)
    return result.data
}