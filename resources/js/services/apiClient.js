import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    // Allows sending cookies for session-based auth on the same domain
    withCredentials: true 
});

// Optionally, add interceptors for global error handling
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
