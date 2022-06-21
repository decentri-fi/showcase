import axios from "axios";

export const fetchNativeBalance = async (address) => {
    const result = await axios.get(`https://api.defitrack.io/balance/${address}/native-balance`)
    return result.data
};

export const fetchTokenBalance = async (address, network) => {
    try {
        const result = await axios.get(`https://api.defitrack.io/balance/${address}/token-balances?network=${network}`);
        return result.data;
    } catch (ex) {
        return []
    }
};