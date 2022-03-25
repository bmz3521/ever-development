import Resource from '@utils/resource';

export default new Resource('/Practitioners', {
  getPractitioners: {
    url: `filterByOrgAndSpecialty?specialtyId={specialtyId}&page={page}`,
    method: 'get',
  },
  getEverPractitioners: {
    url: 'filterByEverAndSpecialty?specialtyId={specialtyId}&page={page}',
    method: 'get',
  },
  getPractitionerDetail: {
    url: '?filter[where][appUserId]={id}',
    method: 'get',
  },
  getTimeSlot: {
    url: '{id}/timeSlots',
    method: 'get',
  },
});
