import React from 'react';
import {
  View as DefaultView,
  ViewProps,
  ViewStyle,
  PressableStateCallbackType,
} from 'react-native';
import {useTheme} from 'app/configs/ChangeTheme';
import Theme from 'app/style/Theme';

interface Props extends ViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode);
  style?: ViewStyle;
}

const Layout = ({children, style}: Props) => {
  const {theme} = useTheme();
  return (
    <DefaultView
      style={[
        {backgroundColor: theme.backgroundItem},
        style,
        {...Theme.shadow},
      ]}>
      {children}
    </DefaultView>
  );
};
export default Layout;
