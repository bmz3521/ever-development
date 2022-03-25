import React, { FunctionComponent } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { PredictionType } from '../App';

const SearchBarWithAutocomplete = props => {
  const [inputSize, setInputSize] = React.useState({ width: 0, height: 0 });
  const { theme } = useTheme();

  const {
    value,
    style,
    onChangeText,
    onPredictionTapped,
    predictions,
    showPredictions,
  } = props;

  const { container, inputStyle } = styles;
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;
  const inputBottomRadius = showPredictions
    ? {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      };

  const _renderPredictions = predictions => {
    const { predictionsContainer, predictionRow } = styles;
    const calculatedStyle = {
      width: inputSize.width,
    };

    return (
      <FlatList
        data={predictions}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={predictionRow}
              onPress={() =>
                onPredictionTapped(item.place_id, item.description)
              }
            >
              <Text numberOfLines={1}>
                {item.structured_formatting.main_text}
              </Text>
              <Text numberOfLines={1}>
                {item.structured_formatting.secondary_text}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.place_id}
        keyboardShouldPersistTaps="handled"
        style={[predictionsContainer, calculatedStyle]}
      />
    );
  };

  return (
    <View style={[container, { ...passedStyles }]}>
      <TextInput
        style={[
          inputStyle,
          {
            borderColor: theme.colors.grey4,
            fontFamily: theme.fontFamilyDefault,
          },
        ]}
        placeholder="Enter Address"
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onLayout={event => {
          const { height, width } = event.nativeEvent.layout;
          setInputSize({ height, width });
        }}
      />
      {showPredictions && _renderPredictions(predictions)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 10,
  },
  inputStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: '#ffffff',
    color: 'black',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
  },
  predictionsContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
  },
  predictionRow: {
    paddingBottom: 15,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default SearchBarWithAutocomplete;
