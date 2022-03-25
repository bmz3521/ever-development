import { getSymptomGroups } from '@services/symptomGroupService';
import React, { useState, useEffect } from 'react';

const useHooks = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [symptomGroup, setSymptomGroup] = useState([]);

  const [symptomGroupLoading, setSymptomGroupLoading] = useState(false);

  const fetchSymptomGroups = async () => {
    setSymptomGroupLoading(true);
    try {
      const symptomGroup = await getSymptomGroups();

      setSymptomGroup(symptomGroup);
      setSymptomGroupLoading(false);
    } catch (error) {
      console.log('error get symptomGroup', error);
    }
  };

  useEffect(() => {
    fetchSymptomGroups();
  }, []);

  useEffect(() => {
    if (!symptomGroupLoading) {
      setLoading(false);
    }
  }, [symptomGroupLoading]);

  return {
    actions: {},
    symptomGroup,
    loading,
  };
};

export default useHooks;
