import defitrack from "@defitrack/js-client";

export const fetchNetworks = async () => {
    return await defitrack.networks().list();
}