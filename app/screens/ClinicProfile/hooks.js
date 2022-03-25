import React, { useCallback, useEffect, useState } from 'react';
import { getClinicsById } from '@services/clinicService';
import { useSelector } from 'react-redux';

const useHooks = ({ navigation, route }) => {
  const { clinicId } = route?.params;
  const [clinic, setClinic] = useState('');
  const [loading, setLoading] = useState(false);

  const [aboutTextShown, setAboutTextShown] = useState(false);
  const [aboutLengthMore, setAboutLengthMore] = useState(false);

  const amenities = clinic?.Amenities;
  const [amenityTextShown, setAmenityTextShown] = useState(false);
  const [amenityShown, setAmenityShown] = useState([]);

  const doctors = clinic?.Doctors;
  const doctorList = clinic?.Doctors?.slice(0, 4);
  const [careTeamTextShown, setCareTeamTextShown] = useState(false);
  const [careTeamLengthMore, setCareTeamLengthMore] = useState(false);
  const [hasInSaveList, setHasInSaveList] = useState(false);

  const savelist = useSelector(state => state.savelist.data);

  useEffect(() => {
    const saved = savelist
      .map(item => item.clinics)
      .flat()
      .find(item => item.id == clinicId);

    setHasInSaveList(saved);
  }, [savelist]);

  const toggleNumberOfLines = text => {
    switch (text) {
      case 'about':
        setAboutTextShown(!aboutTextShown);
        break;
      case 'amenities':
        setAmenityTextShown(!amenityTextShown);
        break;
      case 'careteam':
        setCareTeamTextShown(!careTeamTextShown);
        break;
    }
  };

  useEffect(() => {
    if (amenityTextShown) {
      setAmenityShown(amenities);
    } else {
      setAmenityShown(amenities?.slice(0, 3));
    }
  }, [amenityTextShown, amenities]);

  const onAboutTextLayout = useCallback(e => {
    setAboutLengthMore(e.nativeEvent.lines.length >= 5);
  }, []);

  const onCareTeamTextLayout = useCallback(e => {
    setCareTeamLengthMore(e.nativeEvent.lines.length >= 5);
  }, []);

  const fetchClinic = useCallback(async () => {
    setLoading(true);
    try {
      const clinic = await getClinicsById(clinicId);
      setClinic(clinic);
      setLoading(false);
    } catch (err) {
      console.log('error get clinic data');
    }
  }, []);

  useEffect(() => {
    fetchClinic();
  }, []);

  const navigateToSelectTime = clinic => {
    navigation.navigate('SelectTreatmentTimeSlot', {
      clinic: clinic,
      type: 'procedure',
    });
  };

  return {
    actions: {
      navigateToSelectTime,
      toggleNumberOfLines,
      onAboutTextLayout,
      onCareTeamTextLayout,
    },
    clinic,
    loading,
    aboutTextShown,
    aboutLengthMore,
    amenities,
    amenityShown,
    amenityTextShown,
    careTeamTextShown,
    careTeamLengthMore,
    doctorList,
    doctors,
    hasInSaveList,
  };
};

export default useHooks;
