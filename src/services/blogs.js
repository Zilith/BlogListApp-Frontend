import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((request) => request.data);
};

export default { getAll };
