import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getPractitionerTypes,
  getPractitioners,
} from '@services/practitionerService';
import { Images } from '@config';
import { useSelector } from 'react-redux';
import { getEverPractitioners } from 'app/services/practitionerService';

const useHooks = () => {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [isShowAll, setIsShowAll] = useState(false);
  const [isPractitionersLoading, setIsPractitionersLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [doctorTypes, setDoctorTypes] = useState();

  useEffect(() => {
    if (error && errorText) {
      throw new Error(errorText);
    }
  }, [error, errorText]);

  const fetchSpecialties = async () => {
    try {
      const userLang = await AsyncStorage.getItem('user_lang');
      const practitionerTypes = await getPractitionerTypes();
      const practitionerTypesMutated = practitionerTypes.filter(
        item => ![`พยาบาล`, `เภสัชกร`].includes(item.nameTh),
      );
      let resultsAfterAdjust = [];
      if (isShowAll) {
        resultsAfterAdjust = practitionerTypesMutated;
      } else {
        for (const item of practitionerTypesMutated) {
          let practitionerList;
          practitionerList = await getPractitioners(item.id, 1);

          if (practitionerList.meta.totalItemCount > 0) {
            resultsAfterAdjust.push(item);
          }
        }
      }

      const results = resultsAfterAdjust.map(item => {
        return {
          id: item.id,
          name: userLang === 'th' ? item.nameTh : item.name,
          icon: Images[item.name.replace(' ', '')],
        };
      });
      setDoctorTypes(results);
      setIsPractitionersLoading(false);
      setLoading(false);
    } catch (error) {
      console.log('Error getting practitioner types ==', error);
    }
  };

  const handleShowAll = () => {
    setIsPractitionersLoading(true);
    setIsShowAll(!isShowAll);
  };

  useEffect(() => {
    fetchSpecialties();
  }, [isShowAll]);

  return {
    doctorTypes,
    loading,
    isShowAll,
    isPractitionersLoading,
    handleShowAll,
  };
};

export { useHooks };
