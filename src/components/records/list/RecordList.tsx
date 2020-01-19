import React from 'react';
import map from 'lodash/map';
import get from 'lodash/get';
import { ListItem } from 'react-native-elements';

interface RecordListProps<RecordType> {
  list: RecordType[];
  titleField?: string;
}

export function RecordList<RecordType extends { id: string }>(
  props: RecordListProps<RecordType>,
) {
  const { list, titleField } = props;
  return map(list, l => (
    <RecordListItem key={l.id} data={l} titleField={titleField} />
  ));
}

interface RecordListItemProps<RecordType> {
  data: RecordType;
  titleField?: string;
}

function RecordListItem<RecordType>(props: RecordListItemProps<RecordType>) {
  const { data, titleField } = props;
  const title = get(data, titleField || 'name', '');
  return <ListItem bottomDivider title={title} />;
}
