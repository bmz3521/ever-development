import React, { useEffect, useState } from 'react';
import {
  getPractitioners,
  getEverPractitioners,
} from '@services/practitionerService';
import { getClinics } from '@services/clinicService';
import { getClinicPackages } from '@services/clinicPackageService';
import { useSelector, useDispatch } from 'react-redux';
import { SavelistActions } from '@actions';

const useHooks = ({ doctorType, navigation }) => {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [clinicPackages, setClinicPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const [practitionerRefreshing, setPractitionerRefreshing] = useState(false);
  const [practitionerPage, setPractitionerPage] = useState(1);
  const [practitionerIsLoading, setPractitionerIsLoading] = useState(false);
  const [clinicPage, setClinicPage] = useState(1);
  const [clinicIsLoading, setClinicIsLoading] = useState(false);
  const [clinicRefreshing, setClinicRefreshing] = useState(false);
  const [clinicPackagePage, setClinicPackagePage] = useState(1);
  const [clinicPackageIsLoading, setClinicPackageIsLoading] = useState(false);
  const [clinicPackageRefreshing, setClinicPackageRefreshing] = useState(false);
  const savelist = useSelector(state => state.savelist.data);

  useEffect(() => {
    if (error && errorText) {
      throw new Error(errorText);
    }
  }, [error, errorText]);

  const fetchDoctorList = async () => {
    setPractitionerIsLoading(true);
    try {
      practitioners = await getPractitioners(doctorType.id, practitionerPage);

      if (practitioners.data.length) {
        const more = doctors.concat(practitioners.data);
        setPractitionerPage(prev => prev + 1);
        setDoctors(more);
      }
      setPractitionerIsLoading(false);
    } catch (error) {
      setError(true);
      setErrorText(error.err.message);
    } finally {
      setPractitionerIsLoading(false);
    }
  };

  const fetchClinicList = async () => {
    setClinicIsLoading(true);
    try {
      const clinic = await getClinics(clinicPage);
      if (clinic.data.length) {
        const more = clinics.concat(clinic.data);
        setClinicPage(prev => prev + 1);
        setClinics(more);
      }
      setClinicIsLoading(false);
    } catch (error) {
      setError(true);
      setErrorText(error.err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchClinicPackageList = async () => {
    setClinicPackageIsLoading(true);
    try {
      const clinicPackage = await getClinicPackages(clinicPackagePage);
      if (clinicPackage.data.length) {
        const more = clinicPackages.concat(clinicPackage.data);
        setClinicPackagePage(prev => prev + 1);
        setClinicPackages(more);
      }
      setClinicPackageIsLoading(false);
    } catch (error) {
      setError(true);
      setErrorText(error.err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSaveList = async () => {
    dispatch(SavelistActions.getSavelist({ userId: user.userId }));
  };

  const handlePressDoctorCard = async doctor => {
    navigation.navigate('TeleDoctorProfile', {
      practitionerType: doctorType,
      practitioner: doctor,
    });
  };

  const onClinicRefresh = async () => {
    setClinicRefreshing(true);
    await fetchClinicList();
    setClinicRefreshing(false);
  };

  const onPractitionerRefresh = async () => {
    setPractitionerRefreshing(true);
    await fetchDoctorList();
    setPractitionerRefreshing(false);
  };

  const onClinicPackageRefresh = async () => {
    setClinicPackageRefreshing(true);
    await fetchClinicPackageList();
    setClinicPackageRefreshing(false);
  };

  useEffect(() => {
    fetchDoctorList();
    fetchClinicList();
    fetchClinicPackageList();
    fetchSaveList();
    setLoading(false);
  }, [navigation]);

  return {
    doctors,
    clinics,
    clinicPackages,
    loading,
    searchText,
    practitionerRefreshing,
    practitionerIsLoading,
    clinicIsLoading,
    clinicRefreshing,
    clinicPackageIsLoading,
    clinicPackageRefreshing,
    savelist,
    events: {
      handlePressDoctorCard,
      setSearchText,
      onPractitionerRefresh,
      fetchDoctorList,
      fetchClinicList,
      onClinicRefresh,
      fetchClinicPackageList,
      onClinicPackageRefresh,
      setIndex,
    },
  };
};

export { useHooks };
