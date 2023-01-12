import axios from "axios";
import defitrack from "@defitrack/js-client";

export const fetchBorrowingsV2 = async (address, protocol) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol.slug}/borrowing/${address}/positions`);
    return result.data;
}