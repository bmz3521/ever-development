import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import LastImagePreview from '../../components/LastImagePreview';
import useBaseStyles from '../../styles';
import { useHooks } from './hooks';
import { useTheme } from 'react-native-elements';
import i18next from 'i18next';
// import { Text } from '@components';

const SendRegisterForm = ({ navigation }) => {
  const baseStyles = useBaseStyles();
  const { theme } = useTheme();
  const { loading, hookData, actions } = useHooks({ navigation });
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.black} />
          <Text
            style={[
              baseStyles.titleDefault,
              {
                fontSize: 18,
                textAlign: 'center',
                color: theme.colors.grey1,
              },
            ]}
          >
            {i18next.t('USERREG_REGISTER_ACCOUNT')}
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ backgroundColor: 'white', flex: 1 }}
          style={{ backgroundColor: 'white', height: '100%' }}
        >
          <View style={{ marginHorizontal: 15, marginTop: 30 }}>
            <Text
              style={[
                baseStyles.titleDefault,
                {
                  fontSize: 20,
                  textAlign: 'center',
                },
              ]}
            >
              {i18next.t('USERREG_VERIFY_PIC')}
            </Text>
          </View>

          {hookData.uploaded && (
            <LastImagePreview
              editHandler={() => actions.editImageHandler(false)}
              containerStyles={{ marginTop: 50 }}
              title={i18next.t('USERREG_CHECK_LIGHT')}
              subtitle={i18next.t('USERREG_PIC_WIDCARD3')}
              description={i18next.t('USERREG_RULE_VERIFICATION')}
              photoImage={hookData.uploaded}
            />
          )}
          {hookData.uploadedIdCard && (
            <LastImagePreview
              editHandler={() => actions.editImageHandler(true)}
              containerStyles={{ marginTop: 20 }}
              title={i18next.t('USERREG_CHECK_IDCARD')}
              subtitle={i18next.t('USERREG_PIC_WIDCARD4')}
              description={i18next.t('USERREG_WARNING_IDCARD')}
              photoImage={hookData.uploadedIdCard}
            />
          )}
          <View style={baseStyles.btnContainer}>
            <TouchableOpacity
              disabled={loading}
              onPress={actions.registerUser}
              style={baseStyles.btnSubmit}
            >
              <Text style={baseStyles.actionBtn}>
                {i18next.t('USERREG_CONFIRM_DATA')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default SendRegisterForm;
