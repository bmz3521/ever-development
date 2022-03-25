import Resource from '@utils/resource';

export default new Resource('/Users', {
  login: {
    url: 'login',
    method: 'post',
  },
  loginWithThirdParty: {
    url: 'thirdPartyLogin',
    method: 'post',
  },
  logout: {
    url: 'logout',
    method: 'post',
  },
  getUser: {
    url: 'me',
    method: 'get',
  },
  getUserInformation: {
    url: `{userId}/userInformation`,
    method: 'get',
  },
  register: {
    url: '',
    method: 'post',
  },
  reqreset: {
    url: 'reset',
    method: 'post',
  },
  changePassword: {
    url: 'change-password',
    method: 'post',
  },
  findWhere: {
    url: '?filter={query}',
    method: 'get',
  },
  getSavelist: {
    url: '{userId}/savelists',
    method: 'get',
  },
  savelist: {
    url: '{userId}/savelists',
    method: 'post',
  },
  thirdPartyLogin: {
    url: 'thirdPartyLogin',
    method: 'post',
  },
  getTreatmentsByUserId: {
    url: `{userId}/treatments`,
    method: 'get',
  },
  getFCMToken: {
    url: '{userId}/userFcmToken',
    method: 'get',
  },
  createFCMToken: {
    url: '{userId}/userFcmToken',
    method: 'post',
  },
  getMonitoringData: {
    url: `{userId}/monitoringReports?filter[where][monitoringTypeId]={typeId}&filter[order]=id%20DESC&page={page}`,
    method: 'get',
  },
  getOmiseCustomerId: {
    url: `getOmiseCustomerId`,
    method: 'post',
  },
  getOrgSubmission: {
    url: '{userId}/submission',
    method: 'get',
  },
  getOrganizations: {
    url: `{userId}/organizations`,
    method: 'get',
  },
  getBookings: {
    url: `{userId}/bookings`,
    method: 'get',
  },
  getCovidTreatments: {
    url: `{userId}/covidTreatments`,
    method: 'get',
  },
  updateSetting: {
    url: '{appUserId}/userSetting',
    method: 'put',
  },
  getUserSetting: {
    url: '{appUserId}/userSetting',
    method: 'get',
  },
  signupWithOtp: {
    url: 'signupWithOtp',
    method: 'post',
  },
  verifyMobileNumberViaOtp: {
    url: 'verifyMobileNumberViaOtp',
    method: 'post',
  },
});
