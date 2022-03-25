/*
 *
 * Booking actions
 *
 */

import { BookingConstants } from '@constants';

/* CREATE BOOKING */
export function createBooking(data) {
  return {
    type: BookingConstants.CREATE_BOOKING_REQUEST,
    data,
  };
}
export function createBookingSuccess(result) {
  return {
    type: BookingConstants.CREATE_BOOKING_SUCCESS,
    result,
  };
}
export function createBookingFailure(error) {
  return {
    type: BookingConstants.CREATE_BOOKING_FAILURE,
    error,
  };
}

/* GET BOOKING */
export function getBookings({ userId }) {
  return {
    type: BookingConstants.GET_BOOKING_REQUEST,
    userId,
  };
}
export function getBookingSuccess(result) {
  return {
    type: BookingConstants.GET_BOOKING_SUCCESS,
    result,
  };
}
export function getBookingFailure(error) {
  return {
    type: BookingConstants.GET_BOOKING_FAILURE,
    error,
  };
}

export function clear(callback) {
  return {
    type: BookingConstants.CLEAR_REQUEST,
    callback,
  };
}
export function clearSuccess() {
  return {
    type: BookingConstants.CLEAR_SUCCESS,
  };
}
