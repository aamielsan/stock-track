import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Metrics } from 'src/assets';
import {
  SCREEN_TYPE_LIST,
  SCREEN_TYPE_RECORD,
  SCREEN_TYPE_MULTISELECT,
} from 'src/constants/screenType.constants';
import { Menu } from './Menu';

interface Props {
  navigation: NavigationInjectedProps['navigation'];
}

export function HeaderActions(props: Props) {
  const { navigation } = props;

  const renderActions = () => {
    const screenType = navigation.getParam('screenType');

    switch (screenType) {
      case SCREEN_TYPE_LIST: {
        return <Menu screenType={screenType} navigation={navigation} />;
      }

      case SCREEN_TYPE_RECORD: {
        return <Menu screenType={screenType} navigation={navigation} />;
      }

      case SCREEN_TYPE_MULTISELECT: {
        return <Menu screenType={screenType} navigation={navigation} />;
      }

      default: {
        return null;
      }
    }
  };

  return <View style={styles.container}>{renderActions()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: Metrics.baseMargin,
  },
});
