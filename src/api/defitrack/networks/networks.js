import axios from 'axios';

export const fetchNetworks = async () => {
    const response = await axios.get('https://api.defitrack.io/networks');
    return response.data
}