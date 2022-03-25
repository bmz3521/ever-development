import {useTheme} from 'app/configs/ChangeTheme';
import React from 'react';
import {
  View as DefaultView,
  ViewProps,
  ViewStyle,
  PressableStateCallbackType,
} from 'react-native';
interface Props extends ViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: ViewStyle;
}

const Line = (props: Props) => {
  const {theme} = useTheme();
  return (
    <DefaultView
      style={[
        {
          backgroundColor: theme.borderColor,
          height: 1,
        },
        props.style,
      ]}>
      {props.children}
    </DefaultView>
  );
};
export default Line;
