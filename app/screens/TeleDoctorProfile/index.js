import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { BaseStyle } from '@config';
import { SafeAreaView } from '@components';
import { Icon, Avatar, Divider, Button, useTheme } from 'react-native-elements';
import { Header } from '@components';
import { Loading } from '@components';
import { Images } from 'app/theme-config';
import i18next from 'i18next';

function TeleDoctorProfile({ route, navigation }) {
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = React.useState(true);
  const { practitionerType, practitioner } = route.params;
  const { theme } = useTheme();

  const _handleBookingButton = () => {
    const data = {
      consultCaseType: '#087951',
      practitionerType,
      practitioner,
    };
    if (!auth.isAuthenticated) {
      navigation.navigate('AuthStack', { screen: 'SignIn' });
      return;
    }
    navigation.navigate('Appointment', data);
  };

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Loading isVisible={loading} />
      <Header
        text={i18next.t('TELEDOCTOR_INFO')}
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: theme.colors.white }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              flexDirection: 'row',
            }}
          >
            <View style={{ padding: 5 }}>
              <Avatar
                rounded
                source={
                  practitioner?.imageUrl
                    ? {
                        uri: `${practitioner?.imageUrl}`,
                      }
                    : Images.DoctorPlaceholder
                }
                size="large"
              />
            </View>
            <View
              style={{
                padding: 5,
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: theme.fontFamilyBold,
                  fontSize: theme.fontSizeDefault,
                }}
              >{`${practitioner?.title ? practitioner?.title : ''}${
                practitioner?.firstName
              } ${practitioner?.lastName}`}</Text>
              <Text
                style={{
                  fontFamily: theme.fontFamilyDefault,
                  fontSize: theme.fontSizeSmaller,
                  color: theme.colors.grey3,
                }}
              >{`${practitionerType.name}`}</Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1, paddingBottom: 5 }}>
              <Button
                onPress={_handleBookingButton}
                title={i18next.t('TELEDOCTOR_BOOKING')}
                buttonStyle={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 10,
                }}
                titleStyle={{
                  fontFamily: theme.fontFamilyBold,
                  fontSize: theme.fontSizeDefault,
                }}
              />
            </View>
          </View>

          <View style={{ paddingHorizontal: 15 }}>
            <Divider orientation="horizontal" width={1} />
          </View>

          <View
            style={{
              marginHorizontal: 15,
            }}
          >
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {practitioner?.graduatedFrom && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 3,
                    marginBottom: 10,
                  }}
                >
                  <Icon
                    type="ionicon"
                    name="school"
                    size={18}
                    color={theme.colors.primary}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      fontSize: theme.fontSizeSmaller,
                      fontFamily: theme.fontFamilyDefault,
                    }}
                  >
                    {practitioner?.graduatedFrom}
                  </Text>
                </View>
              )}
              {practitioner?.hospitalName && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 3,
                    marginBottom: 5,
                  }}
                >
                  <Icon
                    type="ionicon"
                    name="location"
                    size={18}
                    color={theme.colors.primary}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={{
                      fontSize: theme.fontSizeSmaller,
                      fontFamily: theme.fontFamilyDefault,
                    }}
                  >
                    {practitioner?.hospitalName}
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                flexWrap: 'wrap',
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {practitioner?.specialty &&
                practitioner?.specialty?.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: theme.colors.secondary,
                      borderRadius: 10,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: theme.fontFamilyDefault,
                        fontSize: theme.fontSizeSmaller,
                        color: theme.colors.white,
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.white,
            paddingHorizontal: 15,
            flex: 1,
            flexShrink: 1,
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <View style={{ marginVertical: 15 }}>
            <Text
              style={{
                fontSize: theme.fontSizeDefault,
                fontFamily: theme.fontFamilyBold,
              }}
            >
              {i18next.t('TELEDOCTOR_ABOUT')}
            </Text>
            <Text
              style={{
                fontSize: theme.fontSizeSmall,
                fontFamily: theme.fontFamilyDefault,
                color: theme.colors.grey3,
              }}
            >
              {practitioner?.bio}
            </Text>
          </View>
          <Divider orientation="horizontal" width={1} />
          {practitioner?.professionalBackground &&
            practitioner?.professionalBackground?.length > 0 && (
              <View style={{ marginVertical: 15 }}>
                <Text
                  style={{
                    fontSize: theme.fontSizeDefault,
                    fontFamily: theme.fontFamilyBold,
                  }}
                >
                  {i18next.t('TELEDOCTOR_EXPERIENCE')}
                </Text>
                {practitioner?.professionalBackground.map((item, index) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: theme.fontSizeSmall,
                      fontFamily: theme.fontFamilyDefault,
                      color: theme.colors.grey3,
                    }}
                  >
                    <Text style={{ color: theme.colors.grey3 }}>{` •  `}</Text>
                    {`${item}`}
                  </Text>
                ))}
              </View>
            )}
          <Divider orientation="horizontal" width={1} />
          <View style={{ marginVertical: 15 }}>
            <Text
              style={{
                fontSize: theme.fontSizeDefault,
                fontFamily: theme.fontFamilyBold,
              }}
            >
              {i18next.t('TELEDOCTOR_EDUCATION')}
            </Text>
            {practitioner?.educationalBackground.map((item, index) => (
              <Text
                key={index}
                style={{
                  fontSize: theme.fontSizeSmall,
                  fontFamily: theme.fontFamilyDefault,
                  color: theme.colors.grey3,
                }}
              >
                <Text style={{ color: theme.colors.grey3 }}>{` •  `}</Text>
                {item}
              </Text>
            ))}
          </View>
          <Divider orientation="horizontal" width={1} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TeleDoctorProfile;
