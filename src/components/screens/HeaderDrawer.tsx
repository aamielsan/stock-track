import React, { useCallback } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { HeaderBackButtonProps } from 'react-navigation-stack';
import { Metrics } from 'src/assets';
import { SCREEN_TYPE_MULTISELECT } from 'src/constants/screenType.constants';

type Props = HeaderBackButtonProps & NavigationInjectedProps;

function _HeaderDrawer(props: Props) {
  // Props
  const { navigation, scene, onPress } = props;
  const { toggleDrawer } = navigation;

  const isHome = scene.index === 0;
  const isIos = Platform.OS === 'ios';

  // Hooks
  const handlePress = () => {
    // List screen && multiselect
    if (navigation.getParam('screenType') === SCREEN_TYPE_MULTISELECT) {
      return navigation.getParam('onBack', onPress)();
    }

    // Not homescreen
    if (!isHome) {
      return onPress();
    }

    return toggleDrawer();
  };

  // Render
  if (isHome && isIos) {
    return null;
  }

  const name = isHome ? 'menu' : isIos ? 'arrow-back-ios' : 'arrow-back';
  return <Icon name={name} iconStyle={styles.icon} onPress={handlePress} />;
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: Metrics.baseMargin,
  },
});

export const HeaderDrawer = withNavigation(_HeaderDrawer);
