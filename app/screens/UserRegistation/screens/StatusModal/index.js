import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from '@components';
import { Icon, useTheme } from 'react-native-elements';
import { useHooks } from './hooks';
import useBaseStyles from '../../styles';
import i18next from 'i18next';

const SuccessModal = ({ route, navigation }) => {
  const params = route.params;
  const { actions } = useHooks({ navigation, route });
  const { theme } = useTheme();
  const baseStyles = useBaseStyles();
  return (
    <SafeAreaView
      forceInset={{ top: 'always' }}
      style={[
        baseStyles.centeredView,
        { marginTop: 0, paddingHorizontal: 0, flex: 1 },
      ]}
    >
      {params.error ? (
        <View style={[baseStyles.modalView, { justifyContent: 'center' }]}>
          <Icon
            type="font-awesome-5"
            name="times-circle"
            size={60}
            color={theme.colors.danger}
            style={{ marginVertical: 10 }}
          />
          <Text style={baseStyles.modalFailureTitle}>
            {params.message || i18next.t('USERREG_HADERROR')}
          </Text>

          <TouchableHighlight
            style={[
              baseStyles.openButton,
              {
                backgroundColor: theme.colors.danger,
                padding: 15,
                width: '100%',
              },
            ]}
            onPress={actions.handleModal}
          >
            <Text
              style={[
                baseStyles.titleDefault,
                { fontSize: 18, color: 'white', textAlign: 'center' },
              ]}
            >
              {i18next.t('USERREG_TRYAGAIN')}
            </Text>
          </TouchableHighlight>
        </View>
      ) : (
        <View style={[baseStyles.modalViewSuccess]}>
          <View style={baseStyles.congratsContainer}>
            <Icon
              name="check-circle"
              size={60}
              style={{ color: theme.colors.secondary, marginBottom: 20 }}
            />
            <Text style={baseStyles.modalSuccessTitle}>
              {i18next.t('SUCCESS_TITLE')}
            </Text>
            <Text style={baseStyles.modalSubtitle}>
              {i18next.t('USERREG_SUCCESS')}
            </Text>
            <Text
              style={[
                baseStyles.textDefault,
                { fontSize: 16, textAlign: 'center' },
              ]}
            >
              {i18next.t('USERREG_SUCCESS_CHECK')}
            </Text>
            <Text
              style={[
                baseStyles.textDefault,
                { fontSize: 14, marginTop: 10, color: theme.colors.grey1 },
              ]}
            >
              {i18next.t('USERREG_WAIT_VERIFICATION')}
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            bounces={false}
            style={baseStyles.thankyouContainer}
          >
            <Text style={[baseStyles.modalSuccessTitle]}>Ever Healthcare</Text>
            <Text
              style={[baseStyles.modalSubtitle, { color: theme.colors.grey3 }]}
            >
              {i18next.t('USERREG_THANK')}
            </Text>
            <TouchableOpacity
              style={{
                ...baseStyles.openButton,
                backgroundColor: theme.colors.primary,
                marginVertical: 30,
                padding: 15,
                marginHorizontal: 20,
              }}
              onPress={actions.handleModal}
            >
              <Text
                style={[
                  baseStyles.titleDefault,
                  { fontSize: 18, color: 'white', textAlign: 'center' },
                ]}
              >
                {i18next.t('USERREG_RETURN_HOMEPAGE')}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SuccessModal;
