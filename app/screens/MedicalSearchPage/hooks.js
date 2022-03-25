import React, { useEffect, useState, useCallback } from 'react';
import { getProcedureList } from '@services/procedureListService';
import { getCountries } from '@services/countriesService';
import {
  runOnJS,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { SearchActions } from '@actions';
import { Platform } from 'react-native';

const useHooks = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const searchReducer = useSelector(state => state.search);

  const offset = useSharedValue(0);
  const width = useSharedValue(300);
  const borderValue = useSharedValue(0);

  const offset2 = useSharedValue(0);
  const width2 = useSharedValue(300);
  const borderValue2 = useSharedValue(0);

  const [showData, setShowData] = useState(false);
  const [showData2, setShowData2] = useState(false);
  const [showNextStep, setShowNextStep] = useState(true);

  const [countrySelected, setCountrySelected] = useState('');
  const [procedureSelected, setProcedureSelected] = useState('');

  const [search, setSearch] = useState('');
  const [search2, setSearch2] = useState('');

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [filteredDataSourceCountry, setFilteredDataSourceCountry] = useState(
    [],
  );
  const [masterDataSourceCountry, setMasterDataSourceCountry] = useState([]);

  const fetchProcedure = useCallback(async () => {
    try {
      const procedureList = await getProcedureList();
      setFilteredDataSource(procedureList);
      setMasterDataSource(procedureList);
    } catch (error) {
      console.log('err', error);
    }
  }, []);

  const fetchCountry = useCallback(async () => {
    try {
      const countries = await getCountries();
      setFilteredDataSourceCountry(countries);
      setMasterDataSourceCountry(countries);
    } catch (err) {
      console.log('error', err);
    }
  }, []);

  const clearCountry = () => {
    setShowNextStep(true);

    width.value = 300;
    offset.value = withSpring(0, { duration: 1 });
    borderValue.value = withSpring(0, { duration: 1 });
    setShowData(false);
    setSearch('');
    setCountrySelected('');

    width2.value = 300;
    offset2.value = withSpring(0, { duration: 1 });
    offset.value = withSpring(0);
    borderValue2.value = withSpring(0, { duration: 1 });
  };

  const completedCountry = () => {
    if (procedureSelected !== '') {
      width.value = 300;
      offset.value = withSpring(0);
      borderValue.value = withSpring(0);
      setShowNextStep(false);
    }

    setShowData(false);
    if (procedureSelected === '') {
      width.value = 300;
      offset.value = withSpring(-20);
      borderValue.value = withSpring(0);
      setShowData2(true);
    }
  };

  const clearProcedure = () => {
    width2.value = 300;
    offset2.value = withSpring(0, { duration: 1 });
    offset.value = withSpring(0);
    setShowNextStep(true);

    borderValue2.value = withSpring(0, { duration: 1 });
    setShowData2(false);
    setSearch2('');
    setProcedureSelected('');
  };

  const completedProcedure = () => {
    if (countrySelected === '') {
      width.value = 320;
      offset.value = withSpring(-50, { duration: 10 });
      borderValue.value = 20;

      setShowData(true);
      setShowData2(false);
    }

    if (countrySelected !== '') {
      offset.value = withSpring(0);
      width2.value = 300;
      offset2.value = withSpring(0);
      borderValue2.value = withSpring(0);
      setShowData2(false);

      setShowNextStep(false);
    }
  };

  const searchFilterCountry = text => {
    // Check if searched text is not blank
    clearCountry();

    if (text) {
      setShowData(true);
      width.value = 320;
      offset.value = withSpring(-50, { duration: 10 });
      borderValue.value = 20;

      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource

      const newData =
        masterDataSourceCountry &&
        masterDataSourceCountry.filter(function(item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();

          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSourceCountry(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSourceCountry(masterDataSource);
      setSearch(text);
    }
  };

  const searchFilterProcedure = async text => {
    // Check if searched text is not blank
    clearProcedure();
    if (countrySelected === '') {
      width.value = 300;
      offset.value = withSpring(0, { duration: 1 });
      borderValue.value = withSpring(0, { duration: 1 });
      setShowData(false);
    }

    if (text) {
      setShowData2(true);
      width2.value = 320;
      offset2.value = withSpring(-50, { duration: 10 });
      borderValue2.value = 20;

      let andFilter = [];

      // andFilter = [{ name: { ilike: '%25' + text + '%25' } }];
      andFilter = [{ name: { ilike: '%' + text + '%' } }];

      const filter = { where: { and: andFilter }, limit: 8 };

      setSearch2(text);

      try {
        const procedureFilterList = await getProcedureList(filter);
        setFilteredDataSource(procedureFilterList);
      } catch (err) {
        console.log('error filter data', err);
      }
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch2(text);
    }
  };

  const setPreMadeOption = item => {
    setCountrySelected(item.selectedCountry);
    setProcedureSelected(item.selectedProcedure);

    goToListingPageWithPreOptions(item.selectedCountry, item.selectedProcedure);
  };

  const setItemCountry = item => {
    // Function for click on an item
    setCountrySelected(item.name);

    if (procedureSelected === '') {
      width2.value = 320;
      offset2.value = withSpring(-50, { duration: 10 });
      borderValue2.value = 20;
      setShowData2(true);
    }

    if (procedureSelected !== '') {
      width2.value = 300;
      offset2.value = withSpring(0);
      borderValue2.value = withSpring(0);
    }

    completedCountry();

    console.log('Id : ' + item.id + ' Title : ' + item.name);
  };

  const setItemProcedure = item => {
    // Function for click on an item
    setProcedureSelected(item.name);
    width2.value = 300;
    offset2.value = withSpring(0, { duration: 1 });

    completedProcedure();
    console.log('Id : ' + item.id + ' Title : ' + item.name);
  };

  const goToListingPageWithPreOptions = (country, procedure) => {
    let reducerList = searchReducer.data;

    dispatch(
      SearchActions.saveSearchInfo({
        data: reducerList,
        selectedCountry: country,
        selectedProcedure: procedure,
        callback: response => {
          // console.log('response', response);
          if (response.success) {
            console.log('searchReducer', searchReducer);
            console.log('triggerred');

            // alert('SUCCESS')
          } else {
            alert('FAIL');
            console.log('failed');
          }
        },
      }),
    );

    navigation.navigate('MainStack', {
      screen: 'ItemFilterScreen',
    });
  };

  const goToListingPage = () => {
    // console.log('gotolistingpage');
    let reducerList = searchReducer.data || [];
    // console.log('reducerList', reducerList);

    if (searchReducer.data && searchReducer.data.length > 5) {
      // console.log('gotolistingpage2');
      reducerList.shift();
      // console.log(reducerList);
      reducerList.push({
        selectedCountry: countrySelected,
        selectedProcedure: procedureSelected,
      });
    } else {
      console.log('reducerList2', reducerList);
      reducerList.push({
        selectedCountry: countrySelected,
        selectedProcedure: procedureSelected,
      });
      console.log('newList', reducerList);
    }

    dispatch(
      SearchActions.saveSearchInfo({
        data: reducerList,
        selectedCountry: countrySelected,
        selectedProcedure: procedureSelected,
        callback: response => {
          console.log('response', response);
          if (response.success) {
            console.log('searchReducer', searchReducer);
            console.log('triggerred');

            // alert('SUCCESS')
          } else {
            alert('FAIL');
            console.log('failed');
          }
        },
      }),
    );

    navigation.navigate('MainStack', {
      screen: 'ItemFilterScreen',
    });
  };

  useEffect(() => {
    fetchCountry();
    fetchProcedure();
  }, [navigation]);

  return {
    actions: {
      setPreMadeOption,
      setItemProcedure,
      setItemCountry,
      setShowData,
      searchFilterCountry,
      searchFilterProcedure,
      clearCountry,
      clearProcedure,
      goToListingPage,
    },
    filteredDataSource,
    filteredDataSourceCountry,
    countrySelected,
    procedureSelected,
    search,
    search2,
    showData,
    showData2,
    showNextStep,
    searchReducer,
    offset,
    width,
    borderValue,
    offset2,
    width2,
    borderValue2,
  };
};

export default useHooks;
