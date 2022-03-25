import {
  View,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Divider, useTheme } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useStyles from '../styles';
import { Text, SafeAreaView } from '@components';

const DescriptionModal = ({ modalVisible, setModalVisible, clinicPackage }) => {
  const { theme } = useTheme();
  const baseStyles = useStyles();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      statusBarTranslucent
    >
      <SafeAreaView style={baseStyles.modalBackground}>
        <View style={baseStyles.modalHeader}>
          <View style={baseStyles.backIcon}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="close-outline" size={25} />
            </TouchableOpacity>
          </View>
          <Text type="h5">About this package</Text>
        </View>
        <Divider
          width={1}
          color={theme.colors.grey5}
          style={{ marginTop: -10 }}
        />
        <View style={baseStyles.blockView}>
          <View style={baseStyles.contentContainer}>
            <Text style={baseStyles.lineHeight}>
              {clinicPackage.description}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default DescriptionModal;
