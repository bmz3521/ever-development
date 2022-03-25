import Resource from '@utils/resource';

export default new Resource('/UserInfos', {
  getHistoryAppointmentData: {
    url: `{userInfoId}/getDiagnosisInfo?limit={count}`,
    method: 'get',
  },
  getAppointmentData: {
    url: `{userInfoId}/getAppointments?page={page}`,
    method: 'get',
  },
  updateUserInfo: {
    url: '{userInfoId}',
    method: 'patch',
  },
  createAddress: {
    url: `{userInfoId}/addresses`,
    method: 'post',
  },
  editAddress: {
    url: `{userInfoId}/addresses/{addressId}`,
    method: 'put',
  },
  deleteAddress: {
    url: `/{userInfoId}/addresses/{addressId}`,
    method: 'delete',
  },
  getDrugdetailFromHie: {
    url: '{userInfoId}/getDrugsDetailFromHie?page={page}',
    method: 'get',
  },
  getMonitoringSummary: {
    url: '{userInfo}/monitoringSummary',
    method: 'get',
  },
});
