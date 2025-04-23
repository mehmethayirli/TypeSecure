import axios from 'axios';

const API_URL = '/api'; // Updated to use relative path

export const analyzeSmartContract = async (code: string) => {
  try {
    // Check if server is reachable before making the request
    await axios.get(`${API_URL}/health`).catch(() => {
      throw new Error('Backend server is not running or not reachable');
    });
    
    const response = await axios.post(`${API_URL}/analyze`, { code });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error('Network connection error. Please check your internet connection and ensure the server is running.');
      }
      if (error.response) {
        throw new Error(error.response.data.message || `Server error: ${error.response.status}`);
      }
    }
    console.error('API Error:', error);
    throw new Error('An unexpected error occurred while communicating with the server');
  }
};