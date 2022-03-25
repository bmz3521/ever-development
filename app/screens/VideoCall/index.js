import React, { useEffect } from 'react';
import {
  Image,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Avatar, useTheme, Icon, Badge } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {
  TwilioVideoParticipantView,
  TwilioVideoLocalView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import _ from 'lodash';
import {
  SafeAreaView,
  ImageViewerModal,
  Button,
  PaymentSummaryCard,
} from '@components';
import LottieView from 'lottie-react-native';
import VideoCallMessages from 'app/container/VideoCallMessages';
import DoctorLottie from 'app/assets/lottie-animation/Doctor.json';
import PharmacyLottie from 'app/assets/lottie-animation/Pharmacy.json';
import moment from 'moment';
import { Images } from '@config';
import { Loading, StepProgress } from '@components';
import 'moment/locale/th';
moment.locale('th');
import styles from './styles';
import { useHooks } from './hooks';
import i18next from 'i18next';
import colors from 'app/styles/colors';

function VideoCall({ navigation, route }) {
  const {
    bookingId,
    price = 0,
    totalPrice = 0,
    consultationPrice = 0,
    // drugPriceTotal = 0,
    shippingPrice = 0,
  } = route.params;

  const user = useSelector(state => state.user);
  const telemedicine = useSelector(state => state.telemedicine);
  const twilioRef = React.useRef(null);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const {
    isLoading,
    doctorNotePending,
    patientInWaiting,
    booking,
    practitioner,
    role,
    status,
    chatShow,
    videoTracks,
    unreadCount,
    getBookingStatusWording,
    getBookingTypeWording,
    setFirebaseStatus,
    refreshing,
    onRefresh,
    _onRoomDidConnect,
    _onRoomDidDisconnect,
    _onRoomDidFailToConnect,
    _onParticipantRemovedVideoTrack,
    _onParticipantAddedVideoTrack,
    _onMuteButtonPress,
    _onFlipButtonPress,
    setChatScreen,
    setUnreadCount,
    joinVideoCall,
    isAudioEnabled,
    connected,
    firebaseStatus,
    drugPriceTotal,
    fromTo,
  } = useHooks({
    bookingId,
    price,
    navigation,
    telemedicine,
    user,
    twilioRef,
    price,
    dispatch,
  });

  const WaitingScreen = props => {
    const { booking, practitioner } = props;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginTop: 20, marginLeft: 20, flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.grey5,
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 100,
            }}
            onPress={() => navigation.navigate('Home')}
          >
            <Icon
              name="chevron-down"
              type="font-awesome-5"
              size={theme.fontSizeLarge}
            />
          </TouchableOpacity>
        </View>
        {/* BOOKING DETAIL SECTION */}
        <View
          style={{
            marginTop: 20,
            paddingVertical: 10,
            paddingLeft: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontSize: theme.fontSizeLargest,
                fontFamily: theme.fontFamilyBold,
                color: theme.colors.grey1,
              }}
            >
              {booking?.bookingCategory === 'telemed'
                ? `${
                    booking?.status.includes(`DOCTOR`)
                      ? i18next.t('MYBOOKINGACT_SCHEDULE_DOC')
                      : i18next.t('MYBOOKINGACT_SCHEDULE_PHAR')
                  }`
                : booking?.bookingCategory === 'covid'
                ? i18next.t('MYBOOKINGACT_CONSULT_DOC19')
                : `${
                    booking?.status?.includes(`DOCTOR`)
                      ? i18next.t('MYBOOKINGACT_CONSULT_DOC')
                      : i18next.t('MYBOOKINGACT_CONSULT_PHAR')
                  }`}
            </Text>
            <Text
              style={{
                fontSize: theme.fontSizeLarge,
                fontFamily: theme.fontFamilyDefault,
                color: theme.colors.grey3,
              }}
            >
              {getBookingStatusWording[firebaseStatus] === undefined
                ? ''
                : getBookingStatusWording[firebaseStatus]}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            <LottieView
              style={{ height: 100, marginBottom: 20, marginTop: 3 }}
              source={
                booking?.status?.includes(`DOCTOR`)
                  ? DoctorLottie
                  : PharmacyLottie
              }
              autoPlay
              loop
            />
          </View>
        </View>

        {/* TIMELINE */}
        <StepProgress status={firebaseStatus} />

        {/* PRACTITIONER DETAIL SECTION */}
        <View
          style={{
            marginTop: 30,
            justifyContent: 'space-between',
            backgroundColor: theme.colors.white,
            borderRadius: 10,
            shadowColor: theme.colors.shadows,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.3,
            elevation: 6,
            elevation: 4,
            margin: 10,
          }}
        >
          {!_.isEmpty(practitioner) ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: 10,
                }}
              >
                <Avatar
                  source={
                    practitioner?.photos.length > 0
                      ? {
                          uri: `${practitioner?.photos[0]?.imageUrl}`,
                        }
                      : Images.DoctorPlaceholder
                  }
                  containerStyle={{
                    backgroundColor: theme.colors.grey4,
                    margin: 5,
                  }}
                  size="medium"
                  rounded
                />
                <View
                  style={{
                    paddingHorizontal: 5,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.fontSizeDefault,
                      fontFamily: theme.fontFamilyDefault,
                    }}
                  >
                    {`${practitioner?.title ? practitioner?.title : ''}${
                      practitioner?.firstName
                    } ${practitioner?.lastName}`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.fontFamilyDefault,
                      fontSize: theme.fontSizeSmaller,
                      color: theme.colors.grey3,
                    }}
                    numberOfLines={2}
                  >
                    {practitioner?.bio}
                  </Text>
                </View>
              </View>

              {[
                'DOCTOR_JOIN',
                'PHARMACY_JOIN',
                'COMMUNITY_PHARMACIST_JOIN',
                'DOCTOR_PENDING_NOTE',
                'PHARMACY_PENDING_NOTE',
                'COMMUNITY_PHARMACIST_PENDING_NOTE',
              ].includes(firebaseStatus) && (
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                  }}
                >
                  {[
                    'DOCTOR_JOIN',
                    'PHARMACY_JOIN',
                    'COMMUNITY_PHARMACIST_JOIN',
                  ].includes(firebaseStatus) && (
                    <View style={{ flex: 1, marginRight: 5 }}>
                      <Button
                        full
                        style={{
                          marginTop: 10,
                          backgroundColor: theme.colors.secondary,
                        }}
                        onPress={() => joinVideoCall()}
                      >
                        <Text
                          style={{
                            fontSize: theme.fontSizeDefault,
                            fontFamily: theme.fontFamilyDefault,
                          }}
                        >
                          {i18next.t('VIDEOCALL_CALL')}
                        </Text>
                      </Button>
                    </View>
                  )}
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <Button
                      style={{
                        marginTop: 10,
                        backgroundColor: theme.colors.primary,
                      }}
                      onPress={() => setChatScreen(prev => !prev)}
                    >
                      <Text
                        style={{
                          fontSize: theme.fontSizeDefault,
                          fontFamily: theme.fontFamilyDefault,
                        }}
                      >
                        {i18next.t('VIDEOCALL_CHAT')}
                      </Text>
                    </Button>
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: -5,
                        zIndex: 1,
                      }}
                    >
                      {!!unreadCount && (
                        <Badge
                          value="New"
                          status="error"
                          textStyle={{ fontSize: 10 }}
                        />
                      )}
                    </View>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <Avatar
                source={Images.DoctorPlaceholder}
                containerStyle={{
                  backgroundColor: theme.colors.grey4,
                  margin: 5,
                }}
                size="medium"
                rounded
              />
              <View
                style={{
                  paddingHorizontal: 5,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.fontSizeDefault,
                    fontFamily: theme.fontFamilyDefault,
                  }}
                >
                  {getBookingTypeWording(
                    booking?.bookingCategory,
                    booking?.status,
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: theme.fontFamilyDefault,
                    fontSize: theme.fontSizeSmaller,
                    color: theme.colors.grey3,
                  }}
                  numberOfLines={2}
                >
                  {i18next.t('VIDEOCALL_RANDOM_PHYS')}
                </Text>
              </View>
              {/* {![
                'DOCTOR_PENDING',
                'DOCTOR_COMPLETED',
                'PHARMACY_PENDING',
                'PHARMACY_COMPLETED',
                'COMMUNITY_PHARMACIST_PENDING',
                'COMMUNITY_PHARMACIST_COMPLETED',
              ].includes(firebaseStatus) && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setChatScreen(prev => !prev)}
                >
                  <View
                    style={{
                      position: 'absolute',
                      top: -7,
                      right: -5,
                      zIndex: 1,
                    }}
                  >
                    {!!unreadCount && (
                      <Badge
                        value="New"
                        status="error"
                        textStyle={{ fontSize: 10 }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      backgroundColor: theme.colors.primary,
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: theme.colors.shadows,
                      shadowOffset: { width: 1, height: 1 },
                      shadowOpacity: 0.3,
                      elevation: 6,
                    }}
                  >
                    <Icon
                      name="comment-dots"
                      type="font-awesome-5"
                      color={theme.colors.white}
                      size={theme.fontSizeLargest}
                    />
                  </View>
                </TouchableOpacity>
              )} */}
            </View>
          )}
        </View>

        {/* USER SYMPTOM DETAIL */}
        {booking?.symptom &&
          booking?.symptom?.note !== '' &&
          booking?.symptom?.imageUrl !== '' && (
            <View
              style={{
                backgroundColor: theme.colors.white,
                borderRadius: 10,
                margin: 10,
                shadowColor: theme.colors.shadows,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                elevation: 6,
              }}
            >
              <Text
                style={{
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyBold,
                  color: theme.colors.grey2,
                  padding: 10,
                }}
              >
                {i18next.t('MYBOOKINGACT_SYMPTOM')}
              </Text>
              {booking?.symptom?.note !== '' && (
                <View
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    marginHorizontal: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                    borderColor: theme.colors.grey5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.fontSizeSmaller,
                      fontFamily: theme.fontFamilyDefault,
                      color: theme.colors.grey1,
                    }}
                  >
                    {booking?.symptom?.note}
                  </Text>
                </View>
              )}
              {booking?.symptom?.imageUrl !== '' && (
                <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                  <ImageViewerModal images={booking?.symptom?.imageUrl}>
                    <View
                      style={{
                        marginVertical: 5,
                        overflow: 'hidden',
                        borderRadius: 10,
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Image
                        source={{ uri: booking?.symptom?.imageUrl }}
                        style={{
                          width: '100%',
                          height: undefined,
                          aspectRatio: 135 / 76,
                          resizeMode: 'center',
                        }}
                      />
                    </View>
                  </ImageViewerModal>
                </View>
              )}
            </View>
          )}

        {booking && booking?.bookingCategory && (
          <PaymentSummaryCard
            bookingCategory={fromTo[booking.bookingCategory]}
            consultationPrice={
              booking?.bookingCategory === 'general' &&
              booking?.bookingType === 'Telepharmacy'
                ? 50
                : booking?.bookingCategory === 'general'
                ? 300
                : 0
            }
            shippingPrice={50}
            bookingData={booking}
          />
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    );
  };

  const VideoComponent = props => {
    const {
      status,
      videoTracks,
      isAudioEnabled,
      handleChatScreen,
      handleMuteButtonPress,
      handleFlipButtonPress,
    } = props;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            position: 'absolute',
            top: 10,
            zIndex: 2,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.grey5,
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 100,
            }}
            onPress={() => navigation.navigate('Home')}
          >
            <Icon
              name="chevron-down"
              type="font-awesome-5"
              size={theme.fontSizeLarge}
            />
          </TouchableOpacity>
        </View>
        {status === 'connected' && (
          <View style={styles.remoteGrid}>
            {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
              if (trackSid && trackIdentifier) {
                return (
                  <TwilioVideoParticipantView
                    style={styles.remoteVideo}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                );
              }
              return null;
            })}
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: theme.colors.grey1 + `50`,
            paddingHorizontal: 15,
            paddingVertical: 20,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChatScreen(prev => !prev)}
          >
            <View
              style={{
                backgroundColor: theme.colors.primary,
                width: 70,
                height: 70,
                borderRadius: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: theme.colors.shadows,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                elevation: 6,
              }}
            >
              <View style={{ position: 'absolute', top: -5, right: -5 }}>
                {!!unreadCount && <Badge status="error" value="New" />}
              </View>
              <Icon
                name="comment-dots"
                type="font-awesome-5"
                color={theme.colors.white}
                size={theme.fontSizeLargest}
              />
              <Text
                style={{
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyDefault,
                  color: theme.colors.white,
                }}
              >
                {i18next.t('VIDEOCALL_CHAT')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleMuteButtonPress}
          >
            <View
              style={{
                backgroundColor: theme.colors.primary,
                width: 70,
                height: 70,
                borderRadius: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: theme.colors.shadows,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                elevation: 6,
              }}
            >
              <Icon
                name={isAudioEnabled ? 'microphone' : `microphone-off`}
                type="material-community"
                color={theme.colors.white}
                size={theme.fontSizeLargest}
              />
              <Text
                style={{
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyDefault,
                  color: theme.colors.white,
                }}
              >
                {i18next.language == 'en'
                  ? isAudioEnabled
                    ? 'Mute'
                    : 'Unmute'
                  : 'ไมค์'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleFlipButtonPress}
          >
            <View
              style={{
                backgroundColor: theme.colors.primary,
                width: 70,
                height: 70,
                borderRadius: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: theme.colors.shadows,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                elevation: 6,
              }}
            >
              <Icon
                name="camera-party-mode"
                type="material-community"
                color={theme.colors.white}
                size={theme.fontSizeLargest}
              />
              <Text
                style={{
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyDefault,
                  color: theme.colors.white,
                }}
              >
                {i18next.t('VIDEOCALL_SWITCH')}
              </Text>
            </View>
          </TouchableOpacity>
          <TwilioVideoLocalView
            enabled={status === 'connected'}
            style={styles.localVideo}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={
          status === 'connected' ? 'transparent' : theme.colors.white
        }
      />
      <View style={{ flex: 1 }}>
        <Loading isVisible={isLoading} />
        {patientInWaiting || doctorNotePending ? (
          <WaitingScreen booking={booking} practitioner={practitioner} />
        ) : (
          <VideoComponent
            status={status}
            videoTracks={videoTracks}
            isAudioEnabled={isAudioEnabled}
            handleChatScreen={setChatScreen}
            handleMuteButtonPress={_onMuteButtonPress}
            handleFlipButtonPress={_onFlipButtonPress}
          />
        )}
        <TwilioVideo
          ref={twilioRef}
          onRoomDidConnect={_onRoomDidConnect}
          onRoomDidDisconnect={_onRoomDidDisconnect}
          onRoomDidFailToConnect={_onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        />
        <VideoCallMessages
          unreadCount={unreadCount}
          setUnreadCount={setUnreadCount}
          theme={theme}
          firebaseStatus={firebaseStatus}
          isVisible={chatShow}
          setVisible={setChatScreen}
          bookingId={booking.id}
        />
      </View>
    </SafeAreaView>
  );
}

export default VideoCall;
