import { View, FlatList } from 'react-native';
import React from 'react';
import { BaseStyle } from 'app/theme-config';
import useHooks from './hooks';
import useStyles from './styles';
import { Avatar } from 'react-native-elements';
import { Header, SafeAreaView, Text } from '@components';

const DoctorList = ({ navigation, route }) => {
  const { doctors } = useHooks({ navigation, route });
  const baseStyles = useStyles();

  const renderItem = ({ item }) => {
    return (
      <View key={item.doctorId} style={baseStyles.doctorCardWrapper}>
        <View style={baseStyles.avatarWrapper}>
          <Avatar
            source={{
              uri: item.imgProfile,
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
          >{`Dr. ${item.firstName} ${item.lastName}`}</Text>

          <Text type="body5">{item.doctorTitle}</Text>
          <View style={baseStyles.specialtyListWrapper}>
            {item.specialities.slice(0, 2).map((specialty, index) => (
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
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header text="Doctor List" onPressLeft={() => navigation.goBack()} />
      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default DoctorList;
