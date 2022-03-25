import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useRef } from 'react';
import useHooks from './hooks';
import {
  SafeAreaView,
  Text,
  Header,
  Loading2,
  ModalSaveList,
} from '@components';
import Swiper from 'react-native-swiper';
import useStyles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider, useTheme } from 'react-native-elements';
import { LocationView } from '@components';
import ServiceProcessModal from './components/ServiceProcessModal';
import PreoperativeModal from './components/PreoperativeModal';
import DescriptionModal from './components/DescriptionModal';
import ReviewCard from './components/ReviewCard';

const CARD_WIDTH = Dimensions.get('window').width * 0.7;
const CARD_HEIGHT = Dimensions.get('window').height * 0.3;

const ClinicPackageProfile = ({ navigation, route }) => {
  const {
    clinicPackage,
    clinic,
    loading,
    serviceProcessModalVisible,
    preOperationModalVisible,
    descriptionModalVisible,
    actions,
  } = useHooks({ navigation, route });
  const baseStyles = useStyles();
  const { theme } = useTheme();
  const saveListRef = useRef();

  const renderPagination = (index, total, context) => {
    return (
      <View key={index} style={baseStyles.renderPagination}>
        <Text style={baseStyles.paginationText}>
          {`${index + 1}`}/{total}
        </Text>
      </View>
    );
  };

  // RenderItem causes Apple real device to crash
  const RenderItem = item => {
    return (
      <Image
        style={baseStyles.swipeImage}
        source={{ uri: item }}
        resizeMode="cover"
      />
      /* <TouchableOpacity
          style={{ position: 'absolute', top: 15, right: 20 }}
          onPress={() => {
            saveListRef.current.show();
            saveListRef.current.data({ clinicId: clinic.id });
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(255,255,255, 0.8)',
              padding: 5,
              borderRadius: 50,
            }}
          >
            <Ionicons name="heart-outline" size={20} />
          </View>
        </TouchableOpacity> */
    );
  };

  if (loading) {
    return <Loading2 />;
  }

  return (
    <>
      <SafeAreaView style={{ flexGrow: 1 }} forceInset={{ top: 'always' }}>
        <Header
          text={clinicPackage.name}
          onPressLeft={() => navigation.goBack()}
        />
        {/* <ModalSaveList ref={saveListRef} enableBackdropDismiss /> */}
        <ServiceProcessModal
          modalVisible={serviceProcessModalVisible}
          setModalVisible={actions.setServiceProcessModalVisible}
          clinicPackage={clinicPackage}
        />
        <PreoperativeModal
          modalVisible={preOperationModalVisible}
          setModalVisible={actions.setPreOperationModalVisible}
          clinicPackage={clinicPackage}
        />
        <DescriptionModal
          modalVisible={descriptionModalVisible}
          setModalVisible={actions.setDescriptionModalVisible}
          clinicPackage={clinicPackage}
        />
        <ScrollView style={baseStyles.container}>
          {/* Header Image */}
          <View>
            {clinicPackage.packagePhotos && (
              <Swiper
                index={0}
                style={{ height: 280 }}
                renderPagination={renderPagination}
                loop={false}
              >
                {clinicPackage.packagePhotos.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      style={baseStyles.swipeImage}
                      source={{ uri: item }}
                      resizeMode="cover"
                    />
                  );
                })}
              </Swiper>
            )}
          </View>

          {/* Content */}
          <View style={baseStyles.contentContainer}>
            {/* Detail Section */}
            <View style={baseStyles.blockView}>
              <View style={baseStyles.titleContainer}>
                <Text type="h5" style={{ lineHeight: 30 }}>
                  {clinicPackage.name}
                </Text>
              </View>

              <View style={[baseStyles.row, { alignItems: 'center' }]}>
                {/* <TouchableOpacity
                  style={[baseStyles.row, { alignItems: 'center' }]}
                > */}
                <FontAwesome
                  name="star"
                  style={{ marginRight: 7, color: theme.colors.primary }}
                  size={16}
                />
                <View style={{ marginRight: 5 }}>
                  <Text style={baseStyles.textGrey}>{'4.94'}</Text>
                </View>
                <Text style={baseStyles.textGrey}>{`(5 reviews)`}</Text>
                {/* </TouchableOpacity> */}
              </View>
              {clinicPackage.location && (
                <View>
                  <Text style={baseStyles.textGrey}>
                    {`${clinicPackage.location[0]} - ${clinicPackage.location[1]}`}
                  </Text>
                </View>
              )}
            </View>
            <Divider width={1} color={theme.colors.grey5} />

            {/* Item Details */}
            {clinicPackage?.itemDetails?.length > 0 && (
              <View style={baseStyles.blockView}>
                <Text type="buttonLarge">Item Details</Text>

                <View style={baseStyles.detailTitle}>
                  <Text>{clinicPackage.fullName}</Text>
                </View>

                {/* Details Box */}
                <View style={baseStyles.detailsBox}>
                  {clinicPackage.itemDetails.map((item, index) => {
                    return (
                      <>
                        <View
                          key={`detail_${index}`}
                          style={baseStyles.detailItem}
                        >
                          <View style={baseStyles.column1}>
                            <Text type="body2" style={baseStyles.lineHeight}>
                              {item.item}
                            </Text>
                          </View>

                          <View style={baseStyles.column2}>
                            {item.amount !== '' && (
                              <View style={baseStyles.amountBadge}>
                                <Text type="body4">{item.amount}</Text>
                              </View>
                            )}
                          </View>
                        </View>
                        {index < clinicPackage.itemDetails.length - 1 && (
                          <Divider
                            width={1}
                            color={theme.colors.grey5}
                            key={index}
                          />
                        )}
                      </>
                    );
                  })}
                </View>
              </View>
            )}
            <Divider width={1} color={theme.colors.grey5} />

            {/* Description */}
            {clinicPackage.description && (
              <>
                <View style={baseStyles.blockView}>
                  <Text type="buttonLarge">Description</Text>
                  <View style={{ marginTop: 15 }}>
                    <Text
                      style={baseStyles.lineHeight}
                      numberOfLines={5}
                    >{`${clinicPackage.description}`}</Text>
                  </View>
                  <View style={{ width: 130 }}>
                    <TouchableOpacity
                      style={baseStyles.showMoreBtn}
                      onPress={() => actions.setDescriptionModalVisible(true)}
                    >
                      <Text
                        type="h6"
                        style={{
                          lineHeight: 20,
                          textDecorationLine: 'underline',
                        }}
                      >
                        Show more
                      </Text>
                      <View style={{ marginLeft: 5 }}>
                        <Ionicons name="chevron-forward-outline" size={16} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <Divider width={1} color={theme.colors.grey5} />
              </>
            )}

            {/* Service Process */}
            <TouchableOpacity
              onPress={() => actions.setServiceProcessModalVisible(true)}
            >
              <View style={baseStyles.blockView}>
                <View style={baseStyles.buttonRow}>
                  <Text type="buttonLarge">Service Process</Text>
                  <Ionicons name="chevron-forward-outline" size={22} />
                </View>
              </View>
            </TouchableOpacity>
            <Divider width={1} color={theme.colors.grey5} />

            {/* Pre Operation */}
            <TouchableOpacity
              onPress={() => actions.setPreOperationModalVisible(true)}
            >
              <View style={baseStyles.blockView}>
                <View style={baseStyles.buttonRow}>
                  <Text type="buttonLarge">Preoperative Instructions</Text>
                  <Ionicons name="chevron-forward-outline" size={22} />
                </View>
              </View>
            </TouchableOpacity>
            <Divider width={1} color={theme.colors.grey5} />

            {/* CareTeam */}
            {/* <View style={baseStyles.blockView}>
              <Text type="buttonLarge">Care Team</Text>
            </View>
            <Divider width={1} color={theme.colors.grey5} /> */}

            {/* Review */}
            {clinic?.ClinicReviews?.length > 0 && (
              <>
                <View style={baseStyles.blockView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome
                      name="star"
                      style={{ color: theme.colors.primary }}
                      size={16}
                    />
                    <View style={{ marginRight: 4 }}>
                      <Text type="buttonLarge">{`5.0`}</Text>
                    </View>
                    <Text type="buttonSmall">{`\u2022`}</Text>
                    <Text type="buttonLarge">
                      {` ${clinic?.ClinicReviews?.length} reviews`}
                    </Text>
                  </View>

                  <View style={{ height: CARD_HEIGHT, marginTop: 20 }}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      snapToInterval={CARD_WIDTH + 15}
                      snapToAlignment="center"
                    >
                      {clinic?.ClinicReviews?.slice(0, 4).map((item, index) => {
                        return <ReviewCard key={index} item={item} />;
                      })}
                      <ReviewCard
                        last
                        length={clinic?.ClinicReviews?.length}
                        review={clinic?.ClinicReviews}
                        navigation={navigation}
                      />
                    </ScrollView>
                  </View>
                </View>
                <Divider width={1} color={theme.colors.grey5} />
              </>
            )}

            {/* Location */}
            <View style={baseStyles.blockView}>
              <Text type="buttonLarge">Location</Text>
              <View style={baseStyles.sectionContentWrapper}>
                <Text style={baseStyles.lineHeight}>
                  {`${clinicPackage.name} is provided treatment by ${clinic.name}`}
                </Text>
                <View style={{ marginTop: 8 }}>
                  <Text style={{ lineHeight: 20, color: theme.colors.grey3 }}>
                    You can ask direction details from the clinics in chat after
                    quotation submission.
                  </Text>
                </View>

                <View style={{ marginTop: 15 }}>
                  <LocationView lat={clinic.latitude} lon={clinic.longitude} />
                </View>
              </View>
            </View>
            <Divider width={1} color={theme.colors.grey5} />

            {/* Policies */}
            <View style={baseStyles.blockView}>
              <Text type="buttonLarge">Policies</Text>
              <View style={baseStyles.sectionContentWrapper}>
                <Text style={baseStyles.lineHeight}>
                  Cancellation Flexible policy – Free cancellation Cancelling
                  within 48 hours or of short notice will affect the medical
                  center's ability to plan their resources, doctors, assessment
                  equipment and more. Please notify the center as soon as
                  possible regarding your availability on the appointed date.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button*/}
        <View style={baseStyles.footer}>
          <TouchableOpacity
            style={[baseStyles.bottomBtn]}
            onPress={actions.onBooking}
          >
            <Text type="buttonLarge" style={baseStyles.bottomBtnText}>
              {'จองคิวรับบริการ'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ClinicPackageProfile;
