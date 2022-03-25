import { useEffect, useState, useCallback } from 'react';
import {
  alertThirdPartyVerify,
  alertCIdVerify,
  checkVerifyArray,
  checkCIdVerify,
} from '@utils/alertVerifyUser';
import { getOrganizations } from '@services/userInfoService';
import { useSelector, useDispatch } from 'react-redux';
import { HieAppointmentActions, UserActions } from '@actions';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'react-native-elements';
import { getAppointmentData as getAppointmentAPI } from '@services/userInfoService';
import {
  getActiveBookings,
  getCompletedBookings,
} from '@services/bookingService';

import moment from 'moment';
import i18next from 'i18next';

const STATE_DATE = {
  isBefore: 'isBefore',
  isSame: 'isSame',
  isAfter: 'isAfter',
};

const useHooks = ({ navigation, route }) => {
  moment.locale(i18next.language);
  const { theme } = useTheme();
  const { backFromDetail } = route.params ?? {};
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const hieData = useSelector(state => state.hieAppointment);

  const isFocused = useIsFocused();
  const [activeBooking, setActiveBooking] = useState([]);
  const [completedBooking, setCompletedBooking] = useState([]);
  const [appointmentList, setListAppointment] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(2);
  const [index, setIndex] = useState(0);
  const [loadingHie, setLoadingHie] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingHie, setRefreshingHie] = useState(false);

  useEffect(() => {
    if (isFocused) {
      if (user.data && user.data?.id) {
        fetchAllData();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      checkVerifyuser();
    }
  }, [isFocused, index]);

  const checkVerifyuser = async () => {
    if (index === 1) {
      if (!checkCIdVerify(user.data.cId)) {
        alertThirdPartyVerify(
          () => {
            navigation.navigate('AuthStack', {
              screen: 'InformationForm',
            });
          },
          () => setIndex(0),
        );
      } else if (!user.data?.verifyId && index === 1) {
        let orgList = await getOrganizations({ userId: user.data?.userId });
        const verifyStatus = await checkVerifyArray(orgList);
        if (verifyStatus) {
          dispatch(UserActions.updateUserVerifyStatus(verifyStatus));
        } else {
          alertCIdVerify(() => setIndex(0));
        }
      }
    }
  };

  const fetchAllData = useCallback(async () => {
    if (backFromDetail) {
      navigation.setParams({ backFromDetail: false });
      setLoadingBooking(true);
      fetchBooking();
      return;
    }
    setLoadingBooking(true);
    fetchBooking();
    getHieAppointments();
  }, [backFromDetail]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchBooking();
  }, [refreshing]);

  const onRefreshHie = useCallback(async () => {
    setRefreshingHie(true);
    setHasNextPage(2);
    getHieAppointments();
  }, [refreshingHie]);

  useEffect(() => {
    setListAppointment(finalData(hieData.data));
  }, [hieData.data]);

  useEffect(() => {
    if (refreshingHie) {
      setRefreshingHie(hieData.loadingHie);
    } else {
      setLoadingHie(hieData.loadingHie);
    }
  }, [hieData.loadingHie]);

  const getHieAppointments = useCallback(() => {
    dispatch(
      HieAppointmentActions.getAppointment({
        userInfoId: user.data.id,
        page: 1,
      }),
    );
  }, []);

  const getMoreHieAppointments = async () => {
    if (hasNextPage) {
      try {
        setLoadingHie(true);
        const response = await getAppointmentAPI({
          userInfoId: user.data.id,
          page: hasNextPage,
        });
        setHasNextPage(response?.nextPage);
        setListAppointment(prev => prev.concat(finalData(response)));
        setLoadingHie(false);
      } catch (e) {
        setLoadingHie(false);
      }
    }
  };

  const fetchBooking = async () => {
    try {
      const activeBookings = await getActiveBookings(
        (page = 1),
        user.data.userId,
      );
      const completedBookings = await getCompletedBookings(
        (page = 1),
        user.data.userId,
      );
      setActiveBooking(activeBookings?.slice(0, 5));
      setCompletedBooking(completedBookings?.slice(0, 5));
    } catch (err) {
      console.log('error fetch booking data', err);
    } finally {
      setLoadingBooking(false);
      setRefreshing(false);
    }
  };

  const convertData = appointments => {
    let result = appointments
      .sort(function(a, b) {
        return (
          Math.abs(
            Date.parse(a.appointmentDateTime) - Date.parse(moment().format()),
          ) -
          Math.abs(
            Date.parse(b.appointmentDateTime) - Date.parse(moment().format()),
          )
        );
      })
      .map(item => {
        const time = moment(item.appointmentDateTime).valueOf();
        const today = moment().valueOf();
        const doctorName =
          item.doctorName?.split(',').length > 1
            ? `${item.doctorName?.split(',')[1]} ${
                item.doctorName?.split(',')[0]
              }`
            : item?.doctorName;
        const state_date = moment(time).isSame(today, 'day')
          ? STATE_DATE.isSame
          : moment(time).isBefore(today, 'day')
          ? STATE_DATE.isAfter
          : STATE_DATE.isBefore;

        return {
          pressAction: () =>
            navigation.navigate('BookingStack', {
              screen: 'AppointmentDetail',
              initial: false,
              params: {
                item: item,
                tag: state_date,
              },
            }),
          title: {
            content: item.note,
            style: {
              color:
                state_date === STATE_DATE.isSame
                  ? theme.colors.white
                  : state_date === STATE_DATE.isAfter
                  ? '#666'
                  : '#1281ac',
            },
          },
          description: {
            content: item.hospName,
            style:
              state_date === STATE_DATE.isSame
                ? {
                    color: theme.colors.white,
                  }
                : null,
          },
          doctorName: {
            content: doctorName,
            style:
              state_date === STATE_DATE.isSame
                ? {
                    color: theme.colors.white,
                  }
                : null,
          },
          today: { content: state_date === STATE_DATE.isSame ? true : false },
          status: { content: state_date },
          time: {
            content: `${moment(item.appointmentDateTime).format(
              'D MMM YYYY',
            )} \n (${moment(item.appointmentDateTime).format('HH:mm')}${
              i18next.language === 'th' ? ' น.' : ''
            })
            `,
            style: {
              color: '#1281ac',
            },
          },
          icon: {
            style: {
              backgroundColor:
                state_date === STATE_DATE.isSame
                  ? theme.colors.primary
                  : theme.colors.white,
              color:
                state_date === STATE_DATE.isSame
                  ? theme.colors.primary
                  : theme.colors.white,
              borderColor: theme.colors.primary,
            },
          },
        };
      });
    return result;
  };

  const finalData = (data = {}) => {
    let finalData = [];
    if (
      data instanceof Object &&
      'visits' in data &&
      data.visits instanceof Array
    ) {
      let resvData = [...data.visits];
      resvData.forEach(visit => {
        if ('appointments' in visit && visit.appointments instanceof Array) {
          let resvVisiter = [...visit.appointments];
          resvVisiter.forEach(appointment => {
            finalData.push({
              ...(appointment ?? {}),
              hospName: visit.hospName ?? 'ไม่ระบุ',
            });
          });
        }
      });
      return convertData(finalData);
    } else {
      return finalData;
    }
  };

  return {
    actions: {
      getHieAppointments,
      fetchBooking,
      getMoreHieAppointments,
      onRefresh,
      onRefreshHie,
      fetchAllData,
      setIndex,
    },
    index,
    refreshingHie,
    refreshing,
    loadingHie,
    loadingBooking,
    appointmentList,
    activeBooking,
    completedBooking,
  };
};

export { useHooks };
