import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import { TabView, SceneMap } from 'react-native-tab-view';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import RangeSlider from 'rn-range-slider';

import { SwitchToggle } from '@dooboo-ui/native';

import Modal, {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-modals';
import {
  // Image,
  Header,
  Text,
  Icon,
  ClinicItem,
  Card,
  Button,
  SafeAreaView,
  CarouselComponent,
  EventCard,
  Tag,
  ClinicPackageItem,
} from '@components';

import { connect } from 'react-redux';
import injectSaga from '@utils/injectSaga';
import injectReducer from '@utils/injectReducer';
import { BaseStyle, BaseColor, Images } from '@config';
import * as Utils from '@utils';
import styles from './styles';
import config from '../../config';
import { filterBuilder } from '../../services/queryService';

import { compose } from 'redux';

import reducer from './reducer';
import saga from './saga';

import { getAmenities, getAccreditations } from './actions';
import { createStructuredSelector } from 'reselect';
import makeSelectItemFilterScreen from './selectors';

import {
  SpecialListClinicAPI,
  ClinicAPI,
  ClinicPackagesAPI,
  CountryAPI,
  CityAPI,
  ProcedureListAPI,
  DoctorsAPI,
} from '../../api';

// Load sample data
import {
  PromotionData,
  ClinicPackageData,
  ClinicData,
  DoctorData,
} from '@data';

export default class ItemFilterScreen extends Component {
  constructor(props) {
    super(props);

    const extFilter = {
      everPlus: 'no',
      apt: 'no',
      cityCenter: 'no',
      location: null,
      tag: null,
    };

    // Temp data define
    this.state = {
      enableScrollViewScroll: true,
      doctorIsAlreadyLoaded: false,
      clinicIsAlreadyLoaded: false,
      selectedSkipAmount: 14,
      selectedLimitAmount: 14,
      clinicPackageSkipAmount: 0,
      clinicSkipAmount: 0,
      doctorSkipAmount: 0,
      queryTagSearch: ['Japanese', 'Test2'],
      activePage: 0,
      activeTab: 'clinicPackages',
      filterVisible: false,
      clinicPackage: [],
      doctor: [],
      diary: [],
      visible: false,
      loadMore: false,
      extFilter,
      skipTotalPackage: 0,
      skipTotalDoctor: 0,
      skipTotalDiary: 0,
      skipTotalClinic: 0,
      isFetching: false,
      hasScrolled: false,
      clinics: [],
      queryValue: 'Breast Reduction',
      searchKey: [],
      Loading: true,
      loading: false,
      search: '',
      plusClinics: [],
      clinicCloseToCity: [],
      clinicCloseToPublicTransport: [],
      normalClinics: [],
      popularDestinations: [],
      topAsia: [],
      countries: [],
      defaultCountries: [],
      error: null,
      queryString: [],
      recommendedClinics: [],
      selectedOptionLocation: null,
      selectedOptionProcedure: null,
      procedureList: [],
      isLoadingProcedure: true,
      isLoading: true,
      topDentalClinics: [],
      icons: [
        { icon: Images.dental_icon1, name: 'Clinic', route: 'Event' },
        { icon: Images.dental_icon2, name: 'Package', route: 'Package' },
        { icon: Images.dental_icon3, name: 'Car', route: 'Car' },
        { icon: Images.dental_icon4, name: 'Flight', route: 'FlightSearch' },
        { icon: Images.dental_icon5, name: 'Cruise', route: 'Event' },
        { icon: Images.dental_icon6, name: 'Bus', route: 'BusSearch' },
      ],
      featuredClinics: [
        { icon: Images.dental_icon1, name: 'Clinic', route: 'Clinic' },
        { icon: Images.dental_icon2, name: 'Package', route: 'Package' },
        { icon: Images.dental_icon3, name: 'Car', route: 'Car' },
      ],
      promotion: PromotionData,
      packages: ClinicPackageData,
      doctors: DoctorData,
      heightHeader: Utils.heightHeader(),
      tabType: '',
    };
    this._deltaY = new Animated.Value(0);
  }

  /**
   * @description Show icon services on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */

  //  static getDerivedStateFromProps(nextProps, prevState) {
  //      console.log("getDerivedStateFromProps");
  //     // const { searchKey } = this.state;
  // //     const { navigation } = this.props;
  // //    const { searchKey } = this.props.navigation.state.params;
  // const searchKey = 0;

  //     if (searchKey !== prevState.searchKey) {
  //       const pQ = searchKey;
  //       const extFilter = {
  //         everPlus: 'no',
  //         apt: 'no',
  //         cityCenter: 'no',
  //         location: null,
  //         tag: null,
  //         accreditationLevel: null,
  //         languages: null,
  //         facilities: null,
  //       };
  //       const nState = {};

  //       if (pQ.tag) {
  //         extFilter.tag = pQ.tag;
  //       }

  //       if (pQ.citycenter == 'yes') {
  //         nState.baconIsReadycitycenter = true;
  //         extFilter.cityCenter = 'yes';
  //       }
  //       if (pQ.apt == `yes`) {
  //         nState.baconIsReadylocation = true;
  //         extFilter.apt = 'yes';
  //       }
  //       if (pQ.evergoplus == `yes`) {
  //         nState.baconIsReady = true;
  //         extFilter.everPlus = 'yes';
  //       }
  //       if (pQ.languages && pQ.languages.length > 0) {
  //         extFilter.languages = pQ.languages.split(',');
  //       }
  //       if (pQ.accreditationlevel && pQ.accreditationlevel.length > 0) {
  //         extFilter.accreditationLevel = pQ.accreditationlevel.split(',');
  //       }
  //       if (pQ.facilities && pQ.facilities.length > 0) {
  //         extFilter.facilities = pQ.facilities.split(',');
  //       }
  //       if (pQ.location) {
  //         extFilter.location = pQ.location;
  //       }
  //       if (pQ.priceLevel) {
  //         extFilter.priceLevel = pQ.priceLevel.split(',');
  //       }

  //       const filter = {
  //         ...prevState.extFilter,
  //         ...extFilter,
  //         location: pQ.location ? pQ.location : null,
  //       };
  //       // return { ...prevState, queryValue: pQ.query, querySearch :nextProps.location.search };
  //       return {
  //         queryValue: pQ.query,
  //         exceptkeyword: !!(pQ.exkw && pQ.exkw == 'yes'),
  //         querySearch: 'Dental Crown',
  //         extFilter: filter,
  //         ...nState,
  //       };
  //     }
  //     return null;
  //   }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { searchKey } = '';
    // const { searchKey } = this.props.navigation.state.params;

    // console.log(searchKey);
    console.log('searchKey didmount');
    // this.setState({clinics: [{name: "Healthy Skin Clinic", address: "52 Phangnga Road Phuket Town, Phuket 83000 Dental Crown"}]})
    if (searchKey == '') {
      console.log('no searchKey');
      // this.props.history.replace('/s/all?search_type=UNKNOWN');
      return null;
    }
    // const pQ = queryString.parse(this.props.location.search);
    const pQ = this.state.queryValue;
    const filterQueryTagSearch = this.state.queryTagSearch;
    // const this.state.queryTagSearch = [];
    const pT = 'Dental Crown';
    // const limit = 12;
    // const skipAmount = 10;
    console.log(pQ);
    const { exceptkeyword } = this.state;
    this.fetchProcedureList();
    // this.querySimlier();
    Promise.all([this.findCountry(pQ), this.findCity(pQ)]).then(
      async resval => {
        const countryRes = resval.length >= 1 ? resval[0] : null;
        const cityRes = resval.length == 2 ? resval[1] : null;
        const isCountry = !!(!!countryRes.res || !!cityRes.res);
        const country = isCountry ? countryRes.res || cityRes.res : '';
        const oSearchCond = this.searchCondBuilder(
          isCountry,
          pQ,
          this.state.extFilter,
        );
        // const { keyword: sKeyword, keywordFields, filters, includeFilters } = oSearchCond;
        // const oCond = filterBuilder(sKeyword, keywordFields, filters, includeFilters);
        const oCond = filterBuilder({
          oSearchCond,
          limit: this.state.selectedLimitAmount,
          skipAmount: this.state.clinicPackageSkipAmount,
        });
        console.log('oCondA');

        console.log({
          ...oCond,
          queryProcedure: pQ,
          querySpecialities: pQ,
          clinicPackageTagSearch: [],
        });
        const resClinicPackage = await ClinicPackagesAPI.filterwhere({
          ...oCond,
          queryProcedure: pQ,
          querySpecialities: pQ,
          clinicPackageTagSearch: [this.state.queryTagSearch],
        });

        console.log('res');
        console.log(resClinicPackage);
        // const isKeyword = !!res && res.length > 0 ? true : false;
        // const isKeyword = !!pQ;
        const isKeyword = exceptkeyword || !!pQ;
        let spRes = [];
        if (!isCountry && (!resClinicPackage || resClinicPackage.length == 0)) {
          const pFilter = { filter: { where: { name: pQ } } };
          const pRes = await ProcedureListAPI.find(pFilter);
          const spName = !!pRes && pRes.length > 0 ? pRes[0].specialist : null;
          const nExtFilter = { ...this.state.extFilter, tag: spName };
          const oSpSearchCond = this.searchCondBuilder(
            isCountry,
            null,
            nExtFilter,
          );
          const spCond = filterBuilder(oSpSearchCond);
          console.log('spCond');
          spRes = await ClinicAPI.filterwhere(spCond);
        }
        const isSp = spRes.length > 0 ? true : false;

        // console.log("ClinicPackage");

        // const x = res.map(e => e.ClinicPackages).flat();

        // const result = []

        // const y = res.map(({ClinicPackage}) => ClinicPackage).forEach(arr => result.push(...arr))

        // console.log("ClinicPackage");

        // console.log(x);
        // console.log(result);

        // let x = res.map(function(val) {
        //     return val.ClinicPackage;
        //   }).reduce(function(pre, cur) {
        //      return pre.concat(cur);
        //   }).map(function(e,i) {
        //     return {value:e};
        //   });

        this.setState({
          isKeyword,
          isCountry,
          country: [country],
          // clinics: !!res && res.length > 0 ? res : spRes,
          clinicPackage:
            !!resClinicPackage && resClinicPackage.length > 0
              ? resClinicPackage
              : [],
          storeClinics: null,
          isReady: true,
          isSpecialties: isSp,
          clinicPackageSkipAmount:
            this.state.clinicPackageSkipAmount + this.state.selectedLimitAmount,
        });
      },
    );

    // dispatch(getAmenities());
    // dispatch(getAccreditations());
  }

  //   async componentDidUpdate(prevProps, prevState) {
  //     console.log("componentDidUpdate");

  //     const pQ = this.state.queryValue;
  //     const { exceptkeyword } = this.state;

  //     if (prevState.querySearch !== this.state.querySearch) {
  //       Promise.all([this.findCountry(pQ), this.findCity(pQ)]).then(
  //         async resval => {
  //           const countryRes = resval.length >= 1 ? resval[0] : null;
  //           const cityRes = resval.length == 2 ? resval[1] : null;
  //           const isCountry = !!(!!countryRes.res || !!cityRes.res);
  //           const country = isCountry ? countryRes.res || cityRes.res : '';
  //           const oSearchCond = this.searchCondBuilder(
  //             isCountry,
  //             pQ,
  //             this.state.extFilter,
  //           );
  //           // const { keyword: sKeyword, keywordFields, filters, includeFilters } = oSearchCond;
  //           // const oCond = filterBuilder(sKeyword, keywordFields, filters, includeFilters);
  //           const oCond = filterBuilder(oSearchCond);
  //           this.setState({ isLoading: true });
  //           const res = await ClinicAPI.filterwhere(oCond);
  //           // const isKeyword = !!res && res.length > 0 ? true : false;
  //           // const isKeyword = !!pQ;
  //           const isKeyword = exceptkeyword || !!pQ;

  //           let spRes = [];
  //           if (!isCountry && (!res || res.length == 0)) {
  //             const pFilter = { filter: { where: { name: pQ } } };
  //             const pRes = await ProcedureListAPI.find(pFilter);
  //             const spName =
  //               !!pRes && pRes.length > 0 ? pRes[0].specialist : null;
  //             const nExtFilter = { ...this.state.extFilter, tag: spName };
  //             const oSpSearchCond = this.searchCondBuilder(
  //               isCountry,
  //               null,
  //               nExtFilter,
  //             );
  //             const spCond = filterBuilder(oSpSearchCond);
  //             spRes = await ClinicAPI.filterwhere(spCond);
  //           }
  //           const isSp = spRes.length > 0 ? true : false;

  //           this.setState({
  //             isKeyword,
  //             isCountry,
  //             country: [country],
  //             clinics: !!res && res.length > 0 ? res : spRes,
  //             storeClinics: null,
  //             isReady: true,
  //             isLoading: false,
  //             isSpecialties: isSp,
  //           });
  //         },
  //       );
  //     }
  //   }

  searchCondBuilder(isMatchKeyword, keyword, filterVals) {
    let extFilter = filterVals;
    console.log('extFilter');
    console.log(extFilter);
    console.log('extFilter');

    const keywordFields =
      isMatchKeyword || extFilter.location !== null ? ['country', 'city'] : [];
    const keywordVal =
      extFilter.location !== null ? extFilter.location : keyword;

    const keywordFilter = [];

    if (extFilter.everPlus == 'yes') {
      keywordFilter.push({ evergoplusclinic: extFilter.everPlus });
    }
    if (extFilter.apt == 'yes') {
      keywordFilter.push({ closeToPublicTransport: extFilter.apt });
    }
    if (extFilter.cityCenter == 'yes') {
      keywordFilter.push({ clinicCloseToCity: extFilter.cityCenter });
    }

    if (extFilter.priceLevel) {
      const size = extFilter.priceLevel[1] - extFilter.priceLevel[0] + 1;
      const priceLevelForSearch = [...Array(size).keys()].map(
        i => i + Number(extFilter.priceLevel[0]),
      );

      keywordFilter.push({
        or: priceLevelForSearch.map(lv => ({
          priceLevel: '$'.repeat(lv),
        })),
      });
    }

    if (extFilter.accreditationLevel) {
      keywordFilter.push({
        or: extFilter.accreditationLevel.map(lv => ({
          accreditationLevelSearch: lv,
        })),
      });
    }

    if (extFilter.languages) {
      keywordFilter.push({
        languages: {
          regexp: `/(?=.*${extFilter.languages.join(')(?=.*')})/`,
        },
      });
    }

    if (extFilter.tag && extFilter.tag !== null) {
      keywordFilter.push({
        tagSearch: {
          regexp: `/(?="${extFilter.tag.toLocaleLowerCase()}")(?=.*)/`,
        },
      });
    }

    // create includeFilters
    const relProcedure =
      isMatchKeyword || !keyword
        ? { relationName: 'Procedures' }
        : { relationName: 'Procedures', keyword, keywordFields: ['name'] };

    // const relTest =
    // isMatchKeyword || !keyword
    //   ? { relationName: 'ClinicPackages' }
    //   : { relationName: 'ClinicPackages', keyword, keywordFields: ['procedureLink'] };

    const includeFilters = [relProcedure];
    const relationNames = ['Procedures'];
    const checkRelationSize = [];

    const relClinicReviews = { relationName: 'ClinicReviews' };
    const relClinicpackages = { relationName: 'ClinicPackages' };

    includeFilters.push(relClinicReviews);
    includeFilters.push(relClinicpackages);

    relationNames.push('ClinicReviews');
    relationNames.push('ClinicPackages');

    // create skipFilters
    const finalFilter = 5;
    const skipFilters = [finalFilter];

    // if (extFilter.accreditations) {
    //   let relAccreditation = {
    //     relationName: 'Accreditations',
    //     filters: [
    //       {
    //         or: extFilter.accreditations.map(accreditation => ({
    //           code: accreditation,
    //         })),
    //       },
    //     ],
    //   };
    //   includeFilters.push(relAccreditation);
    //   relationNames.push('Accreditations');
    //   checkRelationSize.push('Accreditation');
    // }

    if (extFilter.facilities) {
      const relAmenity = {
        relationName: 'Amenities',
        filters: [
          {
            or: extFilter.facilities.map(amenity => ({
              name: amenity,
            })),
          },
        ],
      };
      includeFilters.push(relAmenity);
      relationNames.push('Amenities');
      checkRelationSize.push('Amenity');
    }

    return {
      keyword: keywordVal,
      keywordFields,
      filters: keywordFilter,
      skipAmount: 0,
      includeFilters,
      relationNames,
      checkRelationSize,
    };
  }

  async querySimlier() {
    try {
      const result = await SpecialListClinicAPI.find();
      // this.setState({ data: result, isLoading: false });
      this.setState({ result, isLoading: false });
    } catch (error) {
      this.setState({ error, isLoading: true });
    }
  }

  async findCountry(val) {
    console.log(val);
    const condObj = { where: { name: { ilike: `${val}%` } }, limit: 1 };
    const jCond = JSON.stringify(condObj);
    const wCond = encodeURI(jCond);

    console.log(condObj);
    try {
      return CountryAPI.findWhere({ query: wCond }).then(res =>
        res && res.length > 0 ? { res: res[0] } : {},
      );
    } catch (error) {
      return { err: error };
    }
  }

  async findCity(val) {
    const condObj = { where: { name: { ilike: `${val}%` } }, limit: 1 };
    const jCond = JSON.stringify(condObj);
    const wCond = encodeURI(jCond);
    try {
      return CityAPI.findWhere({ query: wCond }).then(res =>
        res && res.length > 0 ? { res: res[0] } : {},
      );
    } catch (error) {
      return { err: error };
    }
  }

  async fetchProcedureList() {
    const query = this.state.queryValue;
    const queryCapitalized =
      query && query.charAt(0).toUpperCase() + query.slice(1);

    const getProceduresUrl = encodeURI(
      `${config.apiUrl}procedurelists?filter={"where":{"name":{"ilike": "${queryCapitalized}%"}}}`,
    );
    fetch(getProceduresUrl)
      .then(response => response.json())
      .then(data =>
        this.setState({
          procedureQuery: data,
          isLoadingProcedure: false,
        }),
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  async handleCheckedEverPlus() {
    const queryLocation = { evergoplus: 'yes' };
    // const searchString = queryString.stringify(queryLocation);
    let changed = false;
    let query = '';
    if (!this.state.baconIsReady) {
      changed = true;
    } else {
      // query = this.props.location.search;
      changed = false;
    }
    const queryValue = this.state.queryValue;
    const extFilter = {
      ...this.state.extFilter,
      everPlus: 'yes',
    };
    const oSearchCond = this.searchCondBuilder(false, queryValue, extFilter);
    const oCond = filterBuilder(oSearchCond);

    const res = await ClinicAPI.filterwhere(oCond);
    this.setState({
      baconIsReady: changed,
      extFilter,
      clinics: res,
      storeClinics: null,
      isLoading: true, // isLoading has change at componentDidUpdate
    });
    //   setTimeout(()=> { //Start the timer
    //     this.setState({
    //       baconIsReady: changed,
    //       extFilter,
    //       clinics: res,
    //       storeClinics: null,
    //       isLoading: false,
    //     }); //After 1 second, set render to true
    // }, 1000)
  }

  execSearchFunct(e) {
    // this.setState({ SearchKeyword: e.target.value });
    // this.fetchClinics(e.target.value);
  }

  onChangeLangauge = async values => {
    const { queryValue } = this.state;
    const searchObj = queryString.parse(window.location.search, {
      arrayFormat: 'comma',
      sort: false,
    });
    const queryObj = { ...searchObj, languages: values };
    const extFilter = { ...this.state.extFilter, languages: values };
    if (values.length == 0) {
      delete queryObj.languages;
      delete extFilter.languages;
    }

    const query = `all?${queryString.stringify(queryObj, {
      arrayFormat: 'comma',
      sort: false,
    })}`;

    const oSearchCond = this.searchCondBuilder(false, queryValue, extFilter);
    const oCond = filterBuilder(oSearchCond);
    // this.setState({isLoading:true});
    const res = await ClinicAPI.filterwhere(oCond);
    window.history.pushState(null, '', query);
    this.setState({
      extFilter,
      clinics: res,
      storeClinics: null,
      isLoading: true, // isLoading has change at componentDidUpdate
    });
  };

  onChangeFilterByAccreditation = async values => {
    const { queryValue } = this.state;
    const searchObj = queryString.parse(window.location.search, {
      arrayFormat: 'comma',
      sort: false,
    });
    const queryObj = { ...searchObj, accreditationlevel: values };
    const extFilter = { ...this.state.extFilter, accreditationLevel: values };
    if (values.length == 0) {
      delete queryObj.accreditationLevel;
      delete extFilter.accreditationLevel;
    }

    const query = `all?${queryString.stringify(queryObj, {
      arrayFormat: 'comma',
      sort: false,
    })}`;

    const oSearchCond = this.searchCondBuilder(false, queryValue, extFilter);
    const oCond = filterBuilder(oSearchCond);
    // this.setState({isLoading:true});
    const res = await ClinicAPI.filterwhere(oCond);
    window.history.pushState(null, '', query);
    this.setState({
      extFilter,
      clinics: res,
      storeClinics: null,
      isLoading: false,
      isLoading: true, // isLoading has change at componentDidUpdate
    });
  };

  onChangeFacility = async values => {
    const { queryValue } = this.state;
    const searchObj = queryString.parse(window.location.search, {
      arrayFormat: 'comma',
      sort: false,
    });
    const queryObj = { ...searchObj, facilities: values };
    const extFilter = { ...this.state.extFilter, facilities: values };
    if (values.length == 0) {
      delete queryObj.facilities;
      delete extFilter.facilities;
    }

    const query = `all?${queryString.stringify(queryObj, {
      arrayFormat: 'comma',
      sort: false,
    })}`;

    const oSearchCond = this.searchCondBuilder(false, queryValue, extFilter);
    const oCond = filterBuilder(oSearchCond);
    // this.setState({isLoading:true});
    const res = await ClinicAPI.filterwhere(oCond);

    window.history.pushState(null, '', query);
    this.setState({
      extFilter,
      clinics: res,
      storeClinics: null,
      isLoading: false,
      isLoading: true, // isLoading has change at componentDidUpdate
    });
  };

  onPriceLevel = async values => {
    const { queryValue, extFilter } = this.state;
    const searchObj = queryString.parse(window.location.search, {
      arrayFormat: 'comma',
      sort: false,
    });
    const queryObj = { ...searchObj, priceLevel: values };
    extFilter.priceLevel = values;
    if (values.length === 0) {
      delete queryObj.priceLevel;
      delete extFilter.priceLevel;
    }

    const query = `all?${queryString.stringify(queryObj, {
      arrayFormat: 'comma',
      sort: false,
    })}`;

    const oSearchCond = this.searchCondBuilder(false, queryValue, extFilter);
    const oCond = filterBuilder(oSearchCond);
    this.setState({ isLoading: true });
    const res = await ClinicAPI.filterwhere(oCond);
    window.history.pushState(null, '', query);
    this.setState({
      extFilter,
      clinics: res,
      storeClinics: null,
      isLoading: false,
    });
  };
  //   componentDidMount(){
  //     this.fetchClinics();
  //   }

  //   async fetchClinics() {
  //       console.log("working");
  //       console.log(config.apiUrl);

  //     const filterevergonor = `https://30fde358b3.ever.healthcare/api/Clinics?filter[limit]=8`;
  //     fetch(filterevergonor)
  //       .then(response => response.json())
  //       .then(data =>
  //         this.setState({
  //             normalClinics: data,
  //             isLoading: false,
  //         },() => {
  //             console.log(this.state.normalClinics);
  //         }),
  //       )
  //       .catch(error => console.log(error));
  //       console.log(filterevergonor);
  //   }

  renderFeaturedClinic() {
    const { navigation } = this.props;

    return this.state.featuredClinics.map((clinic, i) => {
      return (
        <TouchableOpacity
          key={i}
          // style={{ alignItems: "center" }}
          activeOpacity={0.9}
          onPress={() => navigation.navigate(clinic.route)}
          style={styles.featuredClinic}
        >
          <View
            style={{
              flexWrap: 'wrap',
            }}
          >
            <View
              style={{
                paddingBottom: 20,
              }}
            >
              <Image
                source={clinic.icon}
                // size={34}
                // color={BaseColor.primaryColor}
                // solid
                style={{ width: 60, height: 60 }}
              />
            </View>

            <Text
              caption1
              grayColor
              style={{
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {clinic.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  onSelectFacilities(select) {
    this.setState({
      facilities: this.state.facilities.map(item => {
        if (item.name == select.name) {
          return {
            ...item,
            checked: true,
          };
        } else {
          return {
            ...item,
            checked: false,
          };
        }
      }),
    });
  }

  onScrollFiring = event => {
    console.log('working');
    console.log('event' + event);
    console.log(event);
    const scrollHeight = event._value;
    // if(scrollHeight > 132){
    //     this.setState({filterVisible: true});
    // }
    // if(scrollHeight < 132){
    //     this.setState({filterVisible: false});

    // }
    if (this.state.tabType == 'Package') {
    }
    if (this.state.tabType == 'Clinic') {
    }
  };

  getClinicPackage = () => {
    if (this.state.clinicPackages == []) {
    }
  };

  onScroll = () => {
    console.log('onScroll Firing');
    const { loadMore } = this.state;

    if (loadMore) {
      return;
    }

    console.log('load after');

    this.setState({ loadMore: true });
    /*loading - set loadMore = false when done*/
    // const newSkipTotal = this.state.skipTotal + 9;
    // this.setState({skipTotal: newSkipTotal});
    this.setState({ isFetching: true });

    // THIS IS FOR LOADING NEW DATA

    const { dispatch } = this.props;
    const { searchKey } = '';
    // const { searchKey } = this.props.navigation.state.params;

    // console.log(searchKey);
    console.log('searchKey');
    // this.setState({clinics: [{name: "Healthy Skin Clinic", address: "52 Phangnga Road Phuket Town, Phuket 83000 Dental Crown"}]})
    if (searchKey == '') {
      console.log('no searchKey');
      // this.props.history.replace('/s/all?search_type=UNKNOWN');
      return null;
    }
    // const pQ = queryString.parse(this.props.location.search);
    const pQ = this.state.queryValue;
    const limit = 4;
    const skipAmount = 0;
    const queryTagSearch = this.state.queryTagSearch;
    console.log(pQ);
    const { exceptkeyword } = this.state;
    this.fetchProcedureList();
    // this.querySimlier();
    Promise.all([this.findCountry(pQ), this.findCity(pQ)]).then(
      async resval => {
        const countryRes = resval.length >= 1 ? resval[0] : null;
        const cityRes = resval.length == 2 ? resval[1] : null;
        const isCountry = !!(!!countryRes.res || !!cityRes.res);
        const country = isCountry ? countryRes.res || cityRes.res : '';
        const oSearchCond = this.searchCondBuilder(
          isCountry,
          pQ,
          this.state.extFilter,
          limit,
        );
        // const { keyword: sKeyword, keywordFields, filters, includeFilters } = oSearchCond;
        // const oCond = filterBuilder(sKeyword, keywordFields, filters, includeFilters);

        if (this.state.activeTab == 'clinicPackages') {
          console.log('clinicpackage firing');
          console.log(this.state.clinicPackageSkipAmount);

          const oCond = filterBuilder({
            ...oSearchCond,
            limit: this.state.selectedLimitAmount,
            skipAmount: this.state.clinicPackageSkipAmount,
          });
          console.log(oCond);

          const resClinicPackage = await ClinicPackagesAPI.filterwhere({
            ...oCond,
            queryProcedure: pQ,
            querySpecialities: pQ,
            clinicPackageTagSearch: this.state.queryTagSearch,
          });

          this.setState({
            clinicPackage:
              !!resClinicPackage &&
              resClinicPackage.length > 0 &&
              this.state.clinicPackage[0].id !== resClinicPackage[0].id
                ? this.state.clinicPackage.concat(...resClinicPackage)
                : this.state.clinicPackage,
            storeClinics: null,
            isReady: true,
            loadMore: false,
            clinicPackageSkipAmount:
              this.state.clinicPackageSkipAmount +
              this.state.selectedSkipAmount,
          });
        }

        if (this.state.activeTab == 'clinic') {
          console.log('clinicSkipAmount');

          console.log(this.state.clinicSkipAmount);

          const oCond = filterBuilder({
            ...oSearchCond,
            limit: this.state.selectedLimitAmount,
            skipAmount: this.state.clinicSkipAmount,
          });
          console.log(oCond);
          console.log('oCond');

          const res = await ClinicAPI.filterwhere({ ...oCond });
          const isKeyword = exceptkeyword || !!pQ;
          let spRes = [];
          if (!isCountry && (!res || res.length == 0)) {
            const pFilter = { filter: { where: { name: pQ } } };
            const pRes = await ProcedureListAPI.find(pFilter);
            const spName =
              !!pRes && pRes.length > 0 ? pRes[0].specialist : null;
            const nExtFilter = { ...this.state.extFilter, tag: spName };
            const oSpSearchCond = this.searchCondBuilder(
              isCountry,
              null,
              nExtFilter,
            );
            const spCond = filterBuilder(oSpSearchCond);
            console.log(spCond);
            spRes = await ClinicAPI.filterwhere(spCond);
          }
          const isSp = spRes.length > 0 ? true : false;

          this.setState({
            isKeyword,
            isCountry,
            country: [country],
            clinics:
              !!res && res.length > 0
                ? this.state.clinics.concat(...res)
                : spRes,
            storeClinics: null,
            isReady: true,
            isSpecialties: isSp,
            loadMore: false,
            clinicSkipAmount:
              this.state.clinicSkipAmount + this.state.selectedSkipAmount,
          });
        }

        if (this.state.activeTab == 'doctor') {
          console.log('doctor firing');

          const oCond = filterBuilder({
            ...oSearchCond,
            limit: this.state.selectedLimitAmount,
            skipAmount: this.state.doctorSkipAmount,
          });
          console.log(oCond);

          const res = await DoctorsAPI.filterwhere({
            ...oCond,
            queryValue: pQ,
            // subSpecialities: queryTagSearch && queryTagSearch.length > 0 ? queryTagSearch : [],
            // doctorTagSearch: queryTagSearch && queryTagSearch.length > 0 ? queryTagSearch : [],
            // langaugeSearch: queryTagSearch && queryTagSearch.length > 0 ? queryTagSearch : [],
            subSpecialities: [],
            doctorTagSearch: [],
            langaugeSearch: [],
          });

          console.log('doctor res');

          console.log(res);
          console.log('doctor res');

          this.setState({
            doctor:
              !!res && res.length > 0
                ? this.state.doctor.concat(...res)
                : spRes,
            storeClinics: null,
            isReady: true,
            loadMore: false,
            doctorSkipAmount:
              this.state.doctorSkipAmount + this.state.selectedSkipAmount,
          });
        }
        if (this.state.activeTab == 'diary') {
          const res = await ClinicAPI.filterwhere({ ...oCond, pQ, pQ, pQ, pQ });
        }

        // const isKeyword = !!res && res.length > 0 ? true : false;
        // const isKeyword = !!pQ;

        this.setState({
          // // isKeyword,
          // isCountry,
          // country: [country],
          // // clinics: !!res && res.length > 0 ? this.state.clinics.concat(...res) : spRes,
          // // clinicPackage: !!resClinicPackage && resClinicPackage.length > 0 ? this.state.clinicPackage.concat(...resClinicPackage) : spRes,
          // storeClinics: null,
          // isReady: true,
          // isSpecialties: isSp,
          // loadMore: false,
        });
      },
    );

    console.log('test work');
  };

  onSelectNewTab = () => {
    console.log('onScroll Firing newtab');
    console.log('Before load more');

    const { navigation } = this.props;
    const { loadMore } = this.state;
    if (loadMore) {
      return;
    }

    console.log('After load more');

    this.setState({ loadMore: true });
    /*loading - set loadMore = false when done*/
    const newSkipTotal = this.state.skipTotal + 9;
    this.setState({ skipTotal: newSkipTotal });
    this.setState({ isFetching: true });

    // THIS IS FOR LOADING NEW DATA

    const { dispatch } = this.props;
    const { searchKey } = '';
    // const { searchKey } = this.props.navigation.state.params;

    // console.log(searchKey);
    console.log('searchKey');
    // this.setState({clinics: [{name: "Healthy Skin Clinic", address: "52 Phangnga Road Phuket Town, Phuket 83000 Dental Crown"}]})
    if (searchKey == '') {
      console.log('no searchKey');
      // this.props.history.replace('/s/all?search_type=UNKNOWN');
      return null;
    }
    // const pQ = queryString.parse(this.props.location.search);
    const pQ = this.state.queryValue;
    const limit = 4;
    const skipAmount = 0;
    console.log(pQ);
    const { exceptkeyword } = this.state;
    this.fetchProcedureList();
    // this.querySimlier();
    Promise.all([this.findCountry(pQ), this.findCity(pQ)]).then(
      async resval => {
        const queryTagSearch = this.state.queryTagSearch;
        const countryRes = resval.length >= 1 ? resval[0] : null;
        const cityRes = resval.length == 2 ? resval[1] : null;
        const isCountry = !!(!!countryRes.res || !!cityRes.res);
        const country = isCountry ? countryRes.res || cityRes.res : '';
        const oSearchCond = this.searchCondBuilder(
          isCountry,
          pQ,
          this.state.extFilter,
          limit,
        );
        // const { keyword: sKeyword, keywordFields, filters, includeFilters } = oSearchCond;
        // const oCond = filterBuilder(sKeyword, keywordFields, filters, includeFilters);

        if (this.state.activeTab == 'clinicPackages') {
          // console.log("clinicpackage firing");
          // const oCond = filterBuilder({...oSearchCond, limit : this.state.selectedLimitAmount, skipAmount: this.state.clinicPackageSkipAmount});
          // console.log(oCond);

          // const resClinicPackage = await ClinicPackagesAPI.filterwhere({
          //   ...oCond,
          //   queryProcedure: pQ,
          //   querySpecialities: pQ,
          //   clinicPackageTagSearch: this.state.queryTagSearch});

          this.setState({
            // clinicPackage: !!resClinicPackage && resClinicPackage.length > 0 ? this.state.clinicPackage.concat(...resClinicPackage) : resClinicPackage,
            // storeClinics: null,
            isReady: true,
            loadMore: false,
            // clinicPackageSkipAmount: this.state.clinicPackageSkipAmount + this.state.selectedLimitAmount
          });
        }
        if (this.state.activeTab == 'clinic') {
          if (this.state.clinicIsAlreadyLoaded) {
            this.setState({
              isReady: true,
              loadMore: false,
            });
          }
          const oCond = filterBuilder({
            ...oSearchCond,
            limit: this.state.selectedLimitAmount,
            skipAmount: this.state.clinicSkipAmount,
          });
          console.log(oCond);

          const res = await ClinicAPI.filterwhere(oCond);
          const isKeyword = exceptkeyword || !!pQ;
          let spRes = [];
          if (!isCountry && (!res || res.length == 0)) {
            const pFilter = { filter: { where: { name: pQ } } };
            const pRes = await ProcedureListAPI.find(pFilter);
            const spName =
              !!pRes && pRes.length > 0 ? pRes[0].specialist : null;
            const nExtFilter = { ...this.state.extFilter, tag: spName };
            const oSpSearchCond = this.searchCondBuilder(
              isCountry,
              null,
              nExtFilter,
            );
            const spCond = filterBuilder(oSpSearchCond);
            console.log(spCond);
            spRes = await ClinicAPI.filterwhere(spCond);
          }
          const isSp = spRes.length > 0 ? true : false;

          this.setState({
            isKeyword,
            isCountry,
            country: [country],
            clinics:
              !!res && res.length > 0
                ? this.state.clinics.concat(...res)
                : spRes,
            storeClinics: null,
            isReady: true,
            isSpecialties: isSp,
            loadMore: false,
            clinicIsAlreadyLoaded: true,
            clinicSkipAmount: this.state.selectedLimitAmount,
          });
        }

        if (this.state.activeTab == 'doctor') {
          console.log('doctor firing');
          if (this.state.doctorIsAlreadyLoaded) {
            this.setState({
              isReady: true,
              loadMore: false,
            });
          }
          console.log('doctor firing2');
          console.log(queryTagSearch);
          console.log(oSearchCond);
          const oCond = filterBuilder({
            ...oSearchCond,
            limit: this.state.selectedLimitAmount,
            skipAmount: this.state.doctorSkipAmount,
          });
          console.log('doctor firing3');

          console.log(oCond);
          console.log(queryTagSearch);

          const res = await DoctorsAPI.filterwhere({
            ...oCond,
            queryValue: 'Dental Crown',
            subSpecialities: ['Dermatology'],
            doctorTagSearch: ['Test'],
            langaugeSearch: ['Eng'],
          });
          // subSpecialities: queryTagSearch && queryTagSearch.length > 0 ? [queryTagSearch] : [''],
          // doctorTagSearch: queryTagSearch && queryTagSearch.length > 0 ? [queryTagSearch] : [''],
          // langaugeSearch: queryTagSearch && queryTagSearch.length > 0 ? [queryTagSearch] : [''],
          // doctorSkipAmount: this.state.doctorSkipAmount + this.state.selectedLimitAmount

          console.log('doctor res');

          console.log(res);
          console.log('doctor res');

          this.setState({
            doctor:
              !!res && res.length > 0
                ? this.state.doctor.concat(...res)
                : this.state.doctor,
            storeClinics: null,
            isReady: true,
            loadMore: false,
            doctorIsAlreadyLoaded: true,
            doctorSkipAmount: this.state.selectedLimitAmount,
          });
        }

        if (this.state.activeTab == 'diary') {
          const res = await ClinicAPI.filterwhere({ ...oCond, pQ, pQ, pQ, pQ });
        }

        // const isKeyword = !!res && res.length > 0 ? true : false;
        // const isKeyword = !!pQ;

        this.setState({
          // // isKeyword,
          // isCountry,
          // country: [country],
          // // clinics: !!res && res.length > 0 ? this.state.clinics.concat(...res) : spRes,
          // // clinicPackage: !!resClinicPackage && resClinicPackage.length > 0 ? this.state.clinicPackage.concat(...resClinicPackage) : spRes,
          // storeClinics: null,
          // isReady: true,
          // isSpecialties: isSp,
          loadMore: false,
        });
      },
    );

    console.log('test work');
  };

  onSelectFilter() {
    console.log('onSelectFilt');

    this.setState({ visible: true });
  }

  onSelectFiltering(filterName) {
    console.log(filterName);
    this.setState({ filterName: true });
  }

  onChangeTab = (tabSelected, tabId) => {
    console.log('tabSelected');

    console.log(tabId);
    console.log(tabSelected);

    console.log('tabSelected');

    this.setState({
      activeTab: tabSelected,
      activePage: tabId,
    });

    this.onSelectNewTab();
  };

  handleTabChangeParent = val => {
    console.log('handle change tab parent');
    console.log(val);
    console.log('handle change tab parent');

    // if (index.i == 0) {this.props.changeTab(index);}
    // if (index.i == 1) {console.log("working"); this.props.changeTab(index);}
    // if (index.i == 2) this.props.changeTab(index);
    // if (index.i == 3) this.props.changeTab(index);

    if (val == 0) this.child.onChangeTabChild(val);
    if (val == 1) this.child.onChangeTabChild(val);
    if (val == 2) this.child.onChangeTabChild(val);
    if (val == 3) this.child.onChangeTabChild(val);
  };

  renderIconService() {
    const { navigation } = this.props;

    return this.state.icons.map((icon, i) => {
      return (
        <TouchableOpacity
          key={i}
          // style={{ alignItems: "center" }}
          activeOpacity={0.9}
          onPress={() => navigation.navigate(icon.route)}
          style={styles.iconParent}
        >
          <View>
            <Image
              source={icon.icon}
              // size={34}
              // color={BaseColor.primaryColor}
              // solid
              style={{ width: 50, height: 50 }}
            />
          </View>
          <Text caption1 grayColor>
            {icon.name}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  renderTab = (
    name,
    page,
    isTabActive,
    onPressHandler,
    onLayoutHandler,
    index,
  ) => {
    return (
      <TouchableHighlight
        key={`${name}_${page}`}
        onPress={() => this.handleTabChangeParent(page)}
        onLayout={onLayoutHandler}
        style={{ zIndex: 10, justifyContent: 'center', alignItems: 'center' }}
        // underlayColor="#aaaaaa"
      >
        <Text style={{ fontWeight: '500' }}>{name}</Text>
      </TouchableHighlight>
      // && isTabActive ? <View style={{backgroundColor:}}></View> : <View></View>
    );
  };

  disableScrollViewScroll = () => {
    this.setState({ enableScrollViewScroll: false });
  };

  enableScrollViewScroll = () => {
    this.setState({ enableScrollViewScroll: true });
  };
  render() {
    const {
      filterVisible,
      search,
      promotion,
      packages,
      clinics,
      clinicPackage,
      doctor,
      heightHeader,
      normalClinics,
      relate,
      loading,
      isFetching,
      skipTotal,
    } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(140);
    const marginTopBanner = heightImageBanner - heightHeader;

    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }) => {
      const paddingToBottom = 20;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };

    //   var x = clinics.map((val) => {
    //     return val.ClinicPackage;
    //   }).reduce((pre, cur) => {
    //      return pre.concat(cur);
    //   }).map((e,i) => {
    //     return {label:e.name,value:e.itemId};
    //   });

    //   let output =
    //   clinics.map(cards =>
    //     cards.reduce(({values, ClinicPackage}) => ({
    //       values: [...ClinicPackage, value],
    //       suits: [...suits, suit]
    //     }), {values: [], suits: []}))

    // console.log(output)

    const FirstRoute = () => (
      <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
    );
    
    const SecondRoute = () => (
      <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
    );
    
    console.log('clinic Data');
    console.log(this.state.clinics);
    console.log('----------------');

    console.log('Doctor Data');
    console.log(this.state.doctors);

    console.log(this._deltaY._value);

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView
          style={{ flex: 1 }}
          // forceInset={{ top: "always" }}
        >
          {/* 
<Animated.View
            style={{ zIndex: 1, backgroundColor: 'white', opacity: this._deltaY.interpolate({
                inputRange: [
                    0,
                    132,
                    200
                ],
                outputRange: [
                    0,
                    0,
                    100
                ]
            })}}>
   
            </Animated.View> */}
          <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
            />
          {/* <ScrollableTabComponent
            style={{ flex: 1 }}
            disableScrollViewScroll={this.disableScrollViewScroll}
            enableScrollViewScrollFunction={this.enableScrollViewScroll}
            enableScrollViewScroll={this.state.enableScrollViewScroll}
            myScroll={this._deltaY}
            clinicPackage={this.state.clinicPackage}
            clinics={this.state.clinics}
            clinicData={clinics}
            navigation={this.props.navigation}
            doctors={this.state.doctors}
            scrollable={false}
            changeTabTrigger={this.onChangeTab}
            ref={cd => (this.child = cd)}
          /> */}
          {/* 
                                                <View
                style={{ backgroundColor: '#f7f7f7', paddingHorizontal: 5, paddingTop: 10 }}
                /> */}

          <View style={{ marginHorizontal: 10, paddingBottom: 0 }}>
            {this.state.loadMore && (
              <View style={styles.blueBox}>
                <DotIndicator color="#2DCFA1" />
                {/* 
          <CirclesLoader
          color={'#2DCFA1'}
          /> */}
              </View>
            )}
          </View>

          <Modal.BottomModal
            visible={this.state.visible}
            onTouchOutside={() => this.setState({ visible: false })}
            height={0.9}
            width={1}
            onSwipeOut={() => this.setState({ visible: false })}
            modalTitle={<ModalTitle title="Bottom Modal" hasTitleBar />}
          >
            <ModalContent
              style={{
                flex: 1,
                backgroundColor: 'fff',
              }}
            >
              <View style={{ marginHorizontal: 10, marginTop: 30 }}>
                <Text>Popular Filters</Text>
                <Text>
                  These are some of the filters people traveling to Mexico use
                  most often
                </Text>

                <View style={styles.contentQuest}>
                  <View style={styles.lineRow}>
                    <View>
                      <Text body1>Adults</Text>
                      <Text grayColor>16+ years</Text>
                    </View>
                    <View style={styles.iconRight}>
                      <TouchableOpacity onPress={() => {}}>
                        <Icon
                          name="minus-circle"
                          size={24}
                          color={BaseColor.grayColor}
                        />
                      </TouchableOpacity>
                      <Text>Ever Plus</Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.handleCheckedEverPlus();
                        }}
                      >
                        <Icon
                          name="plus-circle"
                          size={24}
                          color={BaseColor.primaryColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.lineRow}>
                    <View>
                      <Text>Childrens</Text>
                      <Text caption1 grayColor>
                        2 - 11 years
                      </Text>
                    </View>

                    <View style={styles.iconRight}>
                      <SwitchToggle
                        containerStyle={{
                          marginTop: 16,
                          width: 30,
                          height: 15,
                          borderRadius: 30,
                          padding: 5,
                        }}
                        backgroundColorOn="#a0e1e5"
                        backgroundColorOff="#e5e1e0"
                        circleStyle={{
                          width: 15,
                          height: 15,
                          borderRadius: 27.5,
                          backgroundColor: 'blue', // rgb(102,134,205)
                        }}
                        // switchOn={switchOn3}
                        // onPress={() => setSwitchOn3(!switchOn3)}
                        circleColorOff="#ff11ff"
                        circleColorOn="green"
                        duration={500}
                      />
                      <TouchableOpacity onPress={() => {}}>
                        <Icon
                          name="minus-circle"
                          size={24}
                          color={BaseColor.grayColor}
                        />
                      </TouchableOpacity>
                      <Text>Test</Text>
                      <TouchableOpacity onPress={() => {}}>
                        <Icon
                          name="plus-circle"
                          size={24}
                          color={BaseColor.primaryColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Text>eiei</Text>
                <RangeSlider
                  style={{ width: 160, height: 80 }}
                  gravity={'center'}
                  min={200}
                  max={1000}
                  step={20}
                  selectionColor="#3df"
                  blankColor="#f618"
                  onValueChanged={(low, high, fromUser) => {
                    this.setState({ rangeLow: low, rangeHigh: high });
                  }}
                />
              </View>
            </ModalContent>
          </Modal.BottomModal>
        </SafeAreaView>
      </View>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//     ItemFilterScreen: makeSelectItemFilterScreen(),
//   });

//   function mapDispatchToProps(dispatch) {
//     return {
//       dispatch,
//     };
//   }

//   const withConnect = connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   );

// //   const withReducer = injectReducer({ key: 'itemFilterScreen', reducer });
// //   const withSaga = injectSaga({ key: 'itemFilterScreen', saga });

//   export default compose(
//     withConnect,
//   )(ItemFilterScreen);
