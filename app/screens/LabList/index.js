import React from 'react';
import { Header, SafeAreaView } from '@components';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme, Icon } from 'react-native-elements';
import { BaseStyle } from '@config';
import styles from './styles';
import { useHooks } from './hooks';
import i18next from 'i18next';

const LabList = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { data } = route.params;
  const { actions } = useHooks({ navigation });

  const renderLab = (lab, index) => {
    const isAvailable = lab.data.length > 0;
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={isAvailable ? 0.2 : 1}
        style={styles(theme).labContainer}
        onPress={() => (isAvailable ? actions.onlabPress(lab) : null)}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: theme.fontFamilyDefault }}>
            {lab.data.length ?? 0}
          </Text>
          <Text style={{ fontFamily: theme.fontFamilyDefault }}>items</Text>
        </View>
        <Text style={styles(theme).labType}>{lab.type}</Text>
        {isAvailable ? (
          <Icon style={styles(theme).labIcon} name="chevron-right" />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        onPressLeft={() => navigation.pop()}
        text={i18next.t('HISTORYDETAIL_LABRESULT')}
      />
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <View style={styles(theme).cardContainer}>
          <ScrollView style={styles(theme).innerScrollView}>
            {data.map(renderLab)}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LabList;
