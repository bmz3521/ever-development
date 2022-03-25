import Resource from '@utils/resource';

export default new Resource('/Bookings', {
  createMobileBooking: {
    url: 'mobile',
    method: 'post',
  },
  getMobileBooking: {
    url: '{id}/mobile',
    method: 'get',
  },
  getMobileBookings: {
    url: 'mobile',
    method: 'get',
  },
  getConversation: {
    url: '{id}/mobile/chats',
    method: 'get',
  },
  createConversation: {
    url: '{id}/mobile/chats',
    method: 'post',
  },
  //NEW
  getBookings: {
    url: '{id}',
    method: 'get',
  },
  getBookingById: {
    url: '{bookingId}',
    method: 'get',
  },
  updateBookingById: {
    url: '{bookingId}',
    method: 'patch',
  },
  updateBookingAddressById: {
    url: '{bookingId}/updateBookingAddress',
    method: 'patch',
  },
  getBookingsByPractitionerId: {
    url:
      'filterByPractitionerAppUser?practitionerAppUserId={practitionerAppUserId}&page=1',
    method: 'get',
  },
  createInquiry: {
    url: '{id}/inquiry',
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data',
    },
  },
  finishQuotation: {
    url: '{id}/patientFinishQuotation',
    method: 'post',
  },
  finishFormSubmission: {
    url: '{id}/patientFinishFormSubmission',
    method: 'post',
  },
  patchStatus: {
    url: '{bookingId}/transitionStatus',
    method: 'patch',
  },
});
