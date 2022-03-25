import React, { useState, useCallback, useEffect } from 'react';

const useHooks = ({ navigation, route }) => {
  const { title, procedures, from, apple } = route?.params;

  const [searchField, setSearchField] = useState('');
  const [dataFilter, setDataFilter] = useState([]);
  const [selectedProcedures, setSelectedProcedures] = useState([]);

  useEffect(() => {
    let filteredData = procedures.filter(procedure =>
      procedure.name.toLowerCase().includes(searchField.toLowerCase()),
    );
    setDataFilter(filteredData);
  }, [searchField, procedures]);

  useEffect(() => {
    if (route.params?.selectedList) {
      setSelectedProcedures(route.params?.selectedList);
    }
  }, [route.params?.selectedList]);

  const onConfirm = () => {
    navigation.navigate({
      name: 'SelectProcedure',
      params: {
        selectedProcedures: selectedProcedures,
      },
      merge: true,
    });
  };

  return {
    actions: {
      setSearchField,
      setSelectedProcedures,
      onConfirm,
    },
    title,
    from,
    searchField,
    dataFilter,
    selectedProcedures,
  };
};

export default useHooks;
