import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { DrawerContentComponentProps } from 'react-navigation-drawer/lib/typescript/src/types';
import { DrawerItem } from './DrawerItem';
import { NavigationActions } from 'react-navigation';
import { APP_ROUTES } from 'src/navigators/app.routes';
import { Metrics } from 'src/assets';

type Props = DrawerContentComponentProps;

export function Drawer(props: Props) {
  const { navigation } = props;
  const routes = APP_ROUTES;

  const handleOnDrawerItemPress = ({ screen }: { screen: string }) => {
    navigation.dispatch(NavigationActions.navigate({ routeName: screen }));
  };

  const renderList = () => {
    return routes.map(({ title, screen }) => (
      <DrawerItem
        key={screen}
        title={title}
        screen={screen}
        onPress={handleOnDrawerItemPress}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
      <ScrollView>{renderList()}</ScrollView>
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    height: Metrics.navbarHeaderHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: Metrics.navbarFooterHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
