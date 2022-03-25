import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { BaseStyle } from '@config';
import { SafeAreaView } from '@components';
import { Container, Content, Header, Page, ListData } from './styles';
import { useHooks } from './hook';
import i18next from 'i18next';
function SubDistrict(props) {
  const { navigation, route } = props;
  const { province, district, subDistrict, paramPage } = route.params;
  const { callBack, pageCallback, editType, selected } = paramPage;
  const { theme, Icon, onChangeDistrict } = useHooks();
  console.log('callBack , paramPage ===', callBack, paramPage);
  return (
    <Page>
      <Header>
        <View>
          <Text
            style={{
              fontFamily: theme.fontFamilyBold,
              fontSize: theme.fontSizeDefault,
              textAlign: 'center',
            }}
          >
            {i18next.t('ADDRESS_SUBDISTRICTS')}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <View>
            <Icon name="chevron-left" color={theme.colors.grey3} size={30} />
          </View>
        </TouchableOpacity>
      </Header>
      <Content>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {subDistrict.map(item => (
            <ListData key={item}>
              <TouchableOpacity
                onPress={() => {
                  const data = {
                    province: province,
                    district: district,
                    subDistrict: item,
                    postalCode: onChangeDistrict(item)[0],
                  };
                  callBack(data);
                  navigation.navigate(pageCallback, { editType });
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontFamily: theme.fontFamilyDefault,
                      fontSize: 16,
                      flex: 1,
                    }}
                  >
                    {item}
                  </Text>
                  {item === selected?.subDistrict ? (
                    <Icon
                      name="check"
                      size={24}
                      color={theme.colors.secondary}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            </ListData>
          ))}
        </ScrollView>
      </Content>
    </Page>
  );
}

export default SubDistrict;
