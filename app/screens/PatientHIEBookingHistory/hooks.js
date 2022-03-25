import { useState, useEffect } from 'react';
import {
  alertThirdPartyVerify,
  alertCIdVerify,
  checkVerifyArray,
  checkCIdVerify,
} from '@utils/alertVerifyUser';
import { useDispatch, useSelector } from 'react-redux';
import { HieAppointmentActions, UserActions } from '@actions';
import { getOrganizations } from '@services/userInfoService';
import { useTheme } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { getDrugDetailbyUserId as getHistoryRecord } from '@services/userInfoService';

import moment from 'moment';
import i18next from 'i18next';

const useHooks = props => {
  moment.locale(i18next.language);

  const { navigation } = props;
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const hieData = useSelector(state => state.hieAppointment);
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(2);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const checkVerifyuser = async () => {
    if (!checkCIdVerify(user.data.cId)) {
      alertThirdPartyVerify(
        () => {
          navigation.navigate('AuthStack', {
            screen: 'InformationForm',
          });
        },
        () => navigation.navigate('Home'),
      );
    } else if (!user.data?.verifyId) {
      let orgList = await getOrganizations({ userId: user.data?.userId });
      const verifyStatus = await checkVerifyArray(orgList);
      if (verifyStatus) {
        dispatch(UserActions.updateUserVerifyStatus(verifyStatus));
      } else {
        alertCIdVerify(() => navigation.navigate('Home'));
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      checkVerifyuser();
    }
  }, [isFocused]);

  useEffect(() => {
    getHistoryData();
  }, [user?.data?.id]);

  useEffect(() => {
    setData([]);
    fetchHIEData(hieData.dataHistory);
  }, [hieData.dataHistory]);

  useEffect(() => {
    if (refreshing) {
      setRefreshing(hieData.loading);
    } else {
      setLoading(hieData.loading);
    }
  }, [hieData.loading]);

  // test id : 3101700321904
  // user.data.id is an id of UserInfos (ex. 854)
  // while other places will use an id of AppUsers (857)
  const getHistoryData = () => {
    if (user.data && user.data.id && user.data?.verifyId) {
      dispatch(
        HieAppointmentActions.getHistoryAppointment({
          userInfoId: user.data.id,
          page: 1,
        }),
      );
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setHasNextPage(2);
    getHistoryData();
  };

  const getMoreHistoryData = async () => {
    if (user.data && user.data.id && hasNextPage) {
      try {
        setLoading(true);
        const response = await getHistoryRecord({
          userInfoId: user.data.id,
          page: hasNextPage,
        });
        setHasNextPage(response?.nextPage);
        setLoading(false);
        fetchHIEData(response);
      } catch (e) {
        setLoading(false);
      }
    }
  };

  const fetchHIEData = async (resvData = {}) => {
    let finalData = [];
    if (
      resvData instanceof Object &&
      'visits' in resvData &&
      resvData.visits instanceof Array
    ) {
      resvData?.visits.map(userTele => {
        const updated = userTele.diagnoses.map(item => {
          const addedDepartment = {
            diagId: item.diagId,
            diagType: item.diagType,
            diagTypeName: item.diagTypeName,
            doctor: item.doctor,
            doctorName: item.doctorName,
            icd10: item.icd10,
            icd10Name: item.icd10Name,
            icd10ThaiName: item.icd10ThaiName,
            visitDateTime: item.visitDateTime,
            _id: item._id,
            // department: userTele.departmentName,
            billingItems: userTele.drugs,
            labResults: userTele.labResults,
            moreDoctorName: userTele.doctorName,
            hospName: userTele.hospName,
          };

          finalData.push(addedDepartment);
          return addedDepartment;
        });

        return updated;
      });
      const result = finalData
        .sort(function(a, b) {
          return new Date(b.visitDateTime) - new Date(a.visitDateTime);
        })
        .filter(booking => moment(booking.visitDateTime).isBefore(moment()))
        .map((item, index) => {
          const doctorName =
            item.doctorName !== ''
              ? item.doctorName?.split(',').length > 1
                ? `${item.doctorName?.split(',')[1]} ${
                    item.doctorName?.split(',')[0]
                  }`
                : item?.doctorName
              : item.moreDoctorName?.split(',').length > 1
              ? `${item.moreDoctorName?.split(',')[1]} ${
                  item.moreDoctorName?.split(',')[0]
                }`
              : item.moreDoctorName;
          return {
            pressAction: () =>
              navigation.navigate('HistoryStack', {
                screen: 'PatientHIEBookingDetail',
                params: { item },
              }),
            title: {
              content:
                i18next.language === 'th'
                  ? item.icd10ThaiName
                    ? item.icd10ThaiName
                    : item.icd10Name
                  : item.icd10Name,
              style: {
                color: '#1281ac',
              },
            },
            description: {
              content: item.hospName ? item.hospName : '-',
            },
            doctorName: {
              content: doctorName,
            },
            today: { content: false },
            time: {
              content: `${moment(item.visitDateTime).format(
                'D MMM YYYY',
              )} \n (${moment(item.visitDateTime).format('HH:mm')}${
                i18next.language === 'th' ? ' น.' : ''
              })
              `,
              style: {
                color: '#1281ac',
                fontFamily: 'Prompt-MediumItalic',
              },
            },
            icon: {
              style: {
                backgroundColor:
                  index === 0 && data.length === 0
                    ? theme.colors.primary
                    : theme.colors.white,
                color:
                  index === 0 && data.length === 0
                    ? theme.colors.primary
                    : theme.colors.white,
                borderColor: theme.colors.primary,
              },
            },
          };
        });
      setData(prev => prev.concat(result));
    }
  };

  return {
    dataHistory: data,
    i18next,
    actions: {
      getMoreHistoryData,
      getHistoryData,
      onRefresh,
    },
    refreshing,
    loading,
    error: hieData.error,
  };
};

export { useHooks };
