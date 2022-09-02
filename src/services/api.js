import axios from 'axios';

export default axios.create({
  baseURL: 'https://prod-api.myins.co.uk/'
});
