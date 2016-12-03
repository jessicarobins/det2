import { listService } from 'services';

const fetchData = () => {
  return listService.getLists()
          .then(res => res.data);
};

export default fetchData;

