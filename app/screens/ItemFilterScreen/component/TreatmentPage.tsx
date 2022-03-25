
import React from 'react';
import {
  Image,
  Dimensions,
  StyleSheet,
  SectionList,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  PanResponder,
  Animated
} from 'react-native';
import { HSectionList } from 'react-native-head-tab-view'

import * as Utils from '@utils';

import staticData from '../config/staticData'
import axios from 'axios';
import config from '@_config';
// import { FadeInUp, useSharedValue, useAnimatedStyle, useDerivedValue, interpolate, Extrapolate } from 'react-native-reanimated';
import CheckBox from "app/elements/CheckBox";
import { filterBuilder } from '../services/queryService';
import { useNavigation } from '@react-navigation/native';

import { getClinicPackage } from '@services/clinicPackageService';

// import {
//     ShareElement,
//     SharedElementTransition,
//     nodeFromRef
//   } from 'react-native-shared-element';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Modal from 'react-native-modal';
// import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler'
const G_WIN_WIDTH = Dimensions.get('window').width
const G_WIN_HEIGHT = Dimensions.get('window').height
interface Props {
  index: number
  refreshEnabled?: boolean
  timecount?: number
  tabLabel?: string
}

const defaultProps = {
  refreshEnabled: false,
  timecount: 2000,
  numColumns: 2
}

interface State {
  isRefreshing: boolean
  data?: Array<any>
}

export default class TreatmentPage extends React.PureComponent<Props & typeof defaultProps, State> {
  static defaultProps = defaultProps
  private mTimer?: NodeJS.Timeout
  mFlatlist: any;


  constructor(props: any) {
    super(props);
    this._deltaY = new Animated.Value(0);


    // this.handleInputLocationChange = this.handleInputLocationChange.bind(
    //   this,
    //   'Location',
    // );
    this.handleCheckedAccommodation = this.handleCheckedAccommodation.bind(
      this,
      'Accomodation',
    );
    this.handleCheckedPostcare = this.handleCheckedPostcare.bind(
      this,
      'Postcare',
    );
    this.handleCheckedTransportation = this.handleCheckedTransportation.bind(
      this,
      'Transportation',
    );

    const treatmentSelected = false;
    const showTreatment = false;
    const showClinic = false;
    const showDoctor = false;

    const baconIsReadyAccommodation = false;
    const baconIsReadyPostcare = false;
    const baconIsReadyTransportation = false;

    const baconIsReady = false;

    const exceptkeyword = false;
    const parsed = '';
    let queryValue = parsed.query || parsed.tag;
    const queryValueCountry = parsed.location;

    const extFilter = {
      everPlus: 'no',
      tpt: 'no',
      cityCenter: 'no',
      location: null,
      tag: null,
    };


    this.state = {
      modalVisible: false,

      isRefreshing: false,
      signOfRefresh: true,
      data: staticData.Page2Data,
      isCountry: false,
      isSpecialties: false,
      isProcedure: false,
      showWarning: true,
      valuetopsreach: '',
      isLoading: false,
      clinics: [],
      clinicsUnfilttered: [],
      countriesdetail: [],
      procedureName: [],
      Specialprocedure: [],
      value3: 10,
      baconIsReadyAccommodation,
      baconIsReadyPostcare,
      baconIsReadyTransportation,
      selectedOption: null,
      selectedOption1: null,
      shelters: [],
      selectedMarker: false,
      error: null,
      data: [],
      CountriesArr: [],
      searchKeyword: [],
      clinicAmounts: 0,
      pathSpecifications: 'rarefaction_paths',
      queryValue,
      queryValueCountry,
      isKeyword: false,
      procedures: '',
      city: '',
      country: [],
      countryName: '',
      querySearch: '',
      exceptkeyword,
      extFilter,
      isReady: false,
      selectedOptionLocation: null,
      procedureQuery: [],
      filteredPackage: [],
      isReadyFiltered: false,
      isLoadingFiltered: false,
      filterApplied: 0,
      heightHeader: Utils.heightHeader(),

    }
  }


