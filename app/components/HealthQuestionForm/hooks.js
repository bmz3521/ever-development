import { useEffect, useState, useCallback, useMemo } from 'react';
import { Alert, Platform } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import i18next from 'i18next';
import { ImagePickerManager } from '@utils/imagePickerManager';
import storage from '@react-native-firebase/storage';
import {
  DATA_ADDITION,
  DATA_CONDITION,
  DATA_PREGNANCY,
  DATA_MENTAL_SURVEY,
  DATA_ATK,
  DATA_MENTAL_SURVEY_2,
  CODVID_DESCRIPTION,
} from 'app/configs/Data';
import { dataPerson, dataAddition } from 'app/type/healthyQuestion';
import moment from 'moment';
import { useSelector } from 'react-redux';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const useHooks = ({ navigation, user }) => {
  const auth = useSelector(state => state.auth);
  const [btnLoading, setBtnLoading] = useState(false);
  const [description, setDescription] = useState(1);
  const [symptomText, setSymptomText] = useState('');
  const [additionCurrent, setAdditionCurrent] = useState(DATA_ADDITION[1]);
  const [itemCondition, setItemCondition] = useState(DATA_CONDITION[1]);
  const [dataPregnancy, setDataPregnancy] = useState([
    {
      id: 1,
      title: `ตั้งครรภ์หรือไม่`,
      titleEng: 'Pregnant or not',
      key: 'pregnant1',
      check: false,
      conditions: [],
    },
    {
      id: 2,
      title: `อยู่ในวัยมีประจําเดือน หรือไม่`,
      titleEng: 'Do you have menstrual period',
      key: 'pregnant2',
      check: false,
      conditions: [],
    },
    {
      id: 3,
      title: `ให้นมบุตรอยู่หรือไม่`,
      titleEng: 'Do you still breastfeeding',
      key: 'pregnant3',
      check: false,
      conditions: [],
    },
  ]);
  const [pregnancyCondition, setPregnancyCondition] = useState(
    DATA_PREGNANCY[1],
  );
  const [isCheckAdditionPregnancy, setIsCheckAdditionPregnancy] = useState(
    false,
  );
  const [dataCondition, setDataCondition] = useState([
    {
      id: 1,
      title: `โรคปอดอุดกั้นเรื้อรัง (COPD) รวมถึงโรคปอดเรื้อรังอื่นๆ`,
      conditions: [],
      check: false,
    },
    {
      id: 2,
      title: 'โรคไตเรื้อรัง (CKD)',
      conditions: [],
      check: false,
    },
    {
      id: 3,
      title: 'โรคหัวใจและหลอดเลือด รวมถึงโรคหัวใจแต่กําเนิด',
      conditions: [],
      check: false,
    },
    {
      id: 4,
      title: 'โรคหลอดเลือดสมอง',
      conditions: [],
      check: false,
    },
    {
      id: 5,
      title: 'เบาหวานที่ควบคุมไม่ได้',
      conditions: [],
      check: false,
    },
    {
      id: 6,
      title: 'ภาวะอ้วน หรือ น้ําหนักมากกว่า 90 กก.',
      conditions: [],
      check: false,
    },
    {
      id: 7,
      title: 'ตับแข็ง',
      conditions: [],
      check: false,
    },
    {
      id: 8,
      title: 'ภูมิคุ้มกันต่ำ',
      conditions: [],
      check: false,
    },
    {
      id: 9,
      title: 'อื่น ๆ',
      conditions: [],
      check: false,
    },
  ]);
  const [isCheckAddition, setIsCheckAddition] = useState(false);
  const [data2, setDataPerson2] = useState([
    {
      id: 0,
      lastName: 'ปกติดี',
      isAdd: false,
      check: true,
    },
    {
      id: 1,
      lastName: 'เบื่อเล็กน้อย',
      isAdd: false,
      check: false,
    },
    {
      id: 2,
      lastName: 'เบื่อมาก',
      isAdd: false,
      check: false,
    },
  ]);
  const [dataPerson, setDataPerson] = useState([
    {
      id: 0,
      lastName: 'ปกติดี',
      isAdd: false,
      check: true,
    },
    {
      id: 1,
      lastName: 'หดหู่เล็กน้อย',
      isAdd: false,
      check: false,
    },
    {
      id: 2,
      lastName: 'หดหู่มาก',
      isAdd: false,
      check: false,
    },
  ]);
  const [dataAtk, setDataAtk] = useState([
    {
      id: 1,
      title:
        'ใน 14 วันที่ผ่านมา คุณได้มีการเดินทางไป หรือ มา จากต่างประเทศหรือ มีอาชีพที่สัมผัสใกล้ชิดกับนักท่องเที่ยวต่างชาติหรือไม่',
      conditions: [],
      check: false,
    },
    {
      id: 2,
      title:
        'ใน 14 วันที่ผ่านมา คุณได้เดินทางไปยัง หรือ กลับมาจาก หรือ อยู่อาศัยในพื้นที่เกิดโรคติดเชื้อไวรัสCOVID-19 หรือไม่',
      conditions: [],
      check: false,
    },
    {
      id: 3,
      title:
        'ใน 14 วันที่ผ่านมา คุณได้เดินทางไปยังสถานที่ชุมนุมชน หรือ สถานที่ที่มีการรวมกลุ่มคน เช่น ตลาดนัด ห้าง สถานพยาบาล ขนส่งสาธารณะ หรือมีอาชีพที่ต้องอยู่ใน สถานที่แออัด หรือติดต่อคนจำนวนมากหรือไม่',
      conditions: [],
      check: false,
    },
    {
      id: 4,
      title:
        'ใน 14 วันที่ผ่านมา คุณได้สัมพัสกับผู้ป่วยยืนยันโรคติดเชื้อCOVID-19 หรือไม่ (ใกล้กว่า 1 เมตร นานเกิน 5 นาที)',
      conditions: [],
      check: false,
    },
    {
      id: 5,
      title:
        'ตอนนี้คุณวัดอุณหภูมิร่างกายได้มากกว่า 37.5 ใช่หรือไม่คะ (วัดด้วยปรอทวัดไข้)',
      conditions: [],
      check: false,
    },
    {
      id: 6,
      title: 'คุณมีอาการ หอบเหนื่อย ไหมคะ',
      conditions: [],
      check: false,
    },
    {
      id: 7,
      title: 'คุณมีอาการ ไอ ไหมคะ',
      conditions: [],
      check: false,
    },
    {
      id: 8,
      title: 'คุณ มีน้ำมูก ไหมคะ',
      conditions: [],
      check: false,
    },
    {
      id: 9,
      title: 'คุณ เจ็บคอ ไหมคะ',
      conditions: [],
      check: false,
    },
    {
      id: 10,
      title: 'คุณมีอาการ จมูกไม่ได้กลิ่น ไหมคะ',
      conditions: [],
      check: false,
    },
  ]);
  const [risk, setRisk] = useState(0);
  const [isCheckAdditionAtk, setIsCheckAdditionAtk] = useState(false);
  const [typeModal, setTypeModal] = useState(1);
  const [checkForm, setCheckForm] = useState(false);
  const [depressionForm, setDepressionForm] = useState([]);
  const [chronicDiseaseForm, setChronicDiseaseForm] = useState([]);
  const [pregnancyForm, setPregnancyForm] = useState([]);
  const [atkForm, setAtkForm] = useState([]);

  const schema = yup.object({
    // covidTest: yup.string().required('กรุณากรอกที่ตรวจโควิด'),
    covidTest: yup.string().required('กรุณากรอกที่ตรวจ'),
    firstName: yup.string().required('กรุณากรอกชื่อจริง'),
    lastName: yup.string().required('กรุณากรอกนามสกุล'),
    weight: yup.number().required('กรุณากรอกน้ำหนัก'),
    height: yup.number().required('กรุณากรอกส่วนสูง'),
    age: yup.number().required('กรุณากรอกอายุ'),
    emergencyName: yup.string().required('กรุณากรอกชื่อผู้ติดต่อฉุกเฉิน'),
    emergencyNumber: yup
      .string()
      .min(10, i18next.t('USERREG_ERROR_PHONENUM'))
      .matches(phoneRegExp, i18next.t('USERREG_ERROR_PHONENUM'))
      .required(i18next.t('USERREG_FILL_PHONENUM')),
  });

  const formik = useFormik({
    initialValues: {
      covidTest: '',
      firstName: '',
      lastName: '',
      weight: '',
      height: '',
      age: '',
      date: '',
      healthChoice: '',
      emergencyName: '',
      emergencyNumber: '',
      gender: 'FEMALE',
      imageUri: '',
      type: 'PCR',
    },
    onSubmit: () => navigateToTelePayment(),

    validationSchema: schema,
  });

  const genderType = [
    {
      value: 'MALE',
      label: i18next.t('USERREG_MALE'),
      check: formik?.values.gender === 'MALE',
    },
    {
      value: 'FEMALE',
      label: i18next.t('USERREG_FEMALE'),
      check: formik?.values.gender === 'FEMALE',
    },
  ];

  const healthChoiceType = [
    {
      value: 'HEALTH_INSURANCE',
      label: 'ประกันสุขภาพในเขต',
      check: formik?.values.healthChoice === 'HEALTH_INSURANCE',
    },
    {
      value: 'SOCIAL_SECURITY',
      label: 'ประกันสังคม',
      check: formik?.values.healthChoice === 'SOCIAL_SECURITY',
    },
    {
      value: 'GOVERNMENT_OFFICER',
      label: 'ข้าราชการ',
      check: formik?.values.healthChoice === 'GOVERNMENT_OFFICER',
    },
    {
      value: 'HANDICAPPED',
      label: 'ผู้พิการ',
      check: formik?.values.healthChoice === 'HANDICAPPED',
    },
    {
      value: 'OTHER',
      label: 'อื่นๆ',
      check: formik?.values.healthChoice === 'OTHER',
    },
  ];

  const typeType = [
    { value: 'PCR', label: 'PCR', check: formik?.values.type === 'PCR' },
    { value: 'ATK', label: 'ATK', check: formik?.values.type === 'ATK' },
  ];

  const selectDateHandler = useCallback(date => {
    formik.setFieldValue('date', date, false);
  }, []);

  const selectHealthChoice = (callBack, title) => {
    navigation.navigate('ListingData', {
      callBack,
      title,
      data: healthChoiceType,
      selected: true,
      pageCallback: 'FormTest',
    });
  };

  const selectGender = (callBack, title) => {
    navigation.navigate('ListingData', {
      callBack,
      title,
      data: genderType,
      selected: true,
      pageCallback: 'FormTest',
    });
  };

  const selectDescription = description => {
    setDescription(description);
  };

  const selectType = (callBack, title) => {
    navigation.navigate('ListingData', {
      callBack,
      title,
      data: typeType,
      selected: true,
      pageCallback: 'FormTest',
    });
  };

  const uploadImage = async type => {
    try {
      // setLoading(true);
      const res = await ImagePickerManager(type, {
        mediaType: 'photo',
        quality: 0.4,
        saveToPhotos: false,
      });
      if (res) {
        console.log('res', res);
        formik.setFieldValue('imageUri', res.uri);
        // const uploadRes = await uploadFileBooking(res);
        // setImageUrl(uploadRes);
      }
    } catch (e) {
      // setLoading(false);
      Alert.alert(e);
    }
    // setLoading(false);
  };

  const onLongPress = () => {
    Alert.alert('ต้องการลบภาพใช่หรือไม่?', '', [
      {
        text: 'ลบ',
        onPress: deleteImage,
        style: 'destructive',
      },
      { text: 'ยกเลิก' },
    ]);
  };

  const deleteImage = async () => {
    try {
      // setLoading(true);
      // await deleteFileBooking(imageUrl);
      formik.setFieldValue('imageUri', '');
      // setImageUrl('');
    } catch (e) {
      // setLoading(false);
      Alert.alert(e);
    }
    // setLoading(false);
  };

  const onPressAdditionPregnancy = useCallback(
    item => {
      setAdditionCurrent(item);
      if (item.check) {
        let isCheckAdd = false;
        let dataTemp = [];
        dataPregnancy.map(data => {
          if (data.id == item.id) {
            data.check = false;
          }
          dataTemp.push(data);
          if (data.check == true) {
            isCheckAdd = true;
          }
        });
        setIsCheckAdditionPregnancy(isCheckAdd);
        setDataPregnancy(dataTemp);
      } else {
        let isCheckAdd = false;
        let dataTemp = [];
        dataPregnancy.map(data => {
          if (data.id == item.id) {
            data.check = true;
            // data.conditions.push(item);
          }
          dataTemp.push(data);
          if (data.check == true) {
            isCheckAdd = true;
          }
        });
        setIsCheckAdditionPregnancy(isCheckAdd);
        setDataPregnancy(dataTemp);
      }
    },
    [additionCurrent, dataPregnancy, itemCondition, dataPerson],
  );

  useEffect(() => {
    const dataPregnancyTemp = dataPregnancy.map(data => {
      let titleTmp;
      switch (data.key) {
        case 'pregnant1':
          titleTmp = 'Pregnancy_Status';
          break;
        case 'pregnant2':
          titleTmp = 'Menstrual_Status';
          break;
        case 'pregnant3':
          titleTmp = 'Breastfeeding_Status';
          break;
      }

      return {
        title: titleTmp,
        isChecked: data.check,
      };
    });

    setPregnancyForm(dataPregnancyTemp);
  }, [dataPregnancy]);

  const onPressAddition = useCallback(
    item => {
      setAdditionCurrent(item);
      if (item.check) {
        let isCheckAdd = false;
        let dataTemp = [];
        let sum = 0;
        dataCondition.map(data => {
          if (data.id == item.id) {
            data.check = false;
          }
          dataTemp.push(data);
          if (data.check == true) {
            isCheckAdd = true;
            sum += 1;
          }
        });
        setRisk(sum);
        setIsCheckAddition(isCheckAdd);
        setDataCondition(dataTemp);
      } else {
        let isCheckAdd = false;
        let dataTemp = [];
        let sum = 0;
        dataCondition.map(data => {
          if (data.id == item.id) {
            data.check = true;
            // data.conditions.push(item);
          }
          dataTemp.push(data);
          if (data.check == true) {
            isCheckAdd = true;
            sum += 1;
          }
        });
        setRisk(sum);
        setIsCheckAddition(isCheckAdd);
        setDataCondition(dataTemp);
      }
    },
    [additionCurrent, dataCondition, itemCondition, dataPerson],
  );

  useEffect(() => {
    const dataConditionTemp = dataCondition.map(data => {
      let titleTmp;
      switch (data.id) {
        case 1:
          titleTmp = 'COPD_and_Others';
          break;
        case 2:
          titleTmp = 'CKD';
          break;
        case 3:
          titleTmp = 'CAD_CHD';
          break;
        case 4:
          titleTmp = 'Stroke';
          break;
        case 5:
          titleTmp = 'Brittle_Diabetes';
          break;
        case 6:
          titleTmp = 'Obese';
          break;
        case 7:
          titleTmp = 'Cirrhosis';
          break;
        case 8:
          titleTmp = 'Immune_Sys_Disorder';
          break;
        case 9:
          titleTmp = 'Others';
          break;
      }
      return {
        title: titleTmp,
        isChecked: data.check,
      };
    });

    setChronicDiseaseForm(dataConditionTemp);
  }, [dataCondition]);

  const onPressAdditionAtk = useCallback(
    item => {
      setAdditionCurrent(item);
      if (item.check) {
        let isCheckAdd = false;
        let dataTemp = [];
        let sum = 0;
        dataAtk.map(data => {
          if (data.id == item.id) {
            data.check = false;
          }
          dataTemp.push(data);
          if (data.check == true) {
            isCheckAdd = true;
            sum += 1;
          }
        });
        setRisk(sum);
        setIsCheckAdditionAtk(isCheckAdd);
        setDataAtk(dataTemp);
      } else {
        let isCheckAdd = false;
        let dataTemp = [];
        let sum = 0;
        dataAtk.map(data => {
          if (data.id == item.id) {
            data.check = true;
          }
          dataTemp.push(data);
          if (data.check == true) {
            isCheckAdd = true;
            sum += 1;
          }
        });
        setRisk(sum);
        setIsCheckAdditionAtk(isCheckAdd);
        setDataAtk(dataTemp);
      }
    },
    [additionCurrent, dataAtk, itemCondition, dataPerson],
  );

  useEffect(() => {
    const dataAtkTemp = dataAtk.map(data => {
      return {
        title: data.title,
        isChecked: data.check,
      };
    });
    setAtkForm(dataAtkTemp);
  }, [dataAtk]);

  const onPressSomeone = useCallback(
    (item, formNumber) => {
      // setTypeModal(1);
      if (formNumber === 'firstForm') {
        let dataTemp = [];
        dataPerson.map(data => {
          if (data.id == item.id) {
            data.check = true;
          } else {
            data.check = false;
          }
          dataTemp.push(data);
        });
        setDataPerson(dataTemp);
      } else {
        let dataTemp = [];
        data2.map(data => {
          if (data.id == item.id) {
            data.check = true;
          } else {
            data.check = false;
          }
          dataTemp.push(data);
        });
        setDataPerson2(dataTemp);
      }
    },
    [dataPerson],
  );

  useEffect(() => {
    const dataPersonChecked = dataPerson?.filter(item => item.check === true);
    const data2Checked = data2?.filter(item => item.check === true);
    const depressionFormTmp = [
      {
        title: `Depression_form_q1`,
        value: `${dataPersonChecked[0].lastName}`,
      },
      {
        title: `Depression_form_q2`,
        value: `${data2Checked[0].lastName}`,
      },
    ];

    setDepressionForm(depressionFormTmp);
  }, [dataPerson, data2]);

  const data = {
    firstName: formik.values.firstName,
    lastName: formik.values.lastName,
    age: formik.values.age,
    height: formik.values.height,
    birthDate: moment(user?.data?.userInformation?.birthDate).format(
      'DD/MM/YYYY',
    ),
    weight: formik.values.weight,
    emergencyNumber: formik.values.emergencyNumber,
    type: formik.values.type,
    covidTest: formik.values.covidTest,
    gender: formik.values.gender,
    // symptom: symptomText,
    covidDate: formik.values.date,
    emergencyName: formik.values.emergencyName,
    // healthChoice: formik.values.healthChoice,
    riskScore: risk,
    // atkForm: atkForm,
    pregnancyForm: pregnancyForm,
    chronicDiseaseForm: chronicDiseaseForm,
    depressionForm: depressionForm,
  };

  // const covidFormData = [
  //   {
  //     name: 'firstName',
  //     thName: 'ชื่อจริง',
  //     value: formik.values.firstName,
  //   },
  //   {
  //     name: 'lastName',
  //     thName: 'นามสกุล',
  //     value: formik.values.lastName,
  //   },
  //   {
  //     name: 'age',
  //     thName: 'อายุ',
  //     value: formik.values.age,
  //   },
  //   {
  //     name: 'height',
  //     thName: 'ส่วนสูง',
  //     value: formik.values.height,
  //   },
  //   {
  //     name: 'birthDate',
  //     thName: 'วันเดือนปีเกิด',
  //     value: moment(user?.data?.userInformation?.birthDate).format(
  //       'DD/MM/YYYY',
  //     ),
  //   },
  //   {
  //     name: 'weight',
  //     thName: 'น้ำหนัก',
  //     value: formik.values.weight,
  //   },
  //   {
  //     name: 'emergencyContact',
  //     thName: 'เบอร์ติดต่อฉุกเฉิน (เบอร์ญาติ)',
  //     value: formik.values.emergencyNumber,
  //   },
  //   {
  //     name: 'type',
  //     thName: 'ชนิดการตรวจ',
  //     value: formik.values.type,
  //   },
  //   {
  //     name: 'covidTest',
  //     thName: 'ที่ตรวจโควิด',
  //     value: formik.values.covidTest,
  //   },
  //   {
  //     name: 'sex-isMale',
  //     thName: 'เพศ',
  //     value: formik.values.gender === 'MALE' ? true : false,
  //   },
  //   {
  //     name: 'symptom',
  //     thName: 'อาการ',
  //     value: symptomText,
  //   },
  //   {
  //     name: 'covidDate',
  //     thName: 'วันที่ของผลตรวจโควิด',
  //     value: formik.values.date,
  //   },
  //   {
  //     name: 'emergencyName',
  //     thName: 'วันที่ของผลตรวจโควิด',
  //     value: formik.values.emergencyName,
  //   },
  //   {
  //     name: 'healthChoice',
  //     thName: 'สิทธิการรักษา',
  //     value: formik.values.healthChoice,
  //   },
  //   {
  //     name: 'isCovid',
  //     thName: 'ตรวจพบเชื้อโควิด-19',
  //     value: description === 1 || false,
  //   },
  //   {
  //     name: 'riskScore',
  //     thName: 'ความเสี่ยง',
  //     value: risk,
  //   },
  //   ...dataAtk,
  //   ...dataPregnancy,
  //   ...dataCondition,
  //   ...dataPerson,
  //   ...data2,
  // ];

  // button actions
  const navigateToBooking = async () => {
    if (risk >= 0 && risk <= 6) {
      // Alert.alert(
      //   'แจ้งเตือน',
      //   'คุณยังมีความเสี่ยงติดโรคโควิดต่ำถึงปานกลาง โปรดติดตามอาการแล้วมากรอกแบบสอบถามอีกครั้ง ในวันถัดไป',
      //   [{ text: 'ยืนยัน', onPress: () => navigation.navigate('Home') }],
      // );
      setCheckForm(true);
    } else if (risk >= 7 && risk <= 10) {
      const mmt = moment();
      const mmtMidnight = mmt.clone().startOf('day');
      const diffMinutes = mmt.diff(mmtMidnight, 'minutes');
      let userAddress = '';
      let userMobileNumber = '';
      if (!!user.data?.userInformation?.address?.address) {
        let info = user.data.userInformation.address;
        userAddress = `${info.address} ${info.address2} ${info.area} ${info.province} ${info.postalCode}`;
      }
      if (!!user.data?.userInformation?.mobileNumber) {
        userMobileNumber = user.data.userInformation.mobileNumber;
      }
      const bookingData = {
        status: 'WAITING_LOGISTIC_SENDING_ATK',
        admitTime: moment(),
        bookingTime: diffMinutes,
        bookingEndTime: diffMinutes,
        // patientId: user?.userId,
        doctorId: 0,
        covidFormData: data,
        userAddress,
        userMobileNumber,
      };
      console.log('your risk score is high!!');
      // const { data } = await axios.post(
      //   `${config.VA_API_URL}/Bookings`,
      //   bookingData,
      // );
      // if (data) {
      //   Alert.alert(
      //     'แจ้งเตือน',
      //     'คุณมีความเสี่ยงติดโรคโควิดปานกลางถึงสูง จะมีเจ้าหน้าที่ส่งเครื่องตรวจโควิด ATK ไปที่คุณในเร็วๆ นี้',
      //     [{ text: 'ยืนยัน', onPress: () => navigation.navigate('Home') }],
      //   );
      // } else {
      //   Alert.alert(
      //     'แจ้งเตือน',
      //     'ไม่สามารถทำรายการได้ กรุณาทำรายการใหม่อีกครั้ง',
      //     [{ text: 'ยืนยัน', onPress: () => navigation.navigate('Home') }],
      //   );
      // }
    }
  };

  const navigateToTelePayment = async () => {
    setBtnLoading(true);
    try {
      const env = process.env.NODE_ENV;
      let uri = formik.values.imageUri;
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri; //what is this?
      const ext = uri.split('.').pop(); // Extract image extension
      const name = `${formik.values.firstName}-${formik.values.lastName}`;
      const filename = `${name}-covid.${ext}-${Date.now()}`; // Generate unique name
      await storage()
        .ref(`/covid-form/${env}/${filename}`)
        .putFile(uploadUri);
      const imageUpload = await storage()
        .ref(`/covid-form/${env}/${filename}`)
        .getDownloadURL();

      let riskCount = data.riskScore;
      if (parseInt(data.age) >= 60) riskCount++;
      if (parseInt(data.weight) >= 90) riskCount++;

      const color = riskCount > 0 ? 'Yellow' : 'Green';

      navigation.navigate('MainStack', {
        // screen: 'TelePayment',
        screen: 'PaymentOrder',
        params: {
          bookingCategory: `covid`,
          covidForm: {
            ...data,
            riskScore: riskCount,
            color: color,
            imageUpload,
          },
        },
      });
    } catch (err) {
      console.log('error submit covid-19 form', err);
    } finally {
      setBtnLoading(false);
    }
  };

  return {
    actions: {
      selectGender,
      selectHealthChoice,
      selectDateHandler,
      selectDescription,
      selectType,
      uploadImage,
      onLongPress,
      onPressAdditionPregnancy,
      setPregnancyCondition,
      setTypeModal,
      onPressAddition,
      setItemCondition,
      onPressAdditionAtk,
      navigateToBooking,
      onPressSomeone,
      setCheckForm,
    },
    btnLoading,
    description,
    formik,
    dataPregnancy,
    dataCondition,
    dataAtk,
    data2,
    dataPerson,
    checkForm,
  };
};

export { useHooks };
