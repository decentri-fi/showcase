import axios from "axios";

export async function getTransactions(owner) {
    const result = await axios.get('https://whalespotter.decentri.fi/transactions', {
        headers: {
            'owner': owner
        }
    })
    return result.data;
}