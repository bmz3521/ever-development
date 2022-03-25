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
function District(props) {
  const { navigation, route } = props;
  const { province, district, paramPage } = route.params;
  const { selected } = paramPage;
  const { theme, Icon, onChangeAmphoe } = useHooks();
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
            {i18next.t('ADDRESS_DISTRICTS')}
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
          {district.map(item => (
            <ListData key={item}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SubDistrict', {
                    province: province,
                    district: item,
                    subDistrict: onChangeAmphoe(item),
                    paramPage: paramPage,
                    selected: selected ?? false,
                  })
                }
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      flex: 1,
                      fontFamily: theme.fontFamilyDefault,
                      fontSize: 16,
                    }}
                  >
                    {item}
                  </Text>
                  {item === selected?.district ? (
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

export default District;
