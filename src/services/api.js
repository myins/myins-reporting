import axios from 'axios';

export default axios.create({
  baseURL: 'http://myinsn-backend-dev-2011842023.us-west-2.elb.amazonaws.com/'
});
