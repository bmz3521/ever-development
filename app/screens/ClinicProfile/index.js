import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Header, SafeAreaView, Text, ModalSaveList } from '@components';
import { Images } from '@config';
import { Divider, useTheme, Icon, Avatar } from 'react-native-elements';
import { Icon as Icon2, Loading } from '@components';
import { SvgCssUri } from 'react-native-svg';
import ClinicLocation from './components/ClinicLocation';
import ClinicPolicy from './components/ClinicPolicy';
import Swiper from 'react-native-swiper';
import * as IconLabel from '../../minimal-components/IconLabel';
import useHooks from './hooks';
import useStyles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ClinicProfile = ({ navigation, route }) => {
  const {
    clinic,
    amenities,
    amenityShown,
    amenityTextShown,
    actions,
    aboutLengthMore,
    aboutTextShown,
    careTeamTextShown,
    careTeamLengthMore,
    doctorList,
    doctors,
    loading,
    hasInSaveList,
  } = useHooks({
    navigation,
    route,
  });
  const baseStyles = useStyles();
  const { theme } = useTheme();
  const saveListRef = useRef();

  const renderPagination = (index, total, context) => {
    return (
      <View style={baseStyles.renderPagination}>
        <Text style={baseStyles.paginationText}>
          {`${index + 1}`}/{total}
        </Text>
      </View>
    );
  };

  const ImageComponent = props => {
    return <Image {...props} />;
  };
  const ImageMemo = React.memo(ImageComponent);

  const RenderItem = ({ photo, index }) => {
    return (
      <View style={{ height: 300 }}>
        <ImageMemo
          style={baseStyles.swipeImage}
          source={{ uri: photo }}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={{ position: 'absolute', top: 15, right: 20 }}
          onPress={() => {
            saveListRef.current.show({ clinicId: clinic.id });
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(255,255,255, 0.8)',
              padding: 5,
              borderRadius: 50,
            }}
          >
            {hasInSaveList ? (
              <Ionicons name="heart" size={20} color="red" />
            ) : (
              <Ionicons name="heart-outline" size={20} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const SwiperCard = React.memo(RenderItem);

  const DoctorCard = ({ doctor }) => {
    return (
      <View key={doctor.doctorId} style={baseStyles.doctorCardWrapper}>
        <View style={baseStyles.avatarWrapper}>
          <Avatar
            source={{
              uri: doctor.imgProfile,
            }}
            containerStyle={{
              backgroundColor: 'transparent',
            }}
            size="large"
            rounded
          />
        </View>
        <View style={baseStyles.doctorDetailWrapper}>
          <Text
            type="body4"
            style={{
              lineHeight: 20,
            }}
          >{`Dr. ${doctor.firstName} ${doctor.lastName}`}</Text>

          <Text type="body5">{doctor.doctorTitle}</Text>
          <View style={baseStyles.specialtyListWrapper}>
            {doctor.specialities.slice(0, 2).map((specialty, index) => (
              <View key={index} style={baseStyles.specialtyBadge}>
                <Text type="body5">{specialty}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flexGrow: 1 }} forceInset={{ top: 'always' }}>
      <ModalSaveList ref={saveListRef} enableBackdropDismiss />
      <Header text={clinic.name} onPressLeft={() => navigation.goBack()} />
      {/* <Loading isVisible={loading}/> */}
      {loading ? (
        <Loading isVisible={loading} />
      ) : (
        <>
          <ScrollView style={baseStyles.container}>
            {/* Clinic Header Section*/}
            <View>
              {clinic.ClinicPhotos && (
                <Swiper
                  index={0}
                  style={{ height: 300 }}
                  renderPagination={renderPagination}
                  loop={false}
                >
                  {clinic.ClinicPhotos.map((item, index) => (
                    <SwiperCard photo={item.photo} key={index} />
                  ))}
                </Swiper>
              )}
              <View style={baseStyles.clinicInfo}>
                <View style={baseStyles.nameLocationWrapper}>
                  <Text type="h5" style={baseStyles.textColorDefault}>
                    {clinic.name}
                  </Text>
                  <View style={baseStyles.row}>
                    <Icon
                      type="ionicon"
                      name="location-outline"
                      size={17}
                      color={theme.colors.primary}
                      style={baseStyles.locationIcon}
                    />
                    <Text
                      type="body5"
                      style={baseStyles.textColorGrey}
                    >{`${clinic?.city?.toUpperCase()} - ${clinic?.country?.toUpperCase()}`}</Text>
                  </View>
                </View>

                <Text type="body3" style={baseStyles.textColorGrey}>
                  {clinic.taglinedescription}
                </Text>
                <TouchableOpacity
                  style={baseStyles.reviewWrapper}
                  onPress={() =>
                    navigation.navigate('ClinicReview', {
                      review: clinic?.ClinicReviews,
                    })
                  }
                >
                  <Text>
                    <IconLabel.FA
                      icon="star"
                      label={clinic.clinicRating}
                      color={theme.colors.primary}
                    />
                  </Text>

                  <Text
                    type="body3"
                    style={baseStyles.reviewText}
                  >{`(${clinic?.ClinicReviews?.length}) Reviews`}</Text>
                </TouchableOpacity>
              </View>
              <View style={baseStyles.dividerWrapper}>
                <Divider width={1} color={theme.colors.grey5} />
              </View>
            </View>

            {/* Verified section */}
            {clinic?.verified === 'yes' && (
              <View>
                <View style={baseStyles.blockVerifiedView}>
                  <View style={baseStyles.verified}>
                    <Image
                      style={baseStyles.verifiedImage}
                      source={Images.verifiedClinic}
                    />
                    <View style={baseStyles.verifiedItem}>
                      <Text type="h6" style={baseStyles.verifiedTitle}>
                        Verified Partner, Best Price Guaranteed.
                      </Text>
                      <Text type="body3" style={baseStyles.verifiedText}>
                        This clinic has been verified by a member of Ever Team
                        and is on our "Best Price Agreement". The clinic passed
                        Ever's standard criteria for Trust, Safety & Quality.
                      </Text>
                    </View>
                  </View>

                  <View style={baseStyles.verified}>
                    <Image
                      style={baseStyles.verifiedImage}
                      source={Images.verifiedSupport}
                    />
                    <View style={baseStyles.verifiedItem}>
                      <Text type="h6" style={baseStyles.verifiedTitle}>
                        24/7 Care Support.
                      </Text>
                      <Text type="body3" style={baseStyles.verifiedText}>
                        This clinic is covered under our 24/7 care support
                        policy. This means we can help answer any questions &
                        guide you through any issues that may arise via Live
                        Messaging or email, or call center.
                      </Text>
                    </View>
                  </View>

                  <View style={baseStyles.verified}>
                    <Image
                      style={baseStyles.verifiedImage}
                      source={Images.verifiedLocation}
                    />
                    <View style={baseStyles.verifiedItem}>
                      <Text type="h6" style={baseStyles.verifiedTitle}>
                        Fully supported location.
                      </Text>
                      <Text type="body3" style={baseStyles.verifiedText}>
                        This clinic is located in Thailand, allowing our Care
                        Team to be on-site and present with you in-case of
                        emergencies and any required support.
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={baseStyles.divider}>
                  <Divider width={1} color={theme.colors.grey5} />
                </View>
              </View>
            )}

            {/* About Section */}
            {clinic.about && (
              <View>
                <View style={[baseStyles.blockView, baseStyles.aboutWrapper]}>
                  <Text
                    type="body3"
                    onTextLayout={actions.onAboutTextLayout}
                    numberOfLines={aboutTextShown ? null : 5}
                    style={baseStyles.lineHeightDefault}
                  >
                    {clinic.about}
                  </Text>

                  {aboutLengthMore && (
                    <TouchableOpacity
                      onPress={() => actions.toggleNumberOfLines('about')}
                      style={baseStyles.showWrapper}
                    >
                      <Text type="body3" style={baseStyles.showBtn}>
                        {aboutTextShown ? 'Show less' : 'Show more'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            {/* Accreditation Section */}
            {clinic?.Accreditations?.length > 0 && (
              <View style={[baseStyles.blockView, baseStyles.aboutWrapper]}>
                <Text type="buttonLarge">Accreditation</Text>

                <View style={baseStyles.accreditationWrapper}>
                  {clinic?.Accreditations?.map((item, index) => (
                    <View key={index} style={baseStyles.rowIcon}>
                      <Image
                        source={{ uri: item.image }}
                        style={baseStyles.accreditationImage}
                      />
                      <Text type="subTitle2">{item.desc}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            {/* Amenities */}
            {clinic?.Amenities?.length > 0 && (
              <View style={[baseStyles.blockView, baseStyles.aboutWrapper]}>
                <Text type="buttonLarge">Amenities</Text>

                {amenities && (
                  <View style={baseStyles.accreditationWrapper}>
                    {amenityShown?.map((amenity, index) => (
                      <View key={index} style={baseStyles.amenityItemWrapper}>
                        <View style={baseStyles.svgWrapper}>
                          <SvgCssUri
                            width="25"
                            height="25"
                            uri={amenity.image}
                          />
                        </View>

                        <Text
                          type="subTitle3"
                          style={baseStyles.amenityText}
                          numberOfLines={2}
                        >
                          {amenity.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {amenities.length > 3 && (
                  <TouchableOpacity
                    onPress={() => actions.toggleNumberOfLines('amenities')}
                    style={baseStyles.amenityBtn}
                  >
                    <Text type="body3" style={baseStyles.showBtn}>
                      {amenityTextShown ? 'Show less' : 'Show more'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Clinic Care Team */}
            <View style={[baseStyles.blockView, baseStyles.aboutWrapper]}>
              <Text type="buttonLarge">Care Teams</Text>
              <View style={[baseStyles.row, baseStyles.staffVerifyWrapper]}>
                <Icon2 name="check-circle" size={15} color="green" />
                <Text type="subTitle3" style={baseStyles.staffVerifyTitle}>
                  Staff verified.
                </Text>
              </View>

              <Text
                onTextLayout={actions.onCareTeamTextLayout}
                numberOfLines={careTeamTextShown ? undefined : 4}
                type="body3"
                style={baseStyles.careTeamText}
              >
                {clinic.staff}
              </Text>

              {careTeamTextShown && (
                <View>
                  <View style={baseStyles.lngWrapper}>
                    <View>
                      <Text
                        type="h6"
                        style={{
                          fontSize: 15,
                        }}
                      >
                        Language:
                      </Text>
                    </View>

                    <View style={baseStyles.lngListWrapper}>
                      {clinic?.languages?.map((item, index) => {
                        if (index + 1 === clinic.languages.length) {
                          return (
                            <Text type="body3" key={index}>
                              {item}
                            </Text>
                          );
                        }
                        return (
                          <Text type="body3" key={index}>{`${item}, `}</Text>
                        );
                      })}
                    </View>
                  </View>

                  {doctorList?.length > 0 && (
                    <View>
                      <View style={baseStyles.listDividerWrapper}>
                        <Divider width={1} color={theme.colors.grey5} />
                      </View>
                      <View style={baseStyles.doctorListWrapper}>
                        {doctorList.map((doctor, index) => (
                          <DoctorCard key={index} doctor={doctor} />
                        ))}
                      </View>
                      <View>
                        <TouchableOpacity
                          style={baseStyles.seeAll}
                          onPress={() =>
                            navigation.navigate('DoctorList', { doctors })
                          }
                        >
                          <Text type="buttonSmall">See All Our Team</Text>
                          <Icon
                            name="chevron-forward-outline"
                            type="ionicon"
                            size={14}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              )}

              {careTeamLengthMore && (
                <TouchableOpacity
                  onPress={() => actions.toggleNumberOfLines('careteam')}
                  style={baseStyles.careTeamBtnWrapper}
                >
                  <Text type="body3" style={baseStyles.showBtn}>
                    {careTeamTextShown ? 'Show less' : 'Show more'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Location Section */}
            <ClinicLocation clinic={clinic} />

            {/* ClinicPolicy Section */}
            {/* <ClinicPolicy clinic={clinic} /> */}
          </ScrollView>

          {/* BottomBtn */}
          <View style={baseStyles.footer}>
            <TouchableOpacity
              style={[baseStyles.bottomBtn]}
              onPress={() => actions.navigateToSelectTime(clinic)}
            >
              <Text type="buttonLarge" style={baseStyles.bottomBtnText}>
                {'จองคิวรับบริการ'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ClinicProfile;
