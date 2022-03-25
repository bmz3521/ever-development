import React, { useEffect, useState, useRef } from 'react';
import {
  StatusBar,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Avatar, Badge, Icon, useTheme } from 'react-native-elements';
import { Header, Text, SafeAreaView, ModalSaveList } from '@components';
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header';
import { HFlatList } from 'react-native-head-tab-view';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import _ from 'lodash';
import Loading from '@components/Loading';
import { Images } from '@config';
import { useHooks } from './hooks';
import styles from './styles';
import i18next from 'i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ClinicCard from './components/ClinicCard';

const FilterListingScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { doctorType } = route.params;

  const {
    doctors,
    clinics,
    clinicPackages,
    practitionerRefreshing,
    practitionerIsLoading,
    clinicRefreshing,
    clinicIsLoading,
    clinicPackageRefreshing,
    clinicPackageIsLoading,
    searchText,
    savelist,
    events,
  } = useHooks({
    doctorType,
    navigation,
  });

  const saveListRef = useRef();

  const _renderScrollableTabBar = tabbarProps => {
    const lng = i18next.language;
    const fontFamily = lng === `en` ? `CircularStd-Bold` : `NotoSansThai-Bold`;
    return (
      <ScrollableTabBar
        {...tabbarProps}
        textStyle={{ fontSize: 20, fontFamily: fontFamily }}
        style={{
          backgroundColor: theme.colors.white,
          borderWidth: 0,
          height: 50,
        }}
      />
    );
  };

  const ImageComponent = props => {
    return <Image {...props} />;
  };
  const ImageMemo = React.memo(ImageComponent);

  const DoctorCardComponent = props => {
    const { doctor, index } = props;
    return (
      <TouchableOpacity
        key={index}
        style={styles(theme).doctorCard}
        onPress={() => events.handlePressDoctorCard(doctor)}
      >
        <View style={styles(theme).doctorAvatarContainer}>
          <View>
            <Avatar
              source={
                doctor?.imageUrl
                  ? {
                      uri: `${doctor?.imageUrl}`,
                    }
                  : Images.DoctorPlaceholder
              }
              containerStyle={{
                backgroundColor: '#c0c0c0',
              }}
              size="medium"
              rounded
            />
          </View>
        </View>
        <View style={styles(theme).doctorInfoContainer}>
          <View style={styles(theme).doctorNameContainer}>
            <Text style={styles(theme).doctorName}>
              {`${doctor?.title ? doctor?.title : ''}${doctor?.firstName} ${
                doctor?.lastName
              }`}
            </Text>
          </View>
          {doctor?.expertAt && (
            <Text style={styles(theme).detail}>{doctor?.expertAt}</Text>
          )}

          {doctor?.graduatedFrom && (
            <View style={styles(theme).firstIconRow}>
              <Icon
                type="ionicon"
                name="school"
                size={16}
                color={theme.colors.primary}
              />
              <Text style={styles(theme).detail}>{doctor?.graduatedFrom}</Text>
            </View>
          )}
          {doctor?.hospitalName && (
            <View style={styles(theme).iconRow}>
              <Icon
                type="ionicon"
                name="location"
                size={16}
                color={theme.colors.primary}
              />
              <Text style={styles(theme).detail}>{doctor?.hospitalName}</Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              marginTop: 5,
            }}
          >
            {doctor?.specialty &&
              doctor?.specialty?.map((item, index) => (
                <Badge
                  key={index}
                  value={item}
                  badgeStyle={{
                    backgroundColor: theme.colors.secondary,
                    borderRadius: 5,
                  }}
                  textStyle={{ fontFamily: 'Prompt-Medium' }}
                  containerStyle={{ margin: 2 }}
                />
              ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const DocterCard = React.memo(DoctorCardComponent);

  // const ClinicCardComponent = props => {
  //   const { clinic, index } = props;
  //   return (
  //     <TouchableOpacity
  //       onPress={() =>
  //         navigation.navigate('ClinicProfile', { clinicId: clinic.id })
  //       }
  //     >
  //       <View key={index} style={styles(theme).clinicCardContainer}>
  //         <View style={styles(theme).clinicImageContainer}>
  //           <ImageMemo
  //             resizeMode="cover"
  //             source={{
  //               uri: `${clinic.featureImageM}`,
  //             }}
  //             style={{ width: '100%', height: '100%' }}
  //           />
  //           <TouchableOpacity
  //             style={{ position: 'absolute', top: 15, right: 20 }}
  //             onPress={() => {
  //               saveListRef.current.show({ clinicId: clinic.id });
  //             }}
  //           >
  //             <View
  //               style={{
  //                 backgroundColor: 'rgba(255,255,255, 0.8)',
  //                 padding: 5,
  //                 borderRadius: 50,
  //               }}
  //             >
  //               <Ionicons name="heart-outline" size={20} />
  //             </View>
  //           </TouchableOpacity>
  //         </View>
  //         <View style={styles(theme).clinicInfoContainer}>
  //           <View style={styles(theme).clinicDetailContainer}>
  //             <View style={styles(theme).clinicNameContainer}>
  //               <Text style={styles(theme).clinicName}>{clinic.name}</Text>
  //             </View>
  //             <View style={styles(theme).iconRow}>
  //               <Icon
  //                 type="ionicon"
  //                 name="location-outline"
  //                 size={20}
  //                 color={theme.colors.primary}
  //               />
  //               <Text style={styles(theme).detail}>
  //                 {`${clinic.country}, ${clinic.city}`}
  //               </Text>
  //             </View>
  //           </View>
  //           <View style={styles(theme).ratingReviewContainer}>
  //             <View style={styles(theme).ratingContainer}>
  //               <Icon type="ionicon" name="star" size={20} color="#ffcd3c" />
  //               <Text style={styles(theme).ratingText}>{5.0}</Text>
  //             </View>
  //             <View style={styles(theme).reviewContainer}>
  //               <Text style={styles(theme).reviewText}>{`2,233 Reviews`}</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  // const ClinicCard = React.memo(ClinicCardComponent);

  const ClinicPackageCardComponent = props => {
    const { clinicPackage, index } = props;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ClinicPackageProfile', {
            clinicPackageId: clinicPackage.id,
            clinicId: clinicPackage.clinicId,
          })
        }
      >
        <View key={index} style={styles(theme).clinicPackageCardContainer}>
          <View style={styles(theme).clinicImageContainer}>
            <ImageMemo
              resizeMode="cover"
              source={{
                uri: `${clinicPackage.Photo1}`,
              }}
              style={{ width: '100%', height: '100%' }}
            />
            {/* <TouchableOpacity
              style={{ position: 'absolute', top: 15, right: 20 }}
              onPress={() => {
                saveListRef.current.show();
                saveListRef.current.data({ clinicId: clinicPackage.clinicId });
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
            </TouchableOpacity> */}
          </View>
          <View style={{ padding: 10 }}>
            <Text type="h6" style={{ color: theme.colors.grey1 }}>
              {clinicPackage.name}
            </Text>

            <View style={{ marginTop: 8 }}>
              {clinicPackage.discountedPrice !== 0 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginRight: 4 }}>
                    <Text
                      type="body4"
                      style={{
                        color: theme.colors.grey2,
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                      }}
                    >{`$${clinicPackage.maxPrice} `}</Text>
                  </View>

                  <Text type="h6" style={{ color: theme.colors.grey1 }}>
                    {`$${clinicPackage.discountedPrice}`}
                  </Text>
                  <Text type="h6" style={{ color: theme.colors.grey1 }}>
                    {` / person`}
                  </Text>
                </View>
              ) : clinicPackage.discountedPrice == 0 &&
                clinicPackage.maxPrice == 0 ? (
                <View>
                  <Text type="body4" style={{ color: theme.colors.grey1 }}>
                    Please Enquire
                  </Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Text type="h6" style={{ color: theme.colors.grey1 }}>
                    {`$${clinicPackage.maxPrice}`}
                  </Text>
                  <Text
                    type="h6"
                    style={{ color: theme.colors.grey1 }}
                  >{`/ person`}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const CLinicPackageCard = React.memo(ClinicPackageCardComponent);

  return (
    <SafeAreaView style={{ flexGrow: 1 }} forceInset={{ top: 'always' }}>
      {/* <Loading isVisible={loading} /> */}
      <ModalSaveList ref={saveListRef} enableBackdropDismiss />
      <CollapsibleHeaderTabView
        showsVerticalScrollIndicator={false}
        tabBarTextStyle={{
          fontSize: theme.fontSizeDefault,
          fontFamily: theme.fontFamilyDefault,
        }}
        tabBarActiveTextColor={theme.colors.secondary}
        renderTabBar={_renderScrollableTabBar}
        tabBarUnderlineStyle={{
          backgroundColor: theme.colors.secondary,
          borderRadius: 2,
        }}
        renderScrollHeader={() => (
          <Header
            text={i18next.t('FILTERLIST_LISTING')}
            subText={doctorType.name}
            onPressLeft={() => navigation.goBack()}
          />
        )}
        onIndexChange={events.setIndex}
      >
        <HFlatList
          renderRefreshControl={() => (
            <View>
              <ActivityIndicator size={'large'} color={theme.colors.grey4} />
            </View>
          )}
          onStartRefresh={events.onPractitionerRefresh}
          isRefreshing={practitionerRefreshing}
          lazy={true}
          index={0}
          tabLabel={i18next.t('FILTERLIST_DOCTORS')}
          style={{ backgroundColor: theme.colors.white, padding: 10, flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={doctors}
          renderItem={({ item, index }) => (
            <DocterCard doctor={item} index={index} key={index} />
          )}
          onEndReached={events.fetchDoctorList}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={1000}
          ListEmptyComponent={
            practitionerIsLoading ? null : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Text type="h5">{i18next.t('FILTERLIST_NODOCTORS')}</Text>
                <Text type="subTitle3">
                  {i18next.t('FILTERLIST_INCOVENIENCE')}
                </Text>
              </View>
            )
          }
          ListFooterComponent={() => {
            if (practitionerIsLoading && !practitionerRefreshing)
              return (
                <ActivityIndicator
                  size="large"
                  style={{ marginVertical: 10 }}
                  color={theme.colors.grey4}
                />
              );
            return <></>;
          }}
        />
        <HFlatList
          renderRefreshControl={() => (
            <View>
              <ActivityIndicator size={'large'} color={theme.colors.grey4} />
            </View>
          )}
          onStartRefresh={events.onClinicRefresh}
          isRefreshing={clinicRefreshing}
          lazy={true}
          index={1}
          tabLabel={i18next.t('FILTERLIST_CLINICS')}
          style={{ backgroundColor: theme.colors.white, padding: 10, flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={clinics}
          renderItem={({ item, index }) => (
            <ClinicCard
              clinic={item}
              index={index}
              key={index}
              navigation={navigation}
              savelist={savelist}
              onPressModal={() => {
                saveListRef.current.show({
                  clinicId: item.id,
                });
              }}
            />
          )}
          onEndReached={events.fetchClinicList}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={1000}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Text type="h5">{i18next.t('FILTERLIST_NOCLINICS')}</Text>
              <Text type="subTitle3">
                {i18next.t('FILTERLIST_INCOVENIENCE')}
              </Text>
            </View>
          }
          ListFooterComponent={() => {
            if (clinicIsLoading && !clinicRefreshing)
              return (
                <View>
                  <ActivityIndicator
                    size="large"
                    style={{ marginTop: 10 }}
                    color={theme.colors.grey4}
                  />
                </View>
              );
            return null;
          }}
        />
        <HFlatList
          renderRefreshControl={() => (
            <View>
              <ActivityIndicator size={'large'} color={theme.colors.grey4} />
            </View>
          )}
          onStartRefresh={events.onClinicPackageRefresh}
          isRefreshing={clinicPackageRefreshing}
          lazy={true}
          index={2}
          tabLabel={i18next.t('FILTERLIST_CLINICPACKAGES')}
          style={{ backgroundColor: theme.colors.white, padding: 10, flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={clinicPackages}
          renderItem={({ item, index }) => (
            <CLinicPackageCard clinicPackage={item} index={index} key={index} />
          )}
          onEndReached={events.fetchClinicPackageList}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={1000}
          ListEmptyComponent={
            clinicPackageIsLoading ? null : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <Text type="h5">
                  {i18next.t('FILTERLIST_NOCLINICPACKAGES')}
                </Text>
                <Text type="subTitle3">
                  {i18next.t('FILTERLIST_INCOVENIENCE')}
                </Text>
              </View>
            )
          }
          ListFooterComponent={() => {
            if (clinicPackageIsLoading && !clinicPackageRefreshing)
              return (
                <View>
                  <ActivityIndicator
                    size="large"
                    style={{ marginTop: 10 }}
                    color={theme.colors.grey4}
                  />
                </View>
              );
            return null;
          }}
        />
      </CollapsibleHeaderTabView>
    </SafeAreaView>
  );
};

export default FilterListingScreen;
