import i18next from 'i18next';
import { useState, useEffect } from 'react';
export const useHooks = ({ navigation, route }) => {
  const [drugList, setDrugList] = useState([]);
  const [labList, setLabList] = useState([]);
  const info = route.params.item;
  const doctorName =
    info.doctorName !== ''
      ? info.doctorName?.split(',').length > 1
        ? `${info.doctorName?.split(',')[1]} ${info.doctorName?.split(',')[0]}`
        : info?.doctorName
      : info.moreDoctorName?.split(',').length > 1
      ? `${info.moreDoctorName?.split(',')[1]} ${
          info.moreDoctorName?.split(',')[0]
        }`
      : info.moreDoctorName;

  useEffect(() => {
    setDrugList([...route.params.item.billingItems]);
    storeLabResults(route.params.item.labResults);
  }, []);

  const onlabPress = item => {
    navigation.navigate('HistoryStack', {
      screen: 'DocumentDisplay',
      params: {
        type: item.type,
        title: i18next.t('HISTORYDETAIL_LABRESULT'),
        data: item.data,
        lab: true,
      },
    });
  };

  const onTotalLabHandler = () => {
    navigation.navigate('HistoryStack', {
      screen: 'LabList',
      params: {
        type: 'ผลตรวจห้องปฏิบัติการ',
        title: i18next.t('HISTORYDETAIL_LABRESULT'),
        data: labList,
        lab: true,
      },
    });
  };

  const onDrugPress = () => {
    navigation.navigate('HistoryStack', {
      screen: 'DocumentDisplay',
      params: {
        type: 'รายการยา',
        title: i18next.t('HISTORYDETAIL_MEDLIST'),
        data: drugList,
        drug: true,
      },
    });
  };

  const funcMap = item => {
    return {
      name: item.labItemsName,
      result: item.labOrderResult,
      ref: item.labItemsNormalValueRef,
      // group: item.labgrpName,
      formName: '',
    };
  };

  const storeLabResults = (labResults = []) => {
    const elementList = labResults.reduce((acc, item) => {
      acc[item.labHeadData.formName] = acc[item.labHeadData.formName]
        ? acc[item.labHeadData.formName].concat(
            item.labReportData.map(ele =>
              funcMap(ele, item.labHeadData.formName),
            ),
          )
        : item.labReportData.map(funcMap);
      return acc;
    }, {});
    const finalData =
      Object.keys(elementList).length > 0
        ? Object.keys(elementList).map(key => ({
            type: key,
            data: elementList[key],
          }))
        : [];
    setLabList(finalData);
  };

  return {
    data: {
      drugList,
      labList,
      doctorName,
      hospName: info.hospName,
    },
    actions: {
      onlabPress,
      onDrugPress,

      onTotalLabHandler,
    },
  };
};
