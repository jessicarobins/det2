import axios from 'axios';

const service = {
  getLists: () => axios.get('/lists'),
  getList: (cuid) => axios.get(`/lists/${cuid}`)
};

export default service;

