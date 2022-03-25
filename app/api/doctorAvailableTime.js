import Resource from '@utils/resource';

export default new Resource('/doctorAvailableTimes', {
  getAvailableTime: {
    url: '?filter[where][practitionerId]=2',
    method: 'get',
  },
});
