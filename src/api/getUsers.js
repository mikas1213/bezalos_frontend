
import axios from "./axios";

const getData = async () => {
    const { data } = await axios.get('/user');
    return data;
};

export default getData;