import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@components';
import { Icon, useTheme } from 'react-native-elements';
import useStyles from '../styles';

const ProcedureListItem = ({
  procedure,
  selected,
  selectedProcedures,
  actions,
}) => {
  const baseStyles = useStyles();
  const { theme } = useTheme();
  
  const [select, setSelect] = useState(selected);

  const onSelectItem = procedure => {
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
    actions.setSelectedProcedures(newSelectProcedureList);
  };

  return (
    <TouchableOpacity
      style={baseStyles.listCard}
      onPress={() => onSelectItem(procedure)}
    >
      <View style={{ flex: 1 }}>
        <Text type="body2" style={{ lineHeight: 25 }}>
          {procedure.name}
        </Text>
      </View>
      {selected && (
        <Icon
          type="material-community"
          name="check"
          color={theme.colors.secondary}
          size={24}
        />
      )}
    </TouchableOpacity>
  );
};

export default ProcedureListItem;
