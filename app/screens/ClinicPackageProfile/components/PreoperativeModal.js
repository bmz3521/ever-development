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

const PreoperativeModal = ({
  modalVisible,
  setModalVisible,
  clinicPackage,
}) => {
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
      {/* <View style={baseStyles.modalBackDrop}> */}
      <SafeAreaView style={baseStyles.modalBackground}>
        {/* Header */}
        <View style={baseStyles.modalHeader}>
          <View style={baseStyles.backIcon}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="close-outline" size={25} />
            </TouchableOpacity>
          </View>
          <Text type="h5">Preoperative Instructions</Text>
        </View>

        {/* Content */}
        <ScrollView
          style={[baseStyles.contentContainer]}
          showsVerticalScrollIndicator={false}
        >
          {clinicPackage.preoperationInstruction && (
            <View style={baseStyles.sheetWrapper}>
              {clinicPackage?.preoperationInstruction.map((item, index) => {
                return (
                  <View key={index}>
                    <View
                      style={[
                        baseStyles.sheetRow,
                        {
                          backgroundColor: item.step % 2 != 0 ? '#E5F8FC' : '',
                        },
                      ]}
                    >
                      <View style={baseStyles.sheetCol1}>
                        <Text>{item.step}</Text>
                      </View>

                      <View style={baseStyles.sheetCol2}>
                        <Text>{item.description}</Text>
                      </View>

                      <View style={baseStyles.sheetCol3}>
                        <Text style={{ textAlign: 'center' }}>
                          {item.duration}
                        </Text>
                      </View>
                    </View>
                    {index < clinicPackage.itemDetails.length - 1 && (
                      <Divider
                        width={1}
                        color={theme.colors.grey5}
                        key={item.step}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          )}
          <View style={baseStyles.bottomSpace} />
        </ScrollView>
      </SafeAreaView>
      {/* </View> */}
    </Modal>
  );
};

export default PreoperativeModal;
