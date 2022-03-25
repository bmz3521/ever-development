import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Icon } from 'react-native-elements';
import ComplianceText from './ComplianceText';
import i18next from 'i18next';
import useStyles from './styles';
import PropTypes from 'prop-types';

import { policy_content } from './source/privacypolicy';
import { policy_content_en } from './source/privacypolicy_en';
import { terms_content } from './source/termsAndcondition';

const PRIVACY_POLICY = {
  th: policy_content,
  en: policy_content_en,
};

const ComplianceBody = ({
  titlei18Key,
  onApproveHandler,
  onRejecthandler,
  canReject,
  footeri18Key,
  ctaTitlei18Key,
  type,
}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const styles = useStyles();

  return (
    <View style={styles.centeredView}>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>
        <ScrollView>
          <View style={[styles.whiteContainer, { padding: 10 }]}>
            <View style={styles.titleContainer}>
              {!!titlei18Key && (
                <Text style={styles.title}>{i18next.t(titlei18Key)}</Text>
              )}
              {canReject && (
                <TouchableOpacity onPress={onRejecthandler}>
                  <View style={styles.closeIconContainer}>
                    <Icon
                      type="material-community"
                      name="close"
                      color={styles.placeholderColor}
                      size={styles.fontSizeDefault}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <ComplianceText
              content={
                type === 'POLICY'
                  ? PRIVACY_POLICY[i18next.language] ?? policy_content
                  : terms_content
              }
            />
            {!!footeri18Key && (
              <View style={{ ...styles.ctnRow, marginTop: 15 }}>
                <CheckBox
                  key={titlei18Key}
                  style={styles.checkBox}
                  onTintColor={styles.primaryColor}
                  onCheckColor={styles.primaryColor}
                  value={toggleCheckBox}
                  onValueChange={setToggleCheckBox}
                />
                <Text style={{ ...styles.title, flexShrink: 1 }}>
                  {i18next.t(footeri18Key)}
                </Text>
              </View>
            )}
            {!!ctaTitlei18Key && (
              <TouchableOpacity
                style={[
                  styles.ctaBtn,
                  toggleCheckBox ? styles.bgPrimary : styles.bgGrey,
                ]}
                disabled={!toggleCheckBox}
                onPress={onApproveHandler}
              >
                <Text style={styles.ctaBtnTxt}>
                  {i18next.t(ctaTitlei18Key)}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ComplianceBody;

ComplianceBody.propTypes = {
  type: PropTypes.oneOf(['TERMS', 'POLICY']),
};

ComplianceBody.defaultProps = {
  type: 'TERMS',
};
