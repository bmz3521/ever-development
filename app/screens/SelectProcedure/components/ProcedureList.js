import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { useTheme } from 'react-native-elements';

const ProcedureList = ({
  procedure,
  selected,
  selectedProcedures,
  setSelectedProcedures,
}) => {
  const { theme } = useTheme();
  const [select, setSelect] = useState(selected);

  const selectItem = procedure => {
    let newSelectProcedureList = [...selectedProcedures];

    if (select) {
      newSelectProcedureList = newSelectProcedureList.filter(
        p => p.id !== procedure.id,
      );
    } else {
      newSelectProcedureList = newSelectProcedureList.filter(
        p => p.id !== procedure.id,
      );
      newSelectProcedureList.push(procedure);
    }

    setSelect(!select);
    setSelectedProcedures(newSelectProcedureList);
  };

  return (
    <TouchableOpacity
      style={[styles.contain]}
      onPress={() => selectItem(procedure)}
    >
      <View
        style={[
          styles.content,
          {
            backgroundColor: select == true ? 'rgba(0,186,229,0.4)' : '#F8F8F8',
          },
        ]}
      >
        <View style={styles.contentTitle}>
          <Text
            style={{
              fontFamily: theme.fontFamilyBold,
              fontSize: theme.fontSizeSmaller,
            }}
          >
            {procedure.name}
          </Text>
        </View>
        <View style={styles.contentPrice}>
          <Text
            style={{
              fontFamily: theme.fontFamilyDefault,
              fontSize: theme.fontSizeSmaller,
              color: 'grey',
            }}
          >{`(${procedure.price})`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProcedureList;
