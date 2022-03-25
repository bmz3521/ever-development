import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from '@components';
import useStyles from '../styles';
import { useTheme } from 'react-native-elements';

const ProcedureCard = ({
  navigation,
  procedureGroup,
  procedureTitle,
  selectedList,
  order,
}) => {
  const baseStyles = useStyles();
  const { theme } = useTheme();
  const procedureLength = Object.keys(procedureGroup).length;
  const procedures = procedureGroup[procedureTitle].procedures;
  const proceduresWithType = procedures.map(item => {
    return { ...item, type: 'PROCEDURE' };
  });
  const totalSelected = selectedList.filter(
    item => item.specialitiesName === procedureTitle,
  ).length;

  return (
    <TouchableOpacity
      style={
        order !== procedureLength - 1
          ? baseStyles.procedureCard
          : baseStyles.procedureLastCard
      }
      onPress={() =>
        navigation.navigate('ProcedureListSelect', {
          title: procedureTitle,
          procedures: proceduresWithType,
          from: 'selectList',
          selectedList,
        })
      }
    >
      <View>
        <View style={baseStyles.row}>
          <Text type="h6" style={baseStyles.procedureTitle}>
            {procedureTitle}
          </Text>
          {totalSelected !== 0 && (
            <View style={baseStyles.badge}>
              <Text type="body5" style={baseStyles.whiteText}>
                {totalSelected}
              </Text>
            </View>
          )}
        </View>

        <Text type="body3">{`( ${procedures.length} procedures )`}</Text>
      </View>

      <Icon name="chevron-right" style={baseStyles.nextIcon} />
    </TouchableOpacity>
  );
};

export default ProcedureCard;
