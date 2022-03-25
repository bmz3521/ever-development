import Resource from '@utils/resource';

export default new Resource('/monitoringTypes', {
  sendRelation: {
    url: `{id}/monitoringReport`,
    method: 'post',
  },
});