  fetchTreatmentPackageFilter = async (filterVal) => {
    console.log('fetchTreatmentPackageFilter');
    // const parsed = queryString.parse(window.location.search);
    let queryValue = 'Knee Replacement';
    // const queryValueCountry = parsed.location;

    const pQ = queryValue;
    const location = '';
    console.log('queryValueCountry', location);

    let andFilter = [];

    if (filterVal === undefined || filterVal === null) {
      if (location === undefined || location === null) {
        andFilter = [
          { tagSearch: { ilike: '%' + pQ + '%' } },
        ];
      } else {
        andFilter = [
          { location: { ilike: '%' + location + '%' } },
          { tagSearch: { ilike: '%' + pQ + '%' } },
        ];
      }
    } else {
      console.log('filterVal yes')
      let filter = filterVal.filters;

      if (location === undefined || location === null) {
        andFilter = [
          { tagSearch: { ilike: '%' + pQ + '%' } },
          ...filter,
        ];
      } else {
        andFilter = [
          { location: { ilike: '%' + location + '%' } },
          { tagSearch: { ilike: '%' + pQ + '%' } },
          ...filter,
        ];
      }
    }

    const filter = { where: { and: andFilter } };
    console.log('finalfilter', filter);
    try {
      const clinicPackages = await getClinicPackage(filter)
      this.setState({
        filteredPackage: clinicPackages,
        isReadyFiltered: true,
        isLoadingFiltered: false,
      })
      this.forceUpdate()
    } catch (err) {
      console.log('error get clinic packages', err)
    }
  }




  fetchTreatmentPackage = async (filterVal) => {
    console.log('filterVal treatment page:>>', filterVal)
    console.log('searchReducer treatment page', this.props.searchReducer);

    let queryValue = this.props.searchReducer.selectedProcedure;
    console.log('queryValue treatment page', this.props.searchReducer.selectedProcedure);

    // const queryValueCountry = parsed.location;

    const pQ = queryValue;
    const location = this.props.searchReducer.selectedCountry;

    console.log('location treatment page', location);

    let andFilter = [];

    if (filterVal === undefined || filterVal === null) {
      console.log('filterVal null or undefined')
      if (location === undefined || location === null) {
        andFilter = [
          { tagSearch: { ilike: '%' + pQ + '%' } },
        ];
      } else {
        andFilter = [
          { location: { ilike: '%' + location + '%' } },
          { tagSearch: { ilike: '%' + pQ + '%' } },
        ];
      }
    } else {
      console.log('filterVal form treatment yes')
      let filter = filterVal.filters;

      if (location === undefined || location === null) {
        andFilter = [
          { tagSearch: { ilike: '%' + pQ + '%' } },
          ...filter,
        ];
      } else {
        andFilter = [
          { location: { ilike: '%' + location + '%' } },
          { tagSearch: { ilike: '%' + pQ + '%' } },
          ...filter,
        ];
      }
    }

    const filter = { where: { and: andFilter } };
    console.log('finalfilter', filter);
    try {
      const clinicPackages = await getClinicPackage(filter)
      this.setState({
        clinics: clinicPackages,
        clinicsUnfilttered: clinicPackages,
        isReady: true,
        isLoading: false,
      })
      this.forceUpdate()
    } catch (err) {
      console.log('error get clinic packages', err)
    }
  }


  async componentDidMount() {

    // if (this.props.location.search == '') {
    //    // this.props.history.replace('/s/all?search_type=UNKNOWN');
    //    return null;
    //  }
    // const pQ 
    const oSearchCond = this.searchCondBuilder(false, this.state.queryValue, this.state.extFilter);
    console.log('componentDidMountextFilter', this.state.extFilter, oSearchCond)
    this.fetchTreatmentPackage(oSearchCond);
    // this.setState({
    //   clinics: res,
    // });
  }

  // dispatch(getAmenities());
  // dispatch(getAccwhiteitations());


  async componentDidUpdate(prevProps, prevState) {
    const pQ = this.state.queryValue;
    const { exceptkeyword } = this.state;

  }

