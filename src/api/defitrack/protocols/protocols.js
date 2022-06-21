import axios from 'axios';

export const fetchProtocols = async () => {
    const response = await axios.get('https://api.defitrack.io/protocols');
    return response.data
}