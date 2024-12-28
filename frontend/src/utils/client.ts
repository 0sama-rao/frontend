import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Forward backend errors as it is 
    return Promise.reject(error.response?.data || { message: 'An error occurred' });
  }
);

export default apiClient;
