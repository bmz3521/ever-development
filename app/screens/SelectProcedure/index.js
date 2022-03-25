import React, { useState } from 'react';
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Button, Text } from '@components';
import { useTheme, Icon } from 'react-native-elements';
import useStyles from './styles';
import useHooks from './hooks';
import ProcedureCard from './components/ProcedureCard';

function SelectProcedure({ route, navigation }) {
  const { theme } = useTheme();
  const baseStyles = useStyles();
  const {
    clinic,
    timeFormat,
    procedureGroup,
    selectedList,
    actions,
  } = useHooks({
    navigation,
    route,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        text="Select your procedures"
        renderRight={() => {
          return (
            <TouchableOpacity onPress={actions.onReset}>
              <Text type="buttonSmall">Reset</Text>
            </TouchableOpacity>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      {/* Content section */}
      <View style={{ flex: 1 }}>
        {/* TopSection */}
        <View style={{ marginHorizontal: 20 }}>
          {/* result container */}
          <View style={[baseStyles.resultContainer]}>
            <View style={[baseStyles.result]}>
              <Text type="body2">{timeFormat}</Text>
            </View>
          </View>
          {/* search component */}
          <TouchableOpacity
            style={baseStyles.search}
            onPress={() =>
              navigation.navigate('ProcedureListSelect', {
                title: 'Search All Clinic Procedures',
                procedures: clinic.Procedures,
                from: 'search',
                selectedList,
              })
            }
          >
            <TextInput
              placeholder="Search All Clinic Procedures"
              placeholderStyle={{
                fontFamily: theme.fontFamilyDefault,
                color: theme.colors.grey4,
              }}
              editable={false}
              style={{ flex: 1 }}
            />
            <Icon
              name="search"
              color={theme.colors.grey4}
              size={25}
              style={{ padding: 5 }}
            />
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <ScrollView style={{ flexGrow: 1 }}>
          {/* Procedure Group */}
          <View style={{ marginTop: 20 }}>
            {Object.keys(procedureGroup).map((procedureTitle, index) => (
              <ProcedureCard
                key={index}
                order={index}
                procedureGroup={procedureGroup}
                procedureTitle={procedureTitle}
                navigation={navigation}
                selectedList={selectedList}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Bottom Section */}
      <View style={[baseStyles.footer]}>
        <TouchableOpacity
          style={[
            baseStyles.bottomBtn,
            {
              backgroundColor: selectedList.length > 0
                ? theme.colors.primary
                : theme.colors.grey5,
            },
          ]}
          onPress={actions.onNext}
        >
          <Text
            type="buttonLarge"
            style={
              selectedList.length > 0 ? baseStyles.bottomBtnText : baseStyles.bottomBtnTextDis
            }
          >
            {'ถัดไป'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SelectProcedure;
