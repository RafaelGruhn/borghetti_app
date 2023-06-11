import axios from 'axios';

let config = {
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default axios.create(config);
