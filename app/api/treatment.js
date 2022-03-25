import Resource from '@utils/resource';

export default new Resource('/Treatments', {
  postTreatment: {
    url: '',
    method: 'post',
  },
  postBookingByTreatmentId: {
    url: `{treatmentId}/bookings`,
    method: 'post',
  },
  getBookingsByTreatmentId: {
    url: '{id}/bookings',
    method: 'get',
  },
});