  searchCondBuilder(isMatchKeyword, keyword, filterVals) {
    const extFilter = filterVals;

    const keywordFilter = [];

    if (extFilter.acc == 'yes') {
      keywordFilter.push({ hotelIncluded: extFilter.acc });
    }
    if (extFilter.tpt == 'yes') {
      keywordFilter.push({ carIncluded: extFilter.tpt });
    }
    if (extFilter.pcare == 'yes') {
      keywordFilter.push({ postCareService: extFilter.pcare });
    }

    if (extFilter.priceLevel) {
      const size = extFilter.priceLevel[1] - extFilter.priceLevel[0] + 1;
      const priceLevelForSearch = [...Array(size).keys()].map(
        i => i + Number(extFilter.priceLevel[0]),
      );
    }

    if (extFilter.accwhiteitationLevel) {
      keywordFilter.push({
        or: extFilter.accwhiteitationLevel.map(lv => ({
          accwhiteitationLevelSearch: lv,
        })),
      });
    }


    let languagesFilter = extFilter.languages;
    if (languagesFilter) {
      languagesFilter.map(eachFilter => {
        keywordFilter.push({
          tagSearch: { ilike: '%' + eachFilter + '%' }
        });
      })
    }

    let durationsFilter = extFilter.tripDuration;
    if (durationsFilter) {
      durationsFilter.map(eachFilter => {
        keywordFilter.push({
          tagSearch: { ilike: '%' + eachFilter + '%' }
        });
      })
    }


    if (extFilter.tag && extFilter.tag !== null) {
      keywordFilter.push({
        tagSearch: {
          regexp: `/(?="${extFilter.tag.toLocaleLowerCase()}")(?=.*)/`,
        },
      });
    }

    return {
      filters: keywordFilter,
      // includeFilters,
      // relationNames,
      // checkRelationSize,
    };
  }


  async handleCheckedAccommodation() {
    const queryLocation = { acc: 'yes' };
    //  let changed = false;
    let query = '';
    let changed;

    let extFilter = {};
    if (!this.state.baconIsReadyAccommodation) {
      changed = true;
      extFilter = {
        ...this.state.extFilter,
        acc: 'yes',
      };
    } else {
      changed = false;
      extFilter = {
        ...this.state.extFilter,
        acc: 'no',
      };
    }

    const { queryValue } = this.state;
    console.log('extFilter', this.state.extFilter)


    const oSearchCond = this.searchCondBuilder(false, queryValue, extFilter);
    const oCond = filterBuilder(oSearchCond);
    console.log('extFilter', extFilter);


    this.fetchTreatmentPackageFilter(oSearchCond);

    this.setState({
      baconIsReadyAccommodation: changed,
      extFilter,
      storeClinics: null,
      isLoadingFiltered: true,
      filterApplied: this.state.filterApplied + 1,
      // isLoading has change at componentDidUpdate
    });
  }

  async handleCheckedPostcare() {
    const queryLocation = { acc: 'yes' };
    //  let changed = false;
    let query = '';
    let changed;

    let extFilter = {};
    if (!this.state.baconIsReadyPostcare) {
      changed = true;
      extFilter = {
        ...this.state.extFilter,
        pcare: 'yes',
      };
    } else {
      changed = false;
      extFilter = {
        ...this.state.extFilter,
        pcare: 'no',
      };
    }

    const { queryValue } = this.state;
    console.log('extFilter', this.state.extFilter)


    const oSearchCond = this.searchCondBuilder(false, queryValue, extFilter);
    const oCond = filterBuilder(oSearchCond);
    console.log('extFilter', extFilter);


    this.fetchTreatmentPackageFilter(oSearchCond);

    this.setState({
      baconIsReadyPostcare: changed,
      extFilter,
      storeClinics: null,
      isLoadingFiltered: true,
      filterApplied: this.state.filterApplied + 1,
      // isLoading has change at componentDidUpdate
    });
  }
  async handleCheckedTransportation() {
    const queryLocation = { acc: 'yes' };
    //  let changed = false;
    let query = '';
    let changed;

    let extFilter = {};
    if (!this.state.baconIsReadyTransportation) {
      changed = true;
      extFilter = {
        ...this.state.extFilter,
        tpt: 'yes',
      };
    } else {
      changed = false;
      extFilter = {
        ...this.state.extFilter,
        tpt: 'no',
      };
    }

    const { queryValue } = this.state;
    console.log('extFilter', this.state.extFilter)


    const oSearchCond = this.searchCondBuilder(false, queryValue, extFilter);
    const oCond = filterBuilder(oSearchCond);
    console.log('extFilter', extFilter);


    this.fetchTreatmentPackageFilter(oSearchCond);

    this.setState({
      baconIsReadyTransportation: changed,
      extFilter,
      storeClinics: null,
      isLoadingFiltered: true,
      filterApplied: this.state.filterApplied + 1,
      // isLoading has change at componentDidUpdate
    });
  }





