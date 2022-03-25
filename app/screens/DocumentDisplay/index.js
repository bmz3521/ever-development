import React, { useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Divider, useTheme } from 'react-native-elements';
import { Header, SafeAreaView } from '@components';
import styles from './styles';
import { BaseStyle } from '@config';
import i18next from 'i18next';

const DocumentDisplay = ({ navigation, route }) => {
  const { theme } = useTheme();
  const LabComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles(theme).labCardTitle}>
          <View style={styles(theme).presListTitle}>
            <Text style={[styles(theme).titleText, { fontSize: 16 }]}>
              {route.params.type}
            </Text>
          </View>
          <Divider style={{ ...styles(theme).dividerCard, marginTop: 0 }} />

          <View style={[styles(theme).presListHead, { marginVertical: 10 }]}>
            <Text bold style={[styles(theme).presName]}>
              {i18next.t('HISTORYDETAIL_LAB_LIST')}
            </Text>
            <Text
              bold
              style={[styles(theme).presName, { textAlign: 'center' }]}
            >
              {i18next.t('HISTORYDETAIL_LAB_RESULT')}
            </Text>
            <Text bold style={[styles(theme).presName, { textAlign: 'right' }]}>
              {i18next.t('HISTORYDETAIL_LAB_NORM')}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles(theme).labCardBody}>
            <ScrollView
              contentContainerStyle={{ paddingVertical: 10, flexGrow: 1 }}
            >
              {route.params.data.map((item, index) => (
                <View style={{ paddingHorizontal: 10 }} key={index}>
                  <View key={index} style={styles(theme).presListHead}>
                    <Text bold style={styles(theme).presDes}>
                      {item.name}
                    </Text>
                    <Text
                      bold
                      style={[styles(theme).presDes, { textAlign: 'center' }]}
                    >
                      {item.result ? item.result : '-'}
                    </Text>
                    <Text
                      bold
                      style={[styles(theme).presDes, { textAlign: 'right' }]}
                    >
                      {item.ref ? item.ref : '-'}
                    </Text>
                  </View>

                  {index + 1 !== route.params.data.length && (
                    <Divider
                      style={{
                        marginBottom: 15,
                        marginTop: 5,
                        color: '#40424B',
                      }}
                    />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  const drugUsage = useCallback(drugUsage => {
    if (!drugUsage) return null;
    return (
      <View style={styles(theme).drugUsageContainer}>
        <Text style={styles(theme).labelText}>วิธีใช้</Text>
        <Text style={styles(theme).despText}>{drugUsage}</Text>
      </View>
    );
  }, []);

  const DrugComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles(theme).cardContainer}>
          <ScrollView
            style={{ flexGrow: 1 }}
            contentContainerStyle={{
              marginHorizontal: 10,
              paddingVertical: 10,
              flexGrow: 1,
            }}
          >
            {route.params.data.map((item, index) => (
              <View key={index} style={{ padding: 10 }}>
                <View style={styles(theme).labelDrug}>
                  <Text style={styles(theme).presName}>
                    {item.drugNondugName}
                  </Text>
                  <Text style={styles(theme).despText}>{`${
                    item.qty
                  } (${i18next.t('HISTORYDETAIL_PCS')})`}</Text>
                </View>
                {drugUsage(item.drugUsage)}
                {index !== route.params.data.length - 1 && (
                  <Divider style={styles(theme).dividerCard} />
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header onPressLeft={() => navigation.pop()} text={route.params.title} />
      <View style={styles(theme).container}>
        {route.params?.lab ? <LabComponent /> : <DrugComponent />}
      </View>
    </SafeAreaView>
  );
};

export default DocumentDisplay;
