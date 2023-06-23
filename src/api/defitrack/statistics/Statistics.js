import axios from "axios";

export async function getStatistics() {
    const result = await axios.get("https://api.decentri.fi/statistics/statistics");
    return result.data;
}