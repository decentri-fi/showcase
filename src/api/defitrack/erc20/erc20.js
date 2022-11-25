import defitrack from "@defitrack/js-client";

export const fetchWrappedToken = async (network) => {
    return await defitrack.erc20().wrapped(network);
}

export const fetchTokenInformation = async (address, network) => {
    return await defitrack.erc20().info(network, address);
}

export const fetchTokenBalance = async (token, user, network) => {
    return await defitrack.erc20().getTokenBalance(network, token, user);
}
