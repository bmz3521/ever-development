import React, { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, Text } from '@components';
import useHooks from './hooks';
import { BaseStyle } from 'app/theme-config';
import { useTheme, Icon } from 'react-native-elements';
import useStyles from './styles';
import ProcedureListItem from './components/ProcedureListItem';

const ProcedureListSelect = ({ navigation, route }) => {
  const { theme } = useTheme();
  const baseStyles = useStyles();
  const {
    title,
    dataFilter,
    from,
    searchField,
    selectedProcedures,
    actions,
  } = useHooks({ navigation, route });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <View style={baseStyles.container}>
        {/* header Section */}
        <View style={baseStyles.headerWrapper}>
          <Text type="buttonLarge" style={baseStyles.headerText}>
            {title}
          </Text>
          <TouchableOpacity
            style={baseStyles.headerIcon}
            onPress={() => navigation.goBack()}
          >
            <Icon
              type="material-community"
              name="close"
              color={theme.colors.grey3}
              size={25}
            />
          </TouchableOpacity>
        </View>

        {/* search section */}
        {from !== 'selectList' && (
          <View style={baseStyles.searchContainer}>
            <View style={baseStyles.searchWrapper}>
              <TextInput
                placeholder="Search All Clinic Procedures"
                placeholderStyle={baseStyles.placeholderStyle}
                value={searchField}
                onChangeText={actions.setSearchField}
                style={{ flex: 1 }}
              />
              <Icon
                name="search"
                color={theme.colors.grey4}
                size={25}
                style={{ padding: 5 }}
              />
            </View>
          </View>
        )}

        {/* List Section */}
        <FlatList
          data={dataFilter}
          renderItem={({ item }) => (
            <ProcedureListItem
              procedure={item}
              actions={actions}
              selected={selectedProcedures?.some(p => p.id === item.id)}
              selectedProcedures={selectedProcedures}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Bottom Section */}
      <View style={[baseStyles.footer]}>
        <TouchableOpacity
          style={[
            baseStyles.bottomBtn,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
          onPress={actions.onConfirm}
        >
          <Text type="buttonLarge" style={baseStyles.bottomBtnText}>
            {'ยืนยัน'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProcedureListSelect;
