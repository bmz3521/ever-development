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
import {
  Container,
  Content,
  Header,
  Page,
  TextPress,
  ListData,
} from './styles';
import { useHooks } from './hook';
import i18next from 'i18next';
function Province(props) {
  const { navigation, route } = props;
  const paramPage = route.params;
  const { selected } = paramPage;
  const { theme, Icon, provinces, onChangeProvince } = useHooks('');
  console.log('paramPage =====', paramPage);
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
            {i18next.t('ADDRESS_PROVINCE')}
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
          {provinces.map(item => (
            <ListData key={item}>
              <TextPress
                onPress={() => {
                  navigation.navigate('District', {
                    province: item,
                    district: onChangeProvince(item),
                    paramPage: paramPage,
                    selected: selected ?? false,
                  });
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
                  {item === selected?.province ? (
                    <Icon
                      name="check"
                      size={24}
                      color={theme.colors.secondary}
                    />
                  ) : null}
                </View>
              </TextPress>
            </ListData>
          ))}
        </ScrollView>
      </Content>
    </Page>
  );
}

export default Province;
