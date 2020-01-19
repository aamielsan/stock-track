import React, { useState } from 'react';
import get from 'lodash/get';
import isFn from 'lodash/isFunction';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationInjectedProps } from 'react-navigation';
import {
  SCREEN_TYPE_LIST,
  SCREEN_TYPE_MULTISELECT,
} from 'src/constants/screenType.constants';

interface Props<RecordType> {
  data: RecordType[];
  navigation: NavigationInjectedProps['navigation'];
  keyField: string;
  titleField: string;
  subtitleField?: string;
  onItemPress?: (item: RecordType) => void;
}

export function LocationTypeList<RecordType>(props: Props<RecordType>) {
  const {
    data,
    navigation,
    keyField,
    titleField,
    subtitleField,
    onItemPress,
  } = props;

  // Hooks
  const [isMultiselect, setIsMultiselect] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // Methods
  const resetMultiselect = () => {
    setSelected({});
    setIsMultiselect(false);
    navigation.setParams({
      onBack: undefined,
      selectedCount: 0,
      screenType: SCREEN_TYPE_LIST,
    });
  };

  const handleLongPress = (item: RecordType) => () => {
    if (!isMultiselect) {
      setIsMultiselect(true);
      navigation.setParams({
        onBack: resetMultiselect,
        screenType: SCREEN_TYPE_MULTISELECT,
      });
    }
    const key = (item as any)[keyField];
    const value = selected[key];
    setSelected(s => ({ ...s, [key]: !value }));
  };

  const handlePress = (item: RecordType) => () => {
    if (!isMultiselect) {
      return isFn(onItemPress) && onItemPress(item);
    }
    return handleLongPress(item)();
  };

  const keyExtractor = (d: RecordType, idx: number) =>
    String((keyField && get(d, keyField)) || idx);

  const renderItem = (info: ListRenderItemInfo<RecordType>) => {
    const { item } = info;
    const leftIcon = !isMultiselect
      ? undefined
      : selected[(item as any)[keyField]]
      ? { name: 'check-box' }
      : { name: 'check-box-outline-blank' };

    return (
      <ListItem
        bottomDivider
        leftIcon={leftIcon}
        title={(titleField && get(item, titleField)) || ''}
        subtitle={subtitleField && get(item, subtitleField)}
        onPress={handlePress(item)}
        onLongPress={handleLongPress(item)}
      />
    );
  };

  return (
    <FlatList
      data={data}
      extraData={isMultiselect && selected}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}
