import axios from 'axios';

const rolesLoader = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`);

    return response;
}

export default rolesLoader;