import React, { useCallback, useEffect, useState } from 'react';
import { getTotalPrice, getProcedureGroup } from '@utils/shared';

const useHooks = ({ navigation, route }) => {
  const { clinic, quotation } = route.params;
  const [selectedList, setSelectedList] = useState([]);
  const procedureGroup = getProcedureGroup(clinic.Procedures);

  useEffect(() => {
    if (route.params?.selectedProcedures) {
      setSelectedList(route.params?.selectedProcedures);
    }
  }, [route.params]);

  const onReset = useCallback(() => {
    setSelectedList([]);
  }, []);

  const onNext = useCallback(() => {
    navigation.navigate('MedicalQueryForm', {
      clinic: clinic,
      quotation: Object.assign({}, quotation, {
        procedures: selectedList,
        totalPrice: getTotalPrice(selectedList),
      }),
      type: 'procedure',
    });
  }, [navigation, clinic, quotation, selectedList]);

  return {
    actions: {
      onNext,
      onReset,
    },
    timeFormat: quotation.timeFormat,
    clinic,
    quotation,
    procedureGroup,
    selectedList,
  };
};

export default useHooks;
