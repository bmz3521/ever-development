import Resource from '@utils/resource';

export default new Resource('/communications', {
  getToken: {
    url: `getToken`,
    method: 'get',
  },
});
