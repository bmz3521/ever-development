import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Modal,
  TouchableOpacity,
  //   Picker,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { Colors, Routes } from 'app/configs';
import Theme from 'app/style/Theme';
import { useSelector } from 'react-redux';
import scale from 'app/utils/scale';
import ButtonIconHeader from 'app/elements/Buttons/ButtonIconHeader';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Text from 'app/elements/Text';
import CheckBox from 'app/elements/CheckBox';
import InputItem from 'app/patient-components/InputItem';
import { ScrollView } from 'react-native-gesture-handler';
import TouchablePerson from 'app/patient-components/TouchablePerson';
import AdditionInfo from 'app/patient-components/AdditionInfo';
import PregnancyInfo from 'app/patient-components/AdditionInfo/pregnancyInfo.tsx';
import useModalAnimation from 'app/hooks/useModalAnimation';
import useModalWithKeyboard from 'app/hooks/useModalWithKeyboard';
import ModalSelect from 'app/patient-components/ModalSelect';
import storage from '@react-native-firebase/storage';
import { connect } from 'react-redux';
import ModalAddNewFile from 'app/patient-components/ModalAddNewFile';
import ModalProcess from 'app/patient-components/ModalProcess';
import config from '@_config';
import axios from 'axios';
import { Card, Text as textRnElement, useTheme } from 'react-native-elements';
import { Header } from '@components';

import ImportSuccessful from 'app/patient-components/BookAppointment/ImportSuccessful';
import { IMAGE } from 'app/images/Image';

import CameraPicture from './CameraPicture';
import { dataPerson, dataAddition } from 'app/type/healthyQuestion';
import {
  DATA_ADDITION,
  DATA_CONDITION,
  DATA_PREGNANCY,
  DATA_MENTAL_SURVEY,
  DATA_ATK,
  DATA_MENTAL_SURVEY_2,
  CODVID_DESCRIPTION,
} from 'app/configs/Data';
import { ICON } from 'app/images/Icon';
import { condition } from 'app/type/condition';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import validator from 'validator';
import i18next from 'i18next';

const Attachment = {
  img: IMAGE.childDrink,
};

