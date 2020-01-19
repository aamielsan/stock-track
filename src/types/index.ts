import { FC } from 'react';

export interface FCScreen<Props, NavigationOptions> extends FC<Props> {
  navigationOptions: NavigationOptions;
}

export interface FetchHelpers {
  refetch(): void;
  loading: boolean;
  error: string | null;
}

