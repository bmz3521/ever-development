import { getClinicPackageById } from '@services/clinicPackageService';
import { getClinicsById } from '@services/clinicService';
import React, { useCallback, useEffect, useState } from 'react';

const useHooks = ({ navigation, route }) => {
  const { clinicPackageId, clinicId } = route.params;
  const [loading, setLoading] = useState(false);
  const [clinicPackage, setClinicPackage] = useState({});
  const [clinic, setClinic] = useState({});
  const [serviceProcessModalVisible, setServiceProcessModalVisible] = useState(
    false,
  );
  const [preOperationModalVisible, setPreOperationModalVisible] = useState(
    false,
  );
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(
    false,
  );

  useEffect(() => {
    fetchClinicPackage();
    fetchClinic();
  }, [clinicPackageId]);

  const fetchClinicPackage = useCallback(async () => {
    setLoading(true);
    try {
      const clinicPackage = await getClinicPackageById(clinicPackageId);
      const packagePhotosTmp = [
        clinicPackage.Photo1,
        clinicPackage.Photo2,
        clinicPackage.Photo3,
        clinicPackage.Photo4,
        clinicPackage.Photo5,
      ];
      const packagePhotos = packagePhotosTmp.filter(item => item);

      setClinicPackage({ ...clinicPackage, packagePhotos });
    } catch (err) {
      console.log('error get clinic package data');
    }
  }, []);

  const fetchClinic = useCallback(async () => {
    try {
      const clinic = await getClinicsById(clinicId);
      setClinic(clinic);
    } catch (err) {
      console.log('error get clinic data');
    } finally {
      setLoading(false);
    }
  }, []);

  const onBooking = () => {
    navigation.navigate('SelectTreatmentTimeSlot', {
      clinic: clinic,
      clinicPackage: clinicPackage,
      type: 'clinicPackage',
    });
  };

  return {
    clinicPackage,
    clinic,
    loading,
    serviceProcessModalVisible,
    preOperationModalVisible,
    descriptionModalVisible,
    actions: {
      setServiceProcessModalVisible,
      setPreOperationModalVisible,
      setDescriptionModalVisible,
      onBooking,
    },
  };
};

export default useHooks;
