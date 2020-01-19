import React from 'react';
import noop from 'lodash/noop';
import { Icon, ListItem } from 'react-native-elements';
import { NavigationInjectedProps } from 'react-navigation';
import {
  MenuOptions,
  MenuOption,
  MenuTrigger,
  Menu as PopupMenu,
} from 'react-native-popup-menu';
import {
  SCREEN_TYPE_LIST,
  SCREEN_TYPE_RECORD,
  SCREEN_TYPE_MULTISELECT,
} from 'src/constants/screenType.constants';
import { StyleSheet } from 'react-native';

interface Props {
  screenType: string;
  navigation: NavigationInjectedProps['navigation'];
}

export function Menu(props: Props) {
  const { screenType, navigation } = props;

  return (
    <PopupMenu>
      <MenuTrigger>
        <Icon name="more-vert" />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionWrapper: styles.optionContainer,
        }}>
        {MENU_ITEMS[screenType].map(({ title, icon, handler }) => (
          <MenuOption key={title} onSelect={navigation.getParam(handler, noop)}>
            <ListItem
              bottomDivider
              title={title}
              leftIcon={{ name: icon }}
              containerStyle={styles.menuItem}
            />
          </MenuOption>
        ))}
      </MenuOptions>
    </PopupMenu>
  );
}

const styles = StyleSheet.create({
  optionContainer: { padding: 0 },
  menuItem: { padding: 8 },
});

const MENU_ITEMS: Record<
  string,
  Array<{ title: string; icon: string; handler: string }>
> = {
  [SCREEN_TYPE_LIST]: [
    {
      title: 'Refresh',
      icon: 'refresh',
      handler: 'onRefresh',
    },
  ],
  [SCREEN_TYPE_RECORD]: [
    {
      title: 'Refresh',
      icon: 'refresh',
      handler: 'onRefresh',
    },
    { title: 'Delete', icon: 'delete', handler: 'onDelete' },
  ],
  [SCREEN_TYPE_MULTISELECT]: [
    { title: 'Select all', icon: 'select-all', handler: 'onSelectAll' },
    { title: 'Delete', icon: 'delete', handler: 'onDelete' },
  ],
};
