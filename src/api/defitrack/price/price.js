import defitrack from "@defitrack/js-client";

export const calculatePrice = async (priceRequest) => {
    return await defitrack.prices().calculate(priceRequest.address, priceRequest.network, priceRequest.amount);
};