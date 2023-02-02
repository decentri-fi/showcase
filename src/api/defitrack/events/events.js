import axios from "axios";

export const getEvents = async (tx, network) => {
    const result = await axios.get(`https://api.decentri.fi/events/decode/${tx}?network=${network}`);
    return result.data;
}