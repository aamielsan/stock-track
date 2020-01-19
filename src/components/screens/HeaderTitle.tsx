import React from 'react';
import { Text, ViewStyle, StyleProp } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { SCREEN_TYPE_MULTISELECT } from 'src/constants/screenType.constants';

interface Props {
  style: StyleProp<ViewStyle>;
  children: string;
  navigation: NavigationInjectedProps['navigation'];
}

export function HeaderTitle(props: Props) {
  const { style, children, navigation } = props;

  // Multiselect
  if (navigation.getParam('screenType') === SCREEN_TYPE_MULTISELECT) {
    const count = navigation.getParam('selectedCount', 0);
    return <Text style={style}>{count}</Text>;
  }

  return <Text style={style}>{children}</Text>;
}
