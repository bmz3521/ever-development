import React from 'react';
import {
  View as DefaultView,
  ViewProps,
  ViewStyle,
  PressableStateCallbackType,
} from 'react-native';
import {useTheme} from 'app/configs/ChangeTheme'

interface Props extends ViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: ViewStyle;
}

const Container = (props: Props) => {
  const {theme} = useTheme();
  return (
    <DefaultView style={[{backgroundColor: theme.background}, props.style]}>
      {props.children}
    </DefaultView>
  );
};
export default Container;
