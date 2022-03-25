import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import i18next from 'i18next';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '@components';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-elements';
function ModalUI({
  title,
  message,
  children,
  hideLogoModal,
  buttonText,
  onOpenModal,
  onCustomUI,
  successModal,
  onPress,
  animated,
  setIsVisibleModal,
  cancelButton,
}) {
  const { navigate, goBack } = useNavigation();
  const { theme } = useTheme();
  return (
    <Modal animationType={'fade'} transparent={true} visible={onOpenModal}>
      {onCustomUI ? (
        <View style={styles(theme).centeredView}>
          <View style={styles(theme).modalView}>{children}</View>
        </View>
      ) : successModal ? (
        <View style={styles(theme).centeredView}>
          <View style={styles(theme).modalView}>
            {!hideLogoModal ? (
              <Icon
                name="check-circle"
                size={100}
                style={styles(theme).okIcon}
              />
            ) : null}

            <Text style={[styles(theme).modalTitle, { color: '#095C3E' }]}>
              {title ? title : i18next.t('PROFILE_EDIT_INFO_SAVECOMP')}
            </Text>
            <Text style={[styles(theme).modalText, { color: '#000' }]}>
              {message ? message : i18next.t('MODAL_UI_SUBTITLE')}
            </Text>
            <View style={styles(theme).modalButtonContainer}>
              <LinearGradient
                style={[styles(theme).add, { marginBottom: 5, marginRight: 0 }]}
                colors={['#00bae5', '#00bae5']}
              >
                <TouchableOpacity
                  style={{ width: '100%', alignItems: 'center' }}
                  disabled={false}
                  onPress={() => {
                    if (onPress) {
                      setIsVisibleModal(!onOpenModal);
                      onPress();
                    } else {
                      setIsVisibleModal(!onOpenModal);
                      goBack();
                    }
                  }}
                >
                  <Text style={styles(theme).buttonTextAdd}>
                    {buttonText ? buttonText : i18next.t('CONFIRM_BUTTON')}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              {cancelButton ? (
                <LinearGradient
                  style={[
                    styles(theme).add,
                    { marginBottom: 5, marginRight: 0 },
                  ]}
                  colors={['#CECECE75', '#CECECE75']}
                >
                  <TouchableOpacity
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setIsVisibleModal(!onOpenModal)}
                  >
                    <Text style={styles(theme).buttonCancelTextAdd}>
                      {i18next.t('CANCEL_BUTTON')}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : null}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles(theme).centeredView}>
          <View style={styles(theme).modalView}>
            {!hideLogoModal ? (
              <Icon
                name="times-circle"
                size={100}
                style={[styles(theme).okIcon, { color: '#CC4344' }]}
              />
            ) : null}
            <Text style={[styles(theme).modalTitle, { color: '#CC4344' }]}>
              {title ? title : i18next.t('PROFILE_EDIT_INFO_SAVEERR')}
            </Text>

            <Text style={[styles(theme).modalText, { color: '#000' }]}>
              {message ? message : i18next.t('PROFILE_EDIT_INFO_SAVEERR_SUB')}
            </Text>

            <View style={styles(theme).modalButtonContainer}>
              <LinearGradient
                style={[styles(theme).add, { marginBottom: 5 }]}
                colors={['#00bae5', '#00bae5']}
              >
                <TouchableOpacity
                  underlayColor="grey"
                  style={{ width: '100%', alignItems: 'center' }}
                  disabled={false}
                  onPress={() => {
                    if (onPress) {
                      setIsVisibleModal(!onOpenModal);
                      onPress();
                    } else {
                      setIsVisibleModal(!onOpenModal);
                      goBack();
                    }
                  }}
                >
                  <Text style={styles(theme).buttonTextAdd}>
                    {buttonText ? buttonText : i18next.t('CONFIRM_BUTTON')}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              {cancelButton ? (
                <LinearGradient
                  style={[styles(theme).add, { marginBottom: 5 }]}
                  colors={['#CECECE75', '#CECECE75']}
                >
                  <TouchableOpacity
                    style={{ width: '100%', alignItems: 'center' }}
                    disabled={false}
                    onPress={() => setIsVisibleModal(!onOpenModal)}
                  >
                    <Text style={styles(theme).buttonCancelTextAdd}>
                      {i18next.t('CANCEL_BUTTON')}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : null}
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
}

export default ModalUI;
