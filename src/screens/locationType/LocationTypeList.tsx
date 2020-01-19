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
  const [{ selected, selectedCount }, setSelected] = useState<{
    selected: Record<string, boolean>;
    selectedCount: number;
  }>({
    selected: {},
    selectedCount: 0,
  });

  // Methods
  const resetMultiselect = () => {
    setIsMultiselect(false);
    setSelected({ selected: {}, selectedCount: 0 });
    navigation.setParams({
      onBack: undefined,
      selectedCount: 0,
      screenType: SCREEN_TYPE_LIST,
    });
  };

  const selectAll = () => {
    setSelected({
      selectedCount: data.length,
      selected: data.reduce(
        (agg, d: any) => ({ ...agg, [d[keyField]]: true }),
        {},
      ),
    });
    navigation.setParams({ selectedCount: data.length });
  };

  const handleLongPress = (item: RecordType) => () => {
    if (!isMultiselect) {
      setIsMultiselect(true);
      navigation.setParams({
        onBack: resetMultiselect,
        onSelectAll: selectAll,
        screenType: SCREEN_TYPE_MULTISELECT,
      });
    }

    const key = (item as any)[keyField];
    const newValue = !selected[key];
    const newCount = selectedCount + (newValue ? 1 : -1);

    if (newCount > 0) {
      setSelected({
        selected: { ...selected, [key]: newValue },
        selectedCount: newCount,
      });
      navigation.setParams({ selectedCount: newCount });
    } else {
      resetMultiselect();
    }
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
      extraData={selectedCount}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}
