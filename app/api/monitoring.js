import Resource from '@utils/resource';

export default new Resource('/monitoringReports', {
  sendMonitoringData: {
    url: ``,
    method: 'post',
  },
  deleteMonitoringData: {
    url: `{id}`,
    method: 'delete',
  },
});
