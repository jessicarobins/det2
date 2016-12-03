import axios from 'axios';

const service = {
  getLists: () => axios.get('/lists'),
  getTemplates: () => axios.get('/template'),
  getList: (cuid) => axios.get(`/lists/${cuid}`)
};

export default service;

