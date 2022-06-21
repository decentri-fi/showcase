import axios from "axios";

export const calculatePrice = async (priceRequest) => {
    const result = await axios.post(`https://api.defitrack.io/price`, priceRequest)
    return result.data
};