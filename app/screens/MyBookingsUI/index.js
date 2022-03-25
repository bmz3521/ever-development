import React from 'react';
import { View } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { BaseColor } from '@config';
import { Text, Loading2, Header } from '@components';
import styles from './styles';
import TreatmentStatus from './treatmentStatus';
import { useHooks } from './hooks';
import Timeline from './Timeline/Timeline';
import TeleMed from './TeleMed/TeleMed';
import i18next from 'i18next';

const routes = [
  { key: 'telemed', title: 'MYBOOKINGUI_ONLINE' },
  { key: 'visit', title: 'MYBOOKINGUI_HOSPITAL' },
];

const _renderTabBar = tabBorder => props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: 'transparent',
    }}
    style={styles.tabbar}
    tabStyle={styles.tab}
    inactiveColor="#000"
    activeColor="#fff"
    renderLabel={({ route, focused, color }) => (
      <View
        style={{
          backgroundColor: focused ? '#f5f5f5' : 'white',
          height: 35,
          width: 'auto',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}
      >
        <Text
          bold
          semibold={focused}
          style={{
            color: focused ? '#00bae5' : 'grey',
            fontSize: 16,
            fontFamily:
              i18next.language == 'en'
                ? 'CircularStd-Book'
                : 'NotoSansThai-Regular',
          }}
        >
          {i18next.t(route.title)}
        </Text>
      </View>
    )}
  />
);

function MyBookingsUI({ navigation, route }) {
  const {
    appointmentList,
    actions,
    loadingHie,
    loadingBooking,
    refreshing,
    refreshingHie,
    activeBooking,
    completedBooking,
    index,
  } = useHooks({ navigation, route });

  const _renderScene = (treatmentStatus, dataHie) => ({ route }) => {
    switch (route.key) {
      case 'telemed':
        return (
          <TeleMed
            navigation={navigation}
            refreshing={refreshing}
            actions={actions}
            activeBooking={activeBooking}
            completedBooking={completedBooking}
            loading={loadingBooking}
          />
        );
      case 'visit':
        return (
          <Timeline
            data={dataHie}
            loading={loadingHie}
            onRefresh={actions.onRefreshHie}
            refreshing={refreshingHie}
            lineStyle={{
              width: 0,
              borderWidth: 1.21,
              borderRadius: 10,
              borderColor: BaseColor.darkPrimaryColor,
            }}
            onEndReached={actions.getMoreHieAppointments}
            eventStyle={{
              marginBottom: 0,
            }}
            contentContainerStyle={{ borderTopLeftRadius: 15 }}
          />
        );
    }
  };

  const treatmentStatus = <TreatmentStatus navigation={navigation} />;
  return (
    <View style={{ flex: 1 }} forceInset={{ top: 'always' }}>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Header text={i18next.t('MYBOOKINGUI_BOOKINGS')} />
        {loadingBooking || loadingHie ? (
          <Loading2 />
        ) : (
          <TabView
            style={{ flex: 1 }}
            navigationState={{ index, routes }}
            renderScene={_renderScene(treatmentStatus, appointmentList)}
            renderTabBar={_renderTabBar(index)}
            onIndexChange={num => {
              actions.setIndex(num);
            }}
          />
        )}
      </View>
    </View>
  );
}

export default MyBookingsUI;
