import Resource from '@utils/resource';

export default new Resource('/SymptomGroups', {
  getSymptomGroups: {
    url: ``,
    method: 'get',
  },
  getMedicationForOrgs: {
    url: `{symptomGroupId}/medicationForOrgs`,
    method: 'get',
  },
});
