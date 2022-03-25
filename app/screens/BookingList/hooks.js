import React, { useState, useEffect, useCallback } from 'react';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import {
  getActiveBookings,
  getCompletedBookings,
} from '@services/bookingService';

const useHooks = props => {
  const { title, navigation } = props;
  const user = useSelector(state => state.user);
  const [bookingData, setBookingData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bottomLoading, setBottomLoading] = useState(false);

  const fetchBookingData = async () => {
    try {
      if (title === i18next.t('MYBOOKINGUI_ACTIVE_BOOKINGS')) {
        const activeBookings = await getActiveBookings(page, user.data.userId);
        if (activeBookings.length) {
          const more = bookingData.concat(activeBookings);
          setPage(prev => prev + 1);
          setBookingData(more);
        }
      } else {
        const completedBookings = await getCompletedBookings(
          page,
          user.data.userId,
        );
        if (completedBookings.length) {
          const more = bookingData.concat(completedBookings);
          setPage(prev => prev + 1);
          setBookingData(more);
        }
      }
    } catch (err) {
      console.log('error fetch booking data', err);
    } finally {
      setLoading(false);
      setBottomLoading(false);
    }
  };

  const onEndReached = async () => {
    setBottomLoading(true);
    try {
      await fetchBookingData();
    } catch (error) {
      console.log('error fetch data', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBookingData();
  }, [navigation]);

  return {
    actions: {
      fetchBookingData,
      onEndReached,
    },
    bookingData,
    loading,
    bottomLoading,
  };
};

export { useHooks };