const menuOptions = [
  {
    id: 0,
    name: 'Take a Photo',
  },
  {
    id: 1,
    name: 'Attach a file',
  },
];
const HealthQuestion = memo(({ navigation, route, auth, user }: any) => {
  if (auth && auth.isAuthenticated && !user.data.verifyId) {
    Alert.alert(
      i18next.t('MODAL_WARNING'),
      i18next.t('MODAL_NOT_VERIFIED'),
      [
        {
          text: i18next.t('CONFIRM_BUTTON'),
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ],
    );
  }

  useEffect(() => {
    checkNetwork();
  }, []);

  const checkNetwork = () => {
    NetInfo.fetch().then(state => {
      console.log(state);
      console.log('Is isInternetReachable?', state.isInternetReachable);

      const notConnected = () => {
        Alert.alert(
          'ไม่สามารถเชื่อมต่อได้',
          'โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
          [
            {
              text: 'ตกลง',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      };

      if (state?.isInternetReachable === false) {
        notConnected();
      }
    });
  };

  const scrollRef = useRef();

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  // const env = process.env.NODE_ENV;
  const { setOptions, navigate } = useNavigation();
  const { visible, open, close, transY } = useModalAnimation();
  const [typeModal, setTypeModal] = useState<number>(1);
  //person
  const [isMale, setIsMale] = useState(false);
  const [dataPerson, setDataPerson] = useState<Array<dataPerson>>(
    DATA_MENTAL_SURVEY,
  );
  const [data2, setDataPerson2] = useState<Array<dataPerson>>(
    DATA_MENTAL_SURVEY_2,
  );
  const [date, setDate] = useState('');

  const [attachment, setAttachment] = useState<any>([]);

  let moreAbout = true;
  //addition
  const [dataCondition, setDataCondition] = useState<Array<dataAddition>>(
    DATA_ADDITION,
  );
  const [dataPregnancy, setDataPregnancy] = useState<Array<dataAddition>>(
    DATA_PREGNANCY,
  );
  const [isCheckAdditionPregnancy, setIsCheckAdditionPregnancy] = useState(
    false,
  );
  const [isCheckAdditionAtk, setIsCheckAdditionAtk] = useState(false);
  const [dataAtk, setDataAtk] = useState<Array<dataAddition>>(DATA_ATK);

  const [isCheckAddition, setIsCheckAddition] = useState(false);
  const [additionCurrent, setAdditionCurrent] = useState<dataAddition>(
    DATA_ADDITION[1],
  );
  const [itemCondition, setItemCondition] = useState<condition>(
    DATA_CONDITION[1],
  );
  const [pregnancyCondition, setPregnancyCondition] = useState<condition>(
    DATA_PREGNANCY[1],
  );
  const [risk, setRisk] = useState<number>(0);
  const [typeModalCondition, setTypeModalCondition] = useState<string>('Add');
  const [age, setAge] = useState<any>('');
  const [weight, setWeight] = useState<any>('');
  const [height, setHeight] = useState<any>('');
  const [infectedDate, setInfectedDate] = useState<any>('');
  const [isCamera, setIsCamera] = useState<any>(false);
  const [photo, setPhoto] = useState<any>(false);
  const [photoShow, setPhotoShow] = useState<any>(false);
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [healthChoice, setHealthChoice] = useState('health_insurance');
  const [type, setType] = useState<any>('pcr');
  const [covidTest, setCovidTest] = useState<any>('');

  const [emergencyNumber, setEmergencyNumber] = useState<any>('');
  const [emergencyName, setEmergencyName] = useState<any>('');
  const [symptomText, setSymptomText] = useState<any>('');
  const [description, setDescription] = useState<number>(0);
  const [isCovid, setIsCovid] = useState<boolean>(false);

  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const textFirstName = user?.data?.userInformation?.firstname;
  const textLastName = user?.data?.userInformation?.lastname;

  const handleSetPicture = (data: any) => {
    setIsCamera(false);
    setPhoto(data);
    setPhotoShow(data.uri);
    setErrors(prev => {
      return { ...prev, photo: null };
    });
  };

  const onChangeText = (value: any, label: string) => {
    switch (label) {
      case 'น้ำหนัก':
        setWeight(value);
        if (value !== '') {
          setErrors(prev => {
            return { ...prev, weight: null };
          });
        } else {
          setErrors(prev => {
            return { ...prev, weight: '*กรุณากรอกน้ำหนัก' };
          });
        }
        break;
      case 'ที่ตรวจโควิด':
        setCovidTest(value);
        if (value !== '') {
          setErrors(prev => {
            return { ...prev, covidTest: null };
          });
        } else {
          setErrors(prev => {
            return { ...prev, covidTest: '*กรุณากรอกที่ตรวจโควิด' };
          });
        }
        break;
      case 'อายุ':
        setAge(value);
        if (value !== '') {
          setErrors(prev => {
            return { ...prev, age: null };
          });
        } else {
          setErrors(prev => {
            return { ...prev, age: '*กรุณากรอกอายุ' };
          });
        }
        break;
      case 'เบอร์ติดต่อฉุกเฉิน':
        setEmergencyNumber(value);
        if (value !== '') {
          setErrors(prev => {
            return { ...prev, emergencyNumber: null };
          });
        } else {
          setErrors(prev => {
            return { ...prev, emergencyNumber: '*กรุณากรอกเบอร์ติดต่อฉุกเฉิน' };
          });
        }
        break;
      case 'symptomText':
        setSymptomText(value);
        break;
      case 'ชื่อผู้ติดต่อฉุกเฉิน':
        setEmergencyName(value);
        if (value !== '') {
          setErrors(prev => {
            return { ...prev, emergencyName: null };
          });
        } else {
          setErrors(prev => {
            return { ...prev, emergencyName: '*กรุณากรอกชื่อผู้ติดต่อฉุกเฉิน' };
          });
        }
        break;
      case 'ส่วนสูง':
        setHeight(value);
        if (value !== '') {
          setErrors(prev => {
            return { ...prev, height: null };
          });
        } else {
          setErrors(prev => {
            return { ...prev, height: '*กรุณากรอกส่วนสูง' };
          });
        }
        break;
      case 'ชื่อจริง':
        setFirstName(value);
        if (value !== '') {
          setErrors(prev => {
            return { ...prev, firstName: null };
          });
        } else {
          setErrors(prev => {
            return { ...prev, firstName: '*กรุณากรอกชื่อจริง' };
          });
        }
        break;
      case 'นามสกุล':
        setLastName(value);
        if (value !== '') {
          setErrors(prev => {
            return { ...prev, lastName: null };
          });
        } else {
          setErrors(prev => {
            return { ...prev, lastName: '*กรุณากรอกนามสกุล' };
          });
        }
        break;
    }
  };

  //check empty input when submit
  const onValidate = () => {
    let newErrors = {};

    if (!covidTest.trim()) {
      newErrors.covidTest = 'กรุณากรอกที่ตรวจโควิด';
    }
    if (!weight.trim()) {
      newErrors.weight = '*กรุณากรอกน้ำหนัก';
    } else if (!validator.isNumeric(weight, (options = { no_symbols: true }))) {
      newErrors.weight = '*กรุณากรอกเฉพาะตัวเลข';
    }

    if (!height.trim()) {
      newErrors.height = '*กรุณากรอกส่วนสูง';
    } else if (!validator.isNumeric(height, (options = { no_symbols: true }))) {
      newErrors.height = '*กรุณากรอกเฉพาะตัวเลข';
    }

    if (!emergencyName.trim()) {
      newErrors.emergencyName = '*กรุณากรอกชื่อผู้ติดต่อฉุกเฉิน';
    }

    if (!emergencyNumber.trim()) {
      newErrors.emergencyNumber = '*กรุณากรอกเบอร์ผู้ติดต่อฉุกเฉิน';
    } else if (
      !(
        validator.isNumeric(
          emergencyNumber,
          (options = { no_symbols: true }),
        ) &&
        (emergencyNumber.length === 9 || emergencyNumber.length === 10)
      )
    ) {
      newErrors.emergencyNumber = '*กรุณาเบอร์โทรศัพท์ให้ถูกต้อง';
    }

    if (!photo) {
      newErrors.photo = '*กรุณาถ่ายรูปผลตรวจโควิด';
    }

    if (!date) {
      newErrors.date = '*กรุณาระบุวันที่ตรวจโควิด';
    }

    if (!firstName.trim()) {
      newErrors.firstName = '*กรุณากรอกชื่อจริง';
    }

    if (!lastName.trim()) {
      newErrors.lastName = '*กรุณากรอกนามสกุล';
    }

    if (!age.trim()) {
      newErrors.age = '*กรุณากรอกอายุ';
    } else if (!validator.isNumeric(age, (options = { no_symbols: true }))) {
      newErrors.age = '*กรุณากรอกเฉพาะตัวเลข';
    }

    setErrors(newErrors);

    return newErrors;
  };

  //ErrorText Component
  const ErrorText = ({ title, style }) => {
    return <Text style={[{ color: 'red', fontSize: 12 }, style]}>{title}</Text>;
  };

  const {
    visible: processVisible,
    open: processOpen,
    close: processClose,
    transY: processTransY,
  } = useModalAnimation();

  const {
    visible: addVisible,
    open: addOpen,
    close: addClose,
    translateY: addTranslateY,
  } = useModalWithKeyboard(false);

  const onMale = () => {
    setIsMale(true);
  };
  const onFemale = () => {
    setIsMale(false);
  };

  const handleAttach = () => {
    close();
    addOpen();
  };

  const onAddSomeone = useCallback(
    (item: dataPerson) => {
      dataPerson.pop();
      dataPerson.push(item);
      dataPerson.push({
        id: item.id + 1,
        firstName: '',
        lastName: '',
        relationshipToYou: 'friend',
        birthday: '10-08-1999',
        isAdd: true,
        check: false,
      });
      //setDataPerson(dataPerson);
      //open();
    },
    [dataPerson],
  );
  const onPressAddition = useCallback(
    (item: dataAddition) => {
      setAdditionCurrent(item);
      if (item.check) {
        let isCheckAdd = false;
        let dataTemp: Array<dataAddition> = [];
        dataCondition.map((data: dataAddition) => {
          if (data.id == item.id) {
            data.check = false;
          }
          dataTemp.push(data);
          if (data.check == true) {
            isCheckAdd = true;
          }
        });
        setIsCheckAddition(isCheckAdd);
        setDataCondition(dataTemp);
      } else {
        let isCheckAdd = false;
        let dataTemp: Array<dataAddition> = [];
        dataCondition.map((data: dataAddition) => {
          if (data.id == item.id) {
            data.check = true;
            // data.conditions.push(item);
          }
          dataTemp.push(data);
          if (data.check == true) {
            isCheckAdd = true;
          }
        });
        setIsCheckAddition(isCheckAdd);
        setDataCondition(dataTemp);
      }
    },
    [additionCurrent, dataCondition, itemCondition, dataPerson],
  );

  const onPressAdditionPregnancy = useCallback(
    (item: dataAddition) => {
      setAdditionCurrent(item);
      if (item.check) {
        let isCheckAdd = false;
        let dataTemp: Array<dataAddition> = [];
        dataPregnancy.map((data: dataAddition) => {
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
        let dataTemp: Array<dataAddition> = [];
        dataPregnancy.map((data: dataAddition) => {
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

  const onPressAdditionAtk = useCallback(
    (item: dataAddition) => {
      setAdditionCurrent(item);
      if (item.check) {
        let isCheckAdd = false;
        let dataTemp: Array<dataAddition> = [];
        let sum = 0;
        dataAtk.map((data: dataAddition) => {
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
        let dataTemp: Array<dataAddition> = [];
        let sum = 0;
        dataAtk.map((data: dataAddition) => {
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

  const onPressSomeone = useCallback(
    (item: dataPerson, formNumber) => {
      // setTypeModal(1);
      if (formNumber === 'firstForm') {
        let dataTemp: Array<dataPerson> = [];
        dataPerson.map((data: dataPerson) => {
          if (data.id == item.id) {
            data.check = true;
          } else {
            data.check = false;
          }
          dataTemp.push(data);
        });
        setDataPerson(dataTemp);
      } else {
        let dataTemp: Array<dataPerson> = [];
        data2.map((data: dataPerson) => {
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
  const onPressDeleted = useCallback(() => {
    let dataTemp: Array<dataAddition> = [];
    dataCondition.map((data: dataAddition) => {
      if (data.id == additionCurrent.id) {
        let addition: Array<condition> = [];
        additionCurrent.conditions.map((conditison: condition) => {
          if (conditison.id == itemCondition.id) {
            //
          } else {
            addition.push(conditison);
          }
        });
        dataTemp.push({
          id: data.id,
          title: data.title,
          check: data.check,
          conditions: addition,
        });
      } else {
        dataTemp.push(data);
      }
    });
    setDataCondition(dataTemp);
    close();
  }, [additionCurrent, dataCondition, itemCondition]);
  const onPressEdit = useCallback(() => {
    setTypeModalCondition('Edit');
    setTypeModal(2);
  }, [additionCurrent, itemCondition, dataCondition]);
  const showModalSuggest = useCallback(() => {
    setTypeModal(4);
    open();
  }, []);
  const gotoSendSuccess = useCallback(() => {
    close();
    navigate(Routes.SendSuccessful);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (route && route.params && route.params.item) {
        setItemCondition(route.params.item);
        setTypeModal(2);
        open();
      }
    }, [route.params?.item]),
  );

  useLayoutEffect(() => {
    setOptions({
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Text
            size={scale(17)}
            lineHeight={20}
            bold
            marginBottom={scale(10)}
            center
          >
            {'Ask Free Question'}
          </Text>
        </View>
      ),
      headerStyle: Theme.headerNavigationStyle,
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  }, [setOptions]);

  const covidFormData = [
    {
      name: 'firstName',
      thName: 'ชื่อจริง',
      value: firstName,
    },
    {
      name: 'lastName',
      thName: 'นามสกุล',
      value: lastName,
    },
    {
      name: 'age',
      thName: 'อายุ',
      value: age,
    },
    {
      name: 'height',
      thName: 'ส่วนสูง',
      value: height,
    },
    {
      name: 'birthDate',
      thName: 'วันเดือนปีเกิด',
      value: moment(user?.data?.userInformation?.birthDate).format(
        'DD/MM/YYYY',
      ),
    },
    {
      name: 'weight',
      thName: 'น้ำหนัก',
      value: weight,
    },
    {
      name: 'emergencyContact',
      thName: 'เบอร์ติดต่อฉุกเฉิน (เบอร์ญาติ)',
      value: emergencyNumber,
    },
    {
      name: 'type',
      thName: 'ชนิดการตรวจ',
      value: type,
    },
    {
      name: 'covidTest',
      thName: 'ที่ตรวจโควิด',
      value: covidTest,
    },
    {
      name: 'sex-isMale',
      thName: 'เพศ',
      value: isMale,
    },
    {
      name: 'symptom',
      thName: 'อาการ',
      value: symptomText,
    },
    {
      name: 'covidDate',
      thName: 'วันที่ของผลตรวจโควิด',
      value: date,
    },
    {
      name: 'emergencyName',
      thName: 'วันที่ของผลตรวจโควิด',
      value: emergencyName,
    },
    {
      name: 'healthChoice',
      thName: 'สิทธิการรักษา',
      value: healthChoice,
    },
    {
      name: 'isCovid',
      thName: 'ตรวจพบเชื้อโควิด-19',
      value: description === 1 || false,
    },
    {
      name: 'riskScore',
      thName: 'ความเสี่ยง',
      value: risk,
    },
    ...dataAtk,
    ...dataPregnancy,
    ...dataCondition,
    ...dataPerson,
  ];

  const navigateToBooking = async () => {
    if (risk >= 0 && risk <= 6) {
      Alert.alert(
        'แจ้งเตือน',
        'คุณยังมีความเสี่ยงติดโรคโควิดต่ำถึงปานกลาง โปรดติดตามอาการแล้วมากรอกแบบสอบถามอีกครั้ง ในวันถัดไป',
        [{ text: 'ยืนยัน', onPress: () => navigation.navigate('Home') }],
      );
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
        covidFormData: covidFormData,
        userAddress,
        userMobileNumber,
      };
      const { data } = await axios.post(
        `${config.VA_API_URL}/Bookings`,
        bookingData,
      );
      if (data) {
        Alert.alert(
          'แจ้งเตือน',
          'คุณมีความเสี่ยงติดโรคโควิดปานกลางถึงสูง จะมีเจ้าหน้าที่ส่งเครื่องตรวจโควิด ATK ไปที่คุณในเร็วๆ นี้',
          [{ text: 'ยืนยัน', onPress: () => navigation.navigate('Home') }],
        );
      } else {
        Alert.alert(
          'แจ้งเตือน',
          'ไม่สามารถทำรายการได้ กรุณาทำรายการใหม่อีกครั้ง',
          [{ text: 'ยืนยัน', onPress: () => navigation.navigate('Home') }],
        );
      }
    }
  };

  const navigateToTelepayment = async () => {
    const errorLength = Object.keys(onValidate()).length;
    if (errorLength === 0) {
      setIsLoading(true);
      const env = process.env.NODE_ENV;
      let uri = photo.uri;
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const ext = uri.split('.').pop(); // Extract image extension
      const name = `${covidFormData[0].value}-${covidFormData[1].value}`;
      const filename = `${name}-covid.${ext}-${Date.now()}`; // Generate unique name
      await storage()
        .ref(`/covid-form/${env}/${filename}`)
        .putFile(uploadUri);
      const imageUpload = await storage()
        .ref(`/covid-form/${env}/${filename}`)
        .getDownloadURL();
      navigate('OnBoarding', {
        covidFormData,
        image: imageUpload,
        roundRobin: true,
      });
      setIsLoading(false);
    } else {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลใหม่อีกครั้ง', [
        { text: 'ยืนยัน', onPress: () => scrollToTop() },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {!auth.isAuthenticated ? (
        <View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#cccccc',
              marginHorizontal: 20,
            }}
          />
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '500' }}>
              คุณยังไม่ได้ลงชื่อเข้าใช้งาน
            </Text>
            <Text style={{ fontSize: 18, marginTop: 5 }}>
              โปรดสมัครสมาชิกแล้วลงชื่อเข้าใช้งานกับ Ever
            </Text>
          </View>
          <TouchableOpacity
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              borderRadius: 5,
              backgroundColor: '#00bae5',
              width: '40%',
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text
              bold
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#FFFFFF',
              }}
            >
              ลงชื่อใช้งาน
            </Text>
          </TouchableOpacity>
        </View>
      ) : isCamera ? (
        <CameraPicture onTakePicture={handleSetPicture} />
      ) : (
        <View>
          <Header text="Covid Form" onPressLeft={() => navigation.goBack()} />

          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ padding: scale(16) }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 10,
                }}
              >
                <Text
                  bold
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#00bae5',
                    marginBottom: 8,
                  }}
                >
                  ปรึกษาแพทย์ทางไกลหรือรับเครื่องตรวจ ATK
                </Text>
                {description ? (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#f5f5f5',
                      backgroundColor: 'white',
                      borderRadius: 20,
                      padding: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ marginBottom: 10, alignSelf: 'center' }}>
                      {CODVID_DESCRIPTION[description]}
                    </Text>
                  </View>
                ) : null}
              </View>
              {description === 1 ? (
                <View>
                  <View style={[styles.frameAddsomeone, { marginTop: 20 }]}>
                    <View style={{ marginTop: 20 }}>
                      <Text>ชนิดการตรวจ</Text>
                      <Picker
                        selectedValue={type}
                        style={{ height: 50 }}
                        onValueChange={(itemValue, itemIndex) => {
                          setType(itemValue);
                        }}
                      >
                        <Picker.Item label="PCR" value="pcr" />
                        <Picker.Item label="ATK" value="atk" />
                      </Picker>
                    </View>
                    <InputItem
                      labelColor={'#262626'}
                      label="ที่ตรวจโควิด"
                      placeholder="ที่ตรวจโควิด"
                      value={covidTest}
                      onChangeText={(value: Number) =>
                        onChangeText(value, 'ที่ตรวจโควิด')
                      }
                    />
                    {errors?.covidTest && (
                      <ErrorText title={errors.covidTest} />
                    )}
                  </View>
                  <View style={styles.frameAddsomeone}>
                    {moreAbout ? (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: '#f5f5f5',
                            marginBottom: 0,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              paddingLeft: 10,
                              marginBottom: 15,
                              color: '#00bae5',
                              fontWeight: 'bold',
                            }}
                          >
                            ยืนยันประวัติผู้ป่วย
                          </Text>
                        </View>
                        {photoShow ? (
                          <TouchableOpacity
                            style={{
                              borderRadius: 30,
                              alignSelf: 'center',
                              marginTop: 30,
                              marginHorizontal: 30,
                              width: '80%',
                              height: 150,
                              borderWidth: 1,
                              borderColor: '#CCC',
                              flexDirection: 'row',
                            }}
                            onPress={() => setIsCamera(true)}
                          >
                            <View
                              style={{ flex: 0.6, justifyContent: 'center' }}
                            >
                              <Image
                                style={{
                                  flex: 1,
                                  borderTopLeftRadius: 30,
                                  borderBottomLeftRadius: 30,
                                }}
                                source={{ uri: photoShow }}
                              />
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <View
                            style={{
                              marginTop: 30,
                              width: '95%',
                              backgroundColor: '#00bae5',
                              height: 50,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 5,
                              marginLeft: '2.5%',
                            }}
                          >
                            <TouchableOpacity onPress={() => setIsCamera(true)}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 18,
                                  fontWeight: 'bold',
                                }}
                              >
                                ถ่ายรูปผลตรวจโควิด
                              </Text>
                            </TouchableOpacity>
                            {errors?.photo && (
                              <ErrorText
                                title={errors.photo}
                                style={{ position: 'absolute', bottom: -20 }}
                              />
                            )}
                          </View>
                        )}
                        <View>
                          <InputItem
                            labelColor={'#262626'}
                            label="ชื่อจริง"
                            placeholder="ชื่อจริง"
                            value={firstName}
                            onChangeText={(value: Number) =>
                              onChangeText(value, 'ชื่อจริง')
                            }
                          />
                          {errors?.firstName && (
                            <ErrorText
                              title={errors.firstName}
                              style={{ position: 'absolute', bottom: -20 }}
                            />
                          )}
                        </View>
                        <View>
                          <InputItem
                            labelColor={'#262626'}
                            label="นามสกุล"
                            placeholder="นามสกุล"
                            value={lastName}
                            onChangeText={(value: Number) =>
                              onChangeText(value, 'นามสกุล')
                            }
                          />
                          {errors?.lastName && (
                            <ErrorText
                              title={errors.lastName}
                              style={{ position: 'absolute', bottom: -20 }}
                            />
                          )}
                        </View>

                        <View style={Theme.flexRowSpace}>
                          <View>
                            <InputItem
                              labelColor={'#262626'}
                              label="น้ำหนัก"
                              placeholder="น้ำหนัก (กก)"
                              keyboardType="numeric"
                              value={weight}
                              onChangeText={(value: Number) =>
                                onChangeText(value, 'น้ำหนัก')
                              }
                            />
                            {errors?.weight && (
                              <ErrorText
                                title={errors.weight}
                                style={{ position: 'absolute', bottom: -20 }}
                              />
                            )}
                          </View>
                          <View>
                            <InputItem
                              labelColor={'#262626'}
                              label="อายุ"
                              placeholder="อายุ (ปี)"
                              value={age}
                              keyboardType="numeric"
                              onChangeText={(value: Number) =>
                                onChangeText(value, 'อายุ')
                              }
                            />
                            {errors?.age && (
                              <ErrorText
                                title={errors.age}
                                style={{ position: 'absolute', bottom: -20 }}
                              />
                            )}
                          </View>
                        </View>
                        <View style={Theme.flexRowSpace}>
                          <View>
                            <InputItem
                              labelColor={'#262626'}
                              label="ส่วนสูง"
                              placeholder="ส่วนสูง (ซม.)"
                              keyboardType="numeric"
                              value={height}
                              onChangeText={(value: Number) =>
                                onChangeText(value, 'ส่วนสูง')
                              }
                            />
                            {errors?.height && (
                              <ErrorText
                                title={errors.height}
                                style={{ position: 'absolute', bottom: -20 }}
                              />
                            )}
                          </View>
                          <View>
                            <View>
                              <Text
                                marginTop={24}
                                marginBottom={-10}
                                marginLeft={10}
                                style={{
                                  zIndex: 10,
                                  paddingHorizontal: 5,
                                  flex: 1,
                                  alignSelf: 'flex-start',
                                  backgroundColor: 'white',
                                }}
                                color="#262626"
                              >
                                วันที่ตรวจโควิด
                              </Text>
                              <TouchableOpacity
                                activeOpacity={0.54}
                                style={{
                                  minWidth: 140,
                                  minHeight: 60,
                                  borderColor: '#dee2e3',
                                  borderWidth: 1,
                                  justifyContent: 'center',
                                  borderRadius: 8,
                                  paddingHorizontal: 16,
                                }}
                                onPress={() => setIsDateVisible(true)}
                              >
                                <Text size={15}>{date}</Text>
                              </TouchableOpacity>
                            </View>
                            {errors?.date && (
                              <ErrorText
                                title={errors.date}
                                style={{ position: 'absolute', bottom: -20 }}
                              />
                            )}
                            <DateTimePickerModal
                              isVisible={isDateVisible}
                              mode="date"
                              onConfirm={date => {
                                setDate(
                                  `${moment(date).format('DD-MM-')}${parseInt(
                                    moment(date).format('YYYY'),
                                  ) + 543}`,
                                );
                                setIsDateVisible(false);
                                setErrors(prev => {
                                  return { ...prev, date: null };
                                });
                              }}
                              onCancel={() => setIsDateVisible(false)}
                            />
                          </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                          <Text>สิทธิการรักษา</Text>
                          <Picker
                            selectedValue={healthChoice}
                            style={{ height: 50 }}
                            onValueChange={(itemValue, itemIndex) => {
                              setHealthChoice(itemValue);
                            }}
                          >
                            <Picker.Item
                              label="ประกันสุขภาพในเขต"
                              value="health_insurance"
                            />
                            <Picker.Item
                              label="ประกันสังคม"
                              value="social_security"
                            />
                            <Picker.Item
                              label="ข้าราชการ"
                              value="government_officer"
                            />
                            <Picker.Item label="ผู้พิการ" value="handicapped" />
                            <Picker.Item label="อื่นๆ" value="other" />
                          </Picker>
                        </View>
                        <InputItem
                          labelColor={'#262626'}
                          label="ชื่อผู้ติดต่อฉุกเฉิน"
                          placeholder="ชื่อผู้ติดต่อฉุกเฉิน"
                          value={emergencyName}
                          onChangeText={(value: String) =>
                            onChangeText(value, 'ชื่อผู้ติดต่อฉุกเฉิน')
                          }
                        />
                        {errors?.emergencyName && (
                          <ErrorText title={errors.emergencyName} />
                        )}
                        <InputItem
                          labelColor={'#262626'}
                          label="เบอร์ติดต่อฉุกเฉิน (เบอร์ญาติ)"
                          placeholder="เบอร์โทรศัพท์"
                          isPhone
                          keyboardType={'numeric'}
                          phoneCode={emergencyNumber}
                          onChangeText={(value: Number) =>
                            onChangeText(value, 'เบอร์ติดต่อฉุกเฉิน')
                          }
                        />
                        {errors?.emergencyNumber && (
                          <ErrorText title={errors.emergencyNumber} />
                        )}
                        <View style={styles.gender}>
                          <Text size={15} lineHeight={18}>
                            เพศ:
                          </Text>
                          <TouchableOpacity
                            activeOpacity={1}
                            style={styles.maleCheck}
                            onPress={onMale}
                          >
                            <CheckBox
                              onPress={onMale}
                              isRounded
                              isCheck={isMale}
                            />
                            <Text size={15} lineHeight={24} marginLeft={8}>
                              ชาย
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={1}
                            style={Theme.flexRow}
                            onPress={onFemale}
                          >
                            <CheckBox
                              onPress={onFemale}
                              isRounded
                              isCheck={!isMale}
                            />
                            <Text size={15} lineHeight={24} marginLeft={8}>
                              หญิง
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ paddingBottom: 50 }} />
                      </>
                    ) : (
                      <></>
                    )}
                  </View>

                  <View style={{ marginTop: 20 }} />

                  {!isMale && (
                    <PregnancyInfo
                      data={dataPregnancy}
                      onPress={(item: any) => onPressAdditionPregnancy(item)}
                      // onPressAdd={() => navigate(Routes.HealthSearch, { route: Routes.HealthQuestion })}
                      // onPress={setItemCondition}
                      onPressAdd={setPregnancyCondition}
                      setModalMore={setTypeModal}
                      openModalMore={open}
                    />
                  )}
                  <View style={{ marginTop: 20 }} />
                  <AdditionInfo
                    header="โรคประจำตัว"
                    data={dataCondition}
                    onPress={(item: any) => onPressAddition(item)}
                    // onPressAdd={() => navigate(Routes.HealthSearch, { route: Routes.HealthQuestion })}
                    // onPress={setItemCondition}
                    onPressAdd={setItemCondition}
                    setModalMore={setTypeModal}
                    openModalMore={open}
                  />
                  <TouchablePerson
                    data={dataPerson}
                    data2={data2}
                    isYou={false}
                    onPress={(item: any) => onPressSomeone(item, 'firstForm')}
                    onPress2={(item: any) => onPressSomeone(item, 'secondForm')}
                    style={{
                      borderRadius: scale(16),
                      backgroundColor: Colors.White,
                      marginBottom: scale(16),
                      marginTop: 16,
                    }}
                  />

                  <Text
                    marginTop={scale(16)}
                    size={scale(11)}
                    lineHeight={scale(18)}
                    center
                    color={'#262626'}
                  >
                    For medical emergencies, please call 911 (or your local
                    {'\n'}
                    emergency services) or go to the nearest ER.
                  </Text>
                  <Text
                    marginTop={scale(8)}
                    size={scale(11)}
                    lineHeight={scale(18)}
                    center
                    color={'#262626'}
                  >
                    Answer on Doctor Plus are not intended for individual{'\n'}
                    diagnosis, treatment of perscription.
                  </Text>
                  <View style={styles.frame}>
                    <View style={styles.styleNote}>
                      <Image source={ICON.security} style={styles.styleIcon} />
                      <Text
                        marginLeft={scale(10)}
                        size={scale(11)}
                        lineHeight={scale(14)}
                        center
                      >
                        You details will remain 100% private and secure
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={navigateToTelepayment}
                      style={
                        loading
                          ? {
                              marginTop: 30,
                              marginBottom: 50,
                              width: '95%',
                              backgroundColor: '#B6B6B6',
                              height: 50,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 5,
                            }
                          : {
                              marginTop: 30,
                              marginBottom: 50,
                              width: '95%',
                              backgroundColor: '#00bae5',
                              height: 50,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 5,
                            }
                      }
                      disabled={loading ? true : false}
                    >
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        {loading && (
                          <View style={{ paddingRight: 10 }}>
                            <ActivityIndicator color="white" />
                          </View>
                        )}
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}
                        >
                          ไปหน้าถัดไป
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : description === 2 ? (
                <View>
                  <AdditionInfo
                    header="แบบประเมิณความเสี่ยง"
                    data={dataAtk}
                    onPress={(item: any) => onPressAdditionAtk(item)}
                  />
                  <TouchableOpacity
                    onPress={navigateToBooking}
                    style={{
                      marginTop: 30,
                      marginBottom: 50,
                      width: '95%',
                      backgroundColor: '#00bae5',
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}
                    >
                      ไปหน้าถัดไป
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.frameAddsomeone, { marginTop: 20 }]}>
                  <Text>คุณได้ตรวจโควิด-19 แล้วพบเชื้อใช่หรือไม่</Text>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}
                    >
                      <View style={{ flex: 0.45 }}>
                        <TouchableOpacity
                          onPress={() => setDescription(2)}
                          style={{
                            marginTop: 30,
                            marginBottom: 50,
                            backgroundColor: '#00bae5',
                            height: 50,
                            padding: 10,
                            justifyContent: 'center',
                            borderRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 13,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}
                          >
                            ไม่ (หรือไม่เคยตรวจ)
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 0.45 }}>
                        <TouchableOpacity
                          onPress={() => setDescription(1)}
                          style={{
                            marginTop: 30,
                            marginBottom: 50,
                            backgroundColor: '#00bae5',
                            height: 50,
                            padding: 10,
                            justifyContent: 'center',
                            borderRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 13,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}
                          >
                            ใช่
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
            <Modal
              visible={visible}
              onRequestClose={close}
              transparent
              animationType={'none'}
            >
              <ModalSelect
                onPressItem={handleAttach}
                choices={menuOptions}
                close={close}
              />
            </Modal>
            <Modal
              visible={addVisible}
              onRequestClose={addClose}
              transparent
              animationType={'slide'}
            >
              <ModalAddNewFile
                close={addClose}
                onAdd={() => {
                  setAttachment(Attachment);
                }}
                translateY={addTranslateY}
              />
            </Modal>
            <Modal
              visible={processVisible}
              onRequestClose={processClose}
              transparent
              animationType={'fade'}
            >
              <ModalProcess onClose={processClose} transY={processTransY}>
                <ImportSuccessful />
              </ModalProcess>
            </Modal>
            <View style={{ marginBottom: 60 }} />
          </ScrollView>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
});

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

export default connect(mapStateToProps)(HealthQuestion);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Snow,
    paddingTop: scale(16),
  },
  frame: {
    marginTop: scale(40),
    backgroundColor: Colors.White,
    height: scale(124),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  styleNote: {
    justifyContent: 'center',
    margin: scale(13),
    flexDirection: 'row',
  },
  styleIcon: {
    width: scale(16),
    height: scale(16),
  },
  headerTitle: {
    flex: 1,
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: scale(8),
  },
  buttonLinear: {
    width: scale(327),
    height: scale(50),
    marginTop: scale(0),
  },
  frameMoreAbout: {
    backgroundColor: Colors.White,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  frameAddsomeone: {
    borderRadius: 20,
    padding: scale(24),
    borderBottomLeftRadius: scale(16),
    borderBottomRightRadius: scale(16),
    backgroundColor: Colors.White,
    marginBottom: scale(16),
  },
  buttonBottom: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 16,
    paddingTop: 13,
    width: 100,
    paddingHorizontal: 24,
    backgroundColor: Colors.White,
  },
  textBottom: {
    ...Theme.flexRowCenter,
    marginBottom: 12,
  },
  gender: {
    ...Theme.flexRow,
    marginTop: 24,
  },
  maleCheck: {
    marginLeft: 14,
    marginRight: 46,
    ...Theme.flexRow,
  },
  question: {
    padding: 12,
  },
  additionalInformation: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.WhiteSmoke,
  },
  showIcon: {
    backgroundColor: Colors.DodgerBlue,
    borderRadius: 4,
    padding: 4,
  },
});
