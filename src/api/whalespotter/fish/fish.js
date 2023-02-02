import axios from "axios";

export async function getFish(owner) {
    const result = await axios.get('https://whalespotter.decentri.fi/fish', {
            headers:
                {
                    'owner':
                    owner
                }
        }
    )
    return result.data;
}

export async function addFish(owner, fish) {
    const result = await axios.put('https://whalespotter.decentri.fi/fish', {
        address: fish
    }, {
        headers: {
            'owner': owner
        }
    })
    return result.data;
}