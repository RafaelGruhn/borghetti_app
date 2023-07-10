import axios from 'axios';

let config = {
  baseURL: 'https://api.borghetti.gahlert.me/',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default axios.create(config);
