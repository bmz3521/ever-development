import Resource from '@utils/resource';

export default new Resource('/Countries', {
  getCountries: {
    url: '',
    method: 'get',
  },
});
