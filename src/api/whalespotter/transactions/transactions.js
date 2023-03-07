import axios from "axios";

export async function getEvents(address, owner) {
    const result = await axios.get(`https://whalespotter.decentri.fi/events/${address}`, {
        headers: {
            'owner': owner
        }
    })
    return result.data;
}