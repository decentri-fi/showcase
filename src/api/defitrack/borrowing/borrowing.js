import axios from "axios";

export const fetchBorrowingsV2 = async (address, protocol) => {
    const result = await axios.get(`https://api.decentri.fi/${protocol.slug}/borrowing/${address}/positions`);
    return result.data;
}