  onStartRefresh = () => {
    this.setState({ isRefreshing: true })

    this.mTimer = setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, this.props.timecount);
  }




  renderItem = (itemInfo: { item: FlatListItemInfo, index: number }) => {
    const { item, index } = itemInfo
    console.log(item);

    return (
      <TouchableOpacity
      // onPress={() => {
      //   this.props.navigation.navigate('MainStack', {
      //     screen: 'ClinicPackageProfile',
      //     clinic: {
      //       ...item
      //     },
      //   });        }}
      >
        <View
          // entering={FadeInUp}
          style={styles.flatItem}>
          {item.Photo1 ? <Image style={{ width: '100%', height: 180, borderRadius: 5 }} source={{ uri: item.Photo1 }} /> : null}
          <View style={{ paddingHorizontal: 10, padding: 7, width: '100%', flexDirection: 'column', alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Icon
                key={`star5` + index}
                name="star"
                color={"#00bae5"}
                solid
                size={8}
                style={{ alignSelf: 'center' }}
              />
              <Text style={{ color: 'black', fontSize: 10 }}> 4.98</Text>
              <Text style={{ color: 'grey', fontSize: 10 }}> (120)</Text>
              <Text style={{ color: 'grey', fontSize: 10 }}> - Thailand</Text>
            </View>
            <Text style={{ marginVertical: 8 }}>{`${item.name}`}</Text>
            {/* <Text style={{ marginVertical: 2, fontSize: 10}}>{`${item.text}${index}`}</Text> */}
            {item.maxPrice !== item.discountedPrice && item.maxPrice !== 0 ?
              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  textDecorationLine: 'line-through', textDecorationStyle: 'solid',
                  marginVertical: 2, fontSize: 12, color: 'grey', fontWeight: 'bold'
                }}>{item.maxPrice}</Text>
                <Text style={{ marginVertical: 2, fontSize: 16, color: 'black', fontWeight: 'bold' }}>${item.discountedPrice}</Text>
              </View>
              :
              <View>
                <Text style={{ marginVertical: 2, fontSize: 16, color: 'black', fontWeight: 'bold' }}>${item.discountedPrice}</Text>
              </View>}
          </View>
        </View>
      </TouchableOpacity>

    )
  }

  _renderList = ({ section, index }) => {
    console.log(('section', section))

    if (index !== 0) return null;

    console.log('pass pass pass')

    console.log(('section', section))

    return (
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.container}
        data={section.data}
        renderItem={this.renderItem}
        style={{ paddingTop: 25 }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: this._deltaY },
            },
          },
        ])}
        onContentSizeChange={() =>
          this.setState({
            heightHeader: Utils.heightHeader(),
          })
        }
      />
    )
  }


  private renderSectionHeader = (sectionInfo: { section: any }) => {
    const { section } = sectionInfo;
    const { title } = section;
    return (
      <View style={[styles.sectionItem, { backgroundColor: '#EEE' }]}>
        <ScrollView
          nestedScrollEnabled={true}
          horizontal
          contentContainerStyle={{
            zIndex: 100,
            width: '100%', backgroundColor: 'white', paddingLeft: 15, paddingTop: 10, paddingBottom: 15
          }}
          showsHorizontalScrollIndicator={false}
          scrollable={true}
        >


          <TouchableOpacity style={styles.filterPills}
            onPress={() => this.openModal(true)}
          >
            <Text style={{ fontSize: 12 }}>
              Popular
            </Text>
            <Icon
              name="chevron-down"
              style={[styles.titleIcon, { color: '#000', marginLeft: 10 }]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPills}
            onPress={() => this.openModal(true)}
          >
            <Text style={{ fontSize: 12 }}>
              Languages
            </Text>
            <Icon
              name="chevron-down"
              style={[styles.titleIcon, { color: '#000', marginLeft: 10 }]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPills}
            onPress={() => this.openModal(true)}
          >
            <Text style={{ fontSize: 12 }}>
              Length of stay
            </Text>
            <Icon
              name="chevron-down"
              style={[styles.titleIcon, { color: '#000', marginLeft: 10 }]} />
          </TouchableOpacity>


        </ScrollView>

        {/* <Text style={styles.sectionTitle}>{title}</Text> */}
      </View>
    )
  }

  private getItemLayout = (data: any, index: number) => {
    return { length: 50, offset: index * 50, index };
  }

  private onStartRefresh = () => {
    this.setState({ isRefreshing: true })
    this.mTimer = setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, this.props.timecount);
  }

  openModal(open) {
    this.setState({
      modalVisible: open,
    });
  }

  //  makeScrollTrans = (scrollTrans: Animated.SharedValue<number>) => {
  //     // this.setState({scrollTrans: scrollTrans});
  //   };

  showPackage = () => {
    if (this.state.filterApplied >= 0) {
      this.setState({ clinics: this.state.filteredPackage })
      this.openModal(false)
    } else {

      this.setState({ clinics: this.state.clinicsUnfilttered })
      this.openModal(false)
    }
  }

  keyExtractor = (item: any, index: number) => index.toString()

  render() {


    const { data, clinics, modalVisible, filterApplied, filteredPackage, heightHeader } = this.state;

    let sectionlistData = [{ title: 'header', data: [...clinics] }];

    // const transYValue = useDerivedValue(() => {
    //   const moveDistance = -100;
    //   return interpolate(
    //     this.state.scrollTrans.value,
    //     [0, moveDistance],
    //     [0, 0],
    //     Extrapolate.CLAMP,
    //   );
    // });

    const props = this.props.refreshEnabled ? {
      isRefreshing: this.state.isRefreshing,
      onStartRefresh: this.onStartRefresh,
    } : {}

    const heightImageBanner = Utils.scaleWithPixel(60);
    const marginTopBanner = heightImageBanner - heightHeader;

    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Animated.ScrollView
          horizontal
          nestedScrollEnabled
          contentContainerStyle={{ justifyContent: 'center' }}
          showsHorizontalScrollIndicator={false}
          style={[
            {
              paddingLeft: 10,
              height: 60, width: '100%', backgroundColor: 'white', position: 'absolute', top: 132, zIndex: 10
            },
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(20),
                  Utils.scaleWithPixel(25),
                ],
                outputRange: [heightImageBanner, 0, 0],
                extrapolateLeft: 'clamp',
              }),
            },
          ]}
        >
          <TouchableOpacity style={styles.filterPills}
            onPress={() => this.openModal(true)}
          >
            <Text style={{ fontSize: 12, color: 'black', lineHeight: 26 }}>
              Popular Filters
            </Text>
            <Icon
              name="chevron-down"
              style={[styles.titleIcon, { color: '#000', marginLeft: 10 }]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterPills}
            onPress={() => this.openModal(true)}
          >
            <Text style={{ fontSize: 12, color: 'black', lineHeight: 26 }}>
              Duration of Stay
            </Text>
            <Icon
              name="chevron-down"
              style={[styles.titleIcon, { color: '#000', marginLeft: 10 }]} />
          </TouchableOpacity>


        </Animated.ScrollView>
        <HSectionList
          ListHeaderComponent={
            <View>
              <View style={{ paddingTop: 10 }} />
              <Modal
                onBackdropPress={() => this.openModal(false)}
                isVisible={modalVisible}
                backdropColor="rgba(0, 0, 0, 0.5)"
                backdropOpacity={1}
                animationIn="fadeIn"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                swipeDirection="down"
                onSwipeComplete={() => this.openModal(false)}

              >
                <View style={{ backgroundColor: 'white', borderRadius: 15 }}>

                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <View style={{ flex: 0.1, justifyContent: 'center' }}>
                      <Icon
                        name="times"
                        style={[styles.titleIcon, { color: '#000', marginLeft: 10, alignSelf: 'center' }]} />
                    </View>

                    <View style={{ flex: 0.8, flexDirection: 'column' }}>
                      <View style={{ height: 3, width: 55, borderRadius: 5, backgroundColor: 'grey', alignSelf: 'center', marginTop: 8 }} />
                      <Text style={{ alignSelf: 'center', paddingVertical: 20 }}>Type of Places</Text>
                    </View>


                    <View style={{ flex: 0.1 }} />
                  </View>

                  <View style={{ borderBottomWidth: 0.5, borderColor: 'grey', width: '100%', marginBottom: 20 }} />


                  <TouchableOpacity
                    onPress={this.handleCheckedAccommodation}
                    style={{ flexDirection: 'row', height: 55, marginVertical: 8, paddingHorizontal: 30, paddingVertical: 5 }}>
                    <View style={styles.filterTitle}>
                      <Text>Accommodation Included</Text>
                      <Text style={{ color: 'grey', fontSize: 12 }}>Treatment plans with accommodations.</Text>

                    </View>
                    <View style={{ flex: 0.1 }}>
                      <CheckBox
                        onPress={this.handleCheckedAccommodation}
                        isCheck={this.state.baconIsReadyAccommodation}
                      />

                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.handleCheckedPostcare}
                    style={{ flexDirection: 'row', height: 55, marginVertical: 8, paddingHorizontal: 30, paddingVertical: 5 }}>
                    <View style={styles.filterTitle}>
                      <Text>Post-care services</Text>
                      <Text style={{ color: 'grey', fontSize: 12 }}>Treatment have ongoing post-treatment services on-site and at home</Text>
                    </View>
                    <View style={{ flex: 0.1 }}>
                      <CheckBox
                        onPress={this.handleCheckedAccommodation}
                        isCheck={this.state.baconIsReadyPostcare}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.handleCheckedTransportation}
                    style={{ flexDirection: 'row', height: 55, marginVertical: 8, paddingHorizontal: 30, paddingVertical: 5 }}>
                    <View style={styles.filterTitle}>
                      <Text>Include transportation</Text>
                      <Text style={{ color: 'grey', fontSize: 12 }}>Treatment plans that include airport or pickup services</Text>

                    </View>
                    <View style={{ flex: 0.1 }}>
                      <CheckBox
                        onPress={this.handleCheckedAccommodation}
                        isCheck={this.state.baconIsReadyTransportation}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.handleCheckedAccommodation}
                    style={styles.filterBoxSmall}><View style={styles.filterTitle}>
                      <Text>Include transportation</Text>
                    </View>
                    <View style={{ flex: 0.1 }}>
                      <CheckBox
                        onPress={this.handleCheckedAccommodation}
                        isCheck={this.state.baconIsReadyAccommodation}
                      />
                    </View>
                  </TouchableOpacity>


                  <View style={{ borderBottomWidth: 0.5, borderColor: 'grey', width: '100%', marginTop: 25, marginBottom: 10 }} />

                  <TouchableOpacity
                    onPress={this.showPackage}
                    style={{
                      backgroundColor: '#00bae5', height: 42, width: 150, borderRadius: 8,
                      alignSelf: 'flex-end', bottom: 0,
                      marginBottom: 10, marginRight: 15
                    }}>
                    {!this.state.isLoadingFiltered ?
                      <Text style={{ alignSelf: 'center', textAlign: 'center', color: 'white', lineHeight: 42 }}>
                        {filterApplied <= 0 ?
                          `Show ${clinics.length}`
                          :
                          `Show ${filteredPackage.length}`
                        }
                      </Text>
                      :
                      <Text>Loading..... </Text>
                    }
                  </TouchableOpacity>

                </View>

              </Modal>
            </View>
          }
          renderItem={this._renderList}
          // renderSectionHeader={this.renderSectionHeader}
          stickySectionHeadersEnabled={true}
          sections={sectionlistData}
          keyExtractor={this.keyExtractor}
          getItemLayout={this.getItemLayout}
          index={this.props.index}
          {...props}
          style={{ paddingTop: 20 }}
        // makeScrollTrans={this.makeScrollTrans}

        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterBox: {
    flexDirection: 'row', height: 55, marginVertical: 8, paddingHorizontal: 30, paddingVertical: 5,
  },
  filterTitle: {
    flex: 0.9, flexDirection: 'column'
  },
  filterBoxSmall: {
    flexDirection: 'row', height: 30, marginVertical: 8, paddingHorizontal: 30, paddingVertical: 5,
  },
  filterPills: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 20,
    height: 30,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center'

  },
  titleStyle: {
    color: '#333',
    fontSize: 14
  },
  sectionTitle: {
    color: '#4D4D4D',
    fontSize: 15,
  },
  sectionItem: {
    height: 50,
    justifyContent: 'center',
    // paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.14,
    shadowRadius: 11.95,

    elevation: 18,
  },
  flatItem: {
    marginBottom: 5,
    width: G_WIN_WIDTH / 2.1,
    maxWidth: G_WIN_WIDTH / 2.1,
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  titleIcon: {

  }
});