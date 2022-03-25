import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import SvgUri from 'react-native-fast-svg';
import Carousel, {
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import { BaseStyle, BaseColor, Images } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Image,
  StarRating,
  ReviewItem,
  Button,
} from '@components';
import ImgCarousel from '../../minimal-components/ImgCarousel';
import * as ButtonUI from '../../minimal-components/Button';
import * as IconLabel from '../../minimal-components/IconLabel';
import DoctorHorizontalCard from '../../minimal-components/DoctorHorizontalCard';

import * as Utils from '@utils';
import UserAvatar from 'react-native-user-avatar';
import styles from './styleClinic';

import * as Typography from '../../config/Typography';
import colors from '../../config/colors';
import styled from 'styled-components';

import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

function ClinicProfileComponent({
  clinic,
  navigation,
  route,
  ready,
  aboutList,
  aboutMoreCondition,
  locationList,
  locationMoreCondition,
  events,
}) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const deltaY = new Animated.Value(0);
  const [heightHeader, setHeightHeader] = React.useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader;

  const renderPagination = (index, total, context) => {
    return (
      <View
        style={{
          position: 'absolute',
          right: 15,
          bottom: 35,
          backgroundColor: 'grey',
          width: 45,
          alignItems: 'center',
          borderRadius: 30,
        }}
      >
        <Text style={{ color: 'white' }}>
          <Text style={{ color: 'white' }}>{index + 1}</Text>/{total}
        </Text>
      </View>
    );
  };

  const RenderItem = ({ photo, index }) => {
    console.log('_renderItem');
    console.log(photo.photo);
    return (
      <View style={{ height: 350 }}>
        <Image
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}
          source={{ uri: photo.photo }}
          resizeMode={'cover'} // cover or contain its upto you view look
        />
      </View>
    );
  };

  if (clinic.error) return <Text>Fetch error: {clinic.error.message}</Text>;

  if (!ready || clinic.loading)
    return (
      <View style={{ flex: 1 }}>
        <Swiper
          style={{ height: 300 }}
          renderPagination={renderPagination}
          loop={false}
        >
          <View />
          {/* <RenderItem photo={photo} /> */}
        </Swiper>
        <View style={styles.fullView}>
          <View />
          {/* <View
              style={[styles.contentBoxTop, { marginTop: marginTopBanner }]}
            /> */}
          <View style={styles.blockView}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 24,
                fontWeight: 'semi-bold',
              }}
            >
              Test Clinic
            </Text>
            <Text body2>Bangkok - Thailand</Text>
            <View style={styles.reviewView}>
              <StarRating
                disabled={true}
                starSize={14}
                maxStars={1}
                rating={rating}
                selectedStar={() => {}}
                fullStarColor={'#284F30'}
              />
              <Text style={styles.reviewCount}>(6)</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ReviewList', {})}
              >
                <Text style={{ textStyle: 'underline', fontSize: 12 }}>
                  Reviews
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Loading/> */}
      </View>
    );

  const accreditationList = clinic.data.Accreditations || [];
  const amenityList = clinic.data.Amenities || [];
  const reviewList = clinic.data.ClinicReviews || [];
  const photoList = clinic.data.ClinicPhotos || [];
  const staffList = clinic.data.Doctors || [];
  const staffIntro = clinic.data.staff;

  const hasCoordinate = !!clinic.data.latitude && !!clinic.data.longitude;
  const rating = parseFloat(
    (Math.ceil(clinic.data.clinicRating * 2) / 2).toFixed(1),
  );

  // console.log(reviewList.map(r => r));

  // const { avatar } = this.props;
  console.log('clinic.data');
  console.log(route);

  console.log(clinic.data);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <Animated.Image
        source={{ uri: clinic.data.featureImageM}}
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(150),
                Utils.scaleWithPixel(150),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}
      /> */}
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        {/* <Header
          title=""
          renderLeft={() => {
            return (
              <Icon name="chevron-left" size={20} color={'black'} />
            );
          }}
          renderRight={() => {
            return (
              <Icon name="images" size={20} color={BaseColor.whiteColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate('PreviewImage');
          }}
        /> */}
        <ScrollView
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: deltaY } } },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}
          contentContainerStyle={{ backgroundColor: 'white' }}
        >
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Swiper
              style={{ height: 300 }}
              renderPagination={renderPagination}
              loop={false}
            >
              {clinic.data.ClinicPhotos.map(photo => (
                <RenderItem photo={photo} />
              ))}
            </Swiper>
            {/* <Carousel
            inactiveSlideScale={0.9}
            data={clinic.data.ClinicPhotos}
            renderItem={_renderItem}
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderWidth={width}
            itemWidth={width}
            slideStyle={{ width: width }}
          />
                <Pagination
                  dotsLength={clinic.data.ClinicPhotos.length}
                  activeDotIndex={activeSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0}
                  inactiveDotScale={0}
                  // carouselRef={this._slider1Ref}
                  // tappableDots={!!this._slider1Ref}
                /> */}
            {/* <Text>{activeSlide} / {clinic.data.ClinicPhotos.length} </Text> */}
            <View style={styles.fullView}>
              <View />
              {/* <View
              style={[styles.contentBoxTop, { marginTop: marginTopBanner }]}
            /> */}
              <View style={styles.blockView}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 24,
                    fontWeight: 'semi-bold',
                  }}
                >
                  {clinic.data.name}
                </Text>
                <Text
                  body2
                >{`${clinic.data.city}, ${clinic.data.country}`}</Text>
                <View style={styles.reviewView}>
                  <StarRating
                    disabled={true}
                    starSize={14}
                    maxStars={1}
                    rating={rating}
                    selectedStar={() => {}}
                    fullStarColor={'#284F30'}
                  />
                  <Text style={styles.reviewCount}>({reviewList.length})</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ReviewList', {
                        reviews: reviewList,
                        clinic: clinic,
                      })
                    }
                  >
                    <Text style={{ textStyle: 'underline', fontSize: 12 }}>
                      Reviews
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: '#CCCCCC',
                    marginTop: 15,
                  }}
                />

                {clinic.data.verified && (
                  <View style={styles.blockVerifiedView}>
                    <View style={styles.verified}>
                      <Image
                        style={styles.verifiedImage}
                        source={Images.verifiedClinic}
                      />
                      <View style={styles.verifiedItem}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                          Verified Partner, Best Price Guaranteed.
                        </Text>
                        <Text
                          style={{
                            lineHeight: 20,
                            marginTop: 10,
                            fontSize: 13,
                          }}
                        >
                          This clinic has been verified by a member of Ever Team
                          and is on our "Best Price Agreement". The clinic
                          passed Ever's standard criteria for Trust, Safety &
                          Quality.
                        </Text>
                      </View>
                    </View>

                    <View style={styles.verified}>
                      <Image
                        style={styles.verifiedImage}
                        source={Images.verifiedSupport}
                      />
                      <View style={styles.verifiedItem}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                          24/7 Care Support.
                        </Text>
                        <Text
                          style={{
                            lineHeight: 20,
                            marginTop: 10,
                            fontSize: 13,
                          }}
                        >
                          This clinic is covered under our 24/7 care support
                          policy. This means we can help answer any questions &
                          guide you through any issues that may arise via Live
                          Messaging or email, or call center.
                        </Text>
                      </View>
                    </View>

                    <View style={styles.verified}>
                      <Image
                        style={styles.verifiedImage}
                        source={Images.verifiedLocation}
                      />
                      <View style={styles.verifiedItem}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                          Fully supported location.
                        </Text>
                        <Text
                          style={{
                            lineHeight: 20,
                            marginTop: 10,
                            fontSize: 13,
                          }}
                        >
                          This clinic is located in Thailand, allowing our Care
                          Team to be on-site and present with you in-case of
                          emergencies and any required support.
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
              <View
                style={[styles.blockView, { marginTop: 15, paddingBottom: 15 }]}
              >
                <TouchableOpacity onPress={events.setAboutMore(false)}>
                  {aboutList.map(text => (
                    <Typography.P
                      body1
                      numberOfLines={5}
                      key={text.slice(0, 5)}
                      style={{ lineHeight: 25 }}
                    >
                      {text}
                    </Typography.P>
                  ))}
                  {aboutMoreCondition && (
                    <TouchableOpacity
                      onPress={events.setAboutMore(true)}
                      style={{ flexDirection: 'row', marginTop: 10 }}
                    >
                      <Text body1 primaryColor style={styles.showOrReadMoreMP}>
                        read more
                      </Text>
                      <Icon name="angle-right" size={20} color="#284F30" />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              </View>

              {clinic.data.accreditationList && (
                <View style={styles.blockView}>
                  <Text title2 semibold>
                    Accreditations
                  </Text>
                  <View style={styles.row}>
                    {accreditationList.map(accreditation => (
                      <Image
                        key={accreditation.id}
                        style={styles.accreditationImage}
                        source={{ uri: accreditation.image }}
                      />
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.blockView}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Amenities
                </Text>
                <View
                  style={{
                    paddingVertical: 10,
                    justifyContent: 'center',
                  }}
                >
                  {amenityList.slice(0, 5).map(amenity => (
                    <View
                      key={amenity.id}
                      style={[
                        styles.row,
                        { marginBottom: 10, alignItems: 'flex-start' },
                      ]}
                    >
                      <Text style={{ fontSize: 14 }}>{amenity.name}</Text>
                      <SvgUri
                        width={25}
                        height={25}
                        source={{ uri: amenity.image }}
                      />
                    </View>
                  ))}
                </View>

                <View style={{ width: '100%' }}>
                  <TouchableOpacity
                    full
                    style={{
                      marginTop: 10,
                      borderRadius: 5,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      width: '100%',
                      paddingHorizontal: 5,
                      paddingVertical: 10,
                    }}
                    onPress={() =>
                      navigation.navigate('AmenityList', {
                        amenities: amenityList,
                      })
                    }
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#000000',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}
                    >
                      Show all {amenityList.length} amenities
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AmenityList', { amenities: amenityList })
                }
                style={{ flexDirection: 'row' }}
              >
                <Text body1 style={styles.showOrReadMoreMP}>
                  Show all {amenityList.length} amenities
                </Text>
              </TouchableOpacity> */}
              </View>

              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: '#CCCCCC',
                  marginTop: 15,
                }}
              />

              <View style={{ width: '100%' }}>
                <DoctorHorizontalCard
                  doctorList={reviewList}
                  clinic={clinic}
                  navigation={navigation}
                />
              </View>

              <View style={[styles.reviewView, styles.subtitleMargin]}>
                <StarRating
                  disabled={true}
                  starSize={16}
                  maxStars={5}
                  rating={rating}
                  selectedStar={() => {}}
                  fullStarColor={'#284F30'}
                />
                <Text bold style={styles.reviewCount}>
                  ({reviewList.length})
                </Text>
                <Text bold body1 style={{ textStyle: 'underline' }}>
                  Reviews
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 195,
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {reviewList.map((review, i) => (
                  <View
                    key={review.id}
                    style={[
                      i === 0 ? { marginLeft: 20 } : { marginLeft: 0 },
                      {
                        borderWidth: 1,
                        borderColor: '#CCCCCC',
                        borderRadius: 10,
                        padding: 20,
                        height: 195,
                        width: 350,
                        marginRight: 20,
                        flex: 'column',
                        flex: 2,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <UserAvatar
                        name={review.nickName}
                        src={review.imgProfile}
                        style={{
                          borderRadius: 50,
                          width: 35,
                          height: 35,
                          marginRight: 15,
                        }}
                      />
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text body1 bold>
                          {review.nickName}
                        </Text>
                        <Text style={{ color: 'grey', marginTop: 5 }}>
                          Posted in{' '}
                          {`${review.monthOfReview} ${review.yearOfReview}`}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        flex: 4,
                        paddingTop: 15,
                        lineHeight: 22,
                        fontSize: 14,
                      }}
                      numberOfLines={8}
                    >
                      {review.reviewComment}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={[styles.fullView, { width: '100%' }]}>
              <TouchableOpacity
                full
                style={{
                  marginTop: 20,
                  borderRadius: 5,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  width: '100%',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                onPress={() =>
                  navigation.navigate('ReviewList', {
                    reviews: reviewList,
                    clinic: clinic,
                  })
                }
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                >
                  Show all {reviewList.length} reviews
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fullView}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: '#CCCCCC',
                  marginTop: 15,
                }}
              />
              <View style={styles.blockView}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Care Teams
                </Text>
                <View style={styles.row}>
                  <Icon
                    name="check-circle"
                    size={15}
                    color={BaseColor.primaryColor}
                  />
                  <Text style={{ paddingLeft: 10, fontSize: 13 }}>
                    Staff verified.
                  </Text>
                </View>

                <Text
                  numberOfLines={30}
                  style={{
                    marginBottom: 15,
                    marginTop: 15,
                    paddingRight: 10,
                    lineHeight: 25,
                    fontSize: 15,
                  }}
                >
                  {staffIntro}
                </Text>

                {clinic.data.staffList && (
                  <View style={{ paddingVertical: 10 }}>
                    {staffList.slice(0, 5).map(staff => (
                      <View key={staff.id} style={styles.row}>
                        <Text style={styles.verifiedItem}>{staff.name}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* <FlatList
                contentContainerStyle={{
                  paddingRight: 10,
                  paddingLeft: 12,
                  marginBottom: 12,
                  marginTop: 12,
                }}
                // horizontal={true}
                // data={relate}
                // showsHorizontalScrollIndicator={false}
                // keyExtractor={(item, index) => item.id}
                // renderItem={({ item, index }) => (
                //   <EventCard
                //     // image={item.image}
                //     // title={item.title}
                //     // time={item.time}
                //     // location={item.location}
                //     // onPress={() => navigation.navigate('EventDetail')}
                //     // style={styles.eventCard}
                //   />
                )}
              /> */}
              </View>
              <View style={styles.blockView}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Location
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {clinic.data.name} is located in {clinic.data.city},{' '}
                  {clinic.data.country}.
                </Text>
                <Text style={{ fontSize: 15 }}>
                  You can ask direction details from the clinics in chat after
                  quotation submission.
                </Text>
                <TouchableOpacity onPress={events.setLocationMore(false)}>
                  {locationList.map(text => (
                    <Text
                      body1
                      numberOfLines={100}
                      key={text.slice(0, 5)}
                      style={[
                        styles.textHeight,
                        { marginBottom: 10, marginTop: 10 },
                      ]}
                    >
                      {text}
                    </Text>
                  ))}
                  {locationMoreCondition && (
                    <TouchableOpacity
                      onPress={events.setLocationMore(true)}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text
                        primaryColor
                        style={{
                          marginTop: 15,
                          marginBottom: 15,
                          paddingRight: 10,
                          color: '#284F30',
                          fontSize: 15,
                        }}
                      >
                        read more
                      </Text>
                      <Icon name="angle-right" size={20} color="#284F30" />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>

                {hasCoordinate && (
                  <View style={{ height: 240, width: '100%', marginTop: 10 }}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      style={styles.map}
                      region={{
                        latitude: parseFloat(clinic.data.latitude),
                        longitude: parseFloat(clinic.data.longitude),
                        latitudeDelta: 0.002305,
                        longitudeDelta: 0.0010525,
                      }}
                      onRegionChange={() => {}}
                    >
                      <Marker
                        coordinate={{
                          latitude: parseFloat(clinic.data.latitude),
                          longitude: parseFloat(clinic.data.longitude),
                        }}
                      />
                    </MapView>
                  </View>
                )}
                <Text body1 grayColor>
                  Exact location provided after booking
                </Text>
              </View>
              {/* <View style={styles.blockView}>
                            <Text title2 semibold>Reviews</Text>
                            {reviewList.length > 0 && (
                                <ReviewItem
                                    image={reviewList[0].imgProfile}
                                    name={reviewList[0].nickName}
                                    rate={reviewList[0].starRating}
                                    date={`${reviewList[0].monthOfReview} ${reviewList[0].yearOfReview}`}
                                    title={reviewList[0].procedureDone}
                                    comment={reviewList[0].reviewComment}
                                />
                            )}
                            <TouchableOpacity onPress={() => navigation.navigate("ReviewList", { reviews: reviewList })}>
                                <View style={[styles.row, styles.spaceBetween]}>
                                    <Text body1 primaryColor>Read all {reviewList.length} reviews</Text>
                                    <View>
                                        <StarRating
                                            disabled={true}
                                            starSize={16}
                                            maxStars={5}
                                            rating={rating}
                                            selectedStar={() => {}}
                                            fullStarColor={BaseColor.primaryColor}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View> */}
            </View>
          </View>
        </ScrollView>
        <View style={styles.contentButtonBottom}>
          {/* <Reserve>
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Typography.Sub2>Book Inquiry</Typography.Sub2>
            <Typography.Sub1 colors={colors.darkgray}> /박</Typography.Sub1>
          </View>
          <IconLabel.FA
            icon="star"
            label="4.65"
            label2="(305)"
            color={colors.red}
          />
        </View>
        <BtnContainer>
          <ButtonUI.BtnContain
            label="Get in touch"
            color={colors.red}
            onPress={() =>
              navigation.navigate('SelectTreatmentTimeSlot', {
                clinic: clinic.data,
              })
            }          
          />
        </BtnContainer>
      </Reserve> */}
        </View>
      </SafeAreaView>
    </View>
  );
}

const Reserve = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.faintgray};
  background-color: white;
`;

const BtnContainer = styled.View`
  width: 50%;
`;

export default ClinicProfileComponent;
