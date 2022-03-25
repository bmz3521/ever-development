import React, { useRef, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Divider, Button, Icon } from 'react-native-elements';
import { ComplianceBody } from '@components';
import i18next from 'i18next';
import CheckBox from '@react-native-community/checkbox';
import PagerView from 'react-native-pager-view';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');

const ComplianceModal = ({ isVisible, theme, handleModal, onsubmit }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const opacityAnim = useSharedValue(1);
  const [lableText, setLabelText] = useState({
    title: i18next.t('USERREG_TERMS'),
    footer: i18next.t('USERREG_ACCEPT_TERMS'),
  });
  const pagerRef = useRef();
  const resetStateValue = () => {
    handleModal(null);
    setToggleCheckBox(false);
    setToggleCheckBox2(false);
    setCurrentPage(0);
    setLabelText({
      title: i18next.t('USERREG_TERMS'),
      footer: i18next.t('USERREG_ACCEPT_TERMS'),
    });
  };

  const setStateNextStep = () => {
    setToggleCheckBox(false);
    setLabelText({
      title: i18next.t('USERREG_PNP_TITLE'),
      footer: i18next.t('USERREG_PNP_CTA'),
    });
  };

  const onApproveHandler = () => {
    if (currentPage === 0) {
      pagerRef?.current?.setPage(currentPage + 1);
      opacityAnim.value = withTiming(0.65, { duration: 200 }, finish => {
        if (finish) {
          runOnJS(setStateNextStep)();
          opacityAnim.value = withTiming(1, { duration: 250 });
        }
      });
      setCurrentPage(prev => prev + 1);
    } else {
      onsubmit();
      resetStateValue();
    }
  };

  const opacityStyle = useAnimatedStyle(() => {
    const opacity = opacityAnim.value;
    return {
      opacity,
    };
  });

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles(theme).container}>
        <View style={styles(theme).modalContainer}>
          <View style={styles(theme).titleContainer}>
            <Animated.Text style={[styles(theme).title, opacityStyle]}>
              {lableText.title}
            </Animated.Text>
            <TouchableOpacity onPress={resetStateValue}>
              <View style={styles(theme).closeIconContainer}>
                <Icon
                  type="material-community"
                  name="close"
                  color={theme.colors.placeholderColor}
                  size={theme.fontSizeDefault}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Divider style={{ marginTop: 10 }} />
          <PagerView
            ref={pagerRef}
            scrollEnabled={false}
            style={{ flex: 1 }}
            initialPage={currentPage}
          >
            <View key={1}>
              <ComplianceBody canReject={false} type={'POLICY'} />
            </View>
            <View key={2}>
              <ComplianceBody canReject={false} type={'POLICY'} />
            </View>
          </PagerView>
          <Divider style={{ marginBottom: 10 }} />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: theme.fontFamilyDefault,
              color: theme.colors.grey2,
              fontSize: 12,
            }}
          >{`${currentPage + 1} / 2`}</Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
          >
            {currentPage === 0 ? (
              <CheckBox
                key={'MODAL_MAIN1'}
                style={styles.checkBox}
                onTintColor={theme.colors.primaryColor}
                onCheckColor={theme.colors.primaryColor}
                value={toggleCheckBox}
                onValueChange={setToggleCheckBox}
              />
            ) : (
              <CheckBox
                key={'MODAL_MAIN2'}
                style={styles.checkBox}
                onTintColor={theme.colors.primaryColor}
                onCheckColor={theme.colors.primaryColor}
                value={toggleCheckBox2}
                onValueChange={setToggleCheckBox2}
              />
            )}
            <Animated.Text style={[styles(theme).footer, opacityStyle]}>
              {lableText.footer}
            </Animated.Text>
          </View>
          <Button
            title={i18next.t('CONFIRM_BUTTON')}
            titleStyle={styles(theme).ctaBtnTxt}
            onPress={onApproveHandler}
            disabled={currentPage === 0 ? !toggleCheckBox : !toggleCheckBox2}
            buttonStyle={styles(theme).ctaBtn}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ComplianceModal;

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,.18)',
    },
    modalContainer: {
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      height: '85%',
      width: '95%',
      minHeight: height * 0.8,
      minWidth: width * 0.9,
    },
    closeIconContainer: {
      alignItems: 'flex-end',
      padding: 5,
      backgroundColor: theme.colors.grey5,
      borderRadius: 100,
    },
    ctaBtn: {
      borderRadius: 15,
      paddingVertical: 10,
      marginTop: 20,
    },
    ctaBtnTxt: {
      fontFamily: theme.fontFamilyDefault,
      fontSize: theme.fontSizeDefault,
      color: theme.colors.white,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      flexShrink: 1,
      fontFamily: theme.fontFamilyBold,
      fontSize: theme.fontSizeDefault,
    },
    footer: {
      fontFamily: theme.fontFamilyBold,
      fontSize: theme.fontSizeSmall,
      marginLeft: 10,
      flexShrink: 1,
    },
  });
