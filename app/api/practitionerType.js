import Resource from '@utils/resource';

export default new Resource('/practitionerSpecialties', {
  getPractitionerTypes: {
    url: ``,
    method: 'get',
  },
  getPractitionersByTypeId: {
    url: `{id}/practitioners`,
    method: 'get',
  },
});
