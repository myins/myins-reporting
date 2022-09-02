import axios from 'axios';

export default axios.create({
  baseURL: 'https://myinsn-backend-dev-2011842023.us-west-2.elb.amazonaws.com/'
});